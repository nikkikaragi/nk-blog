#!/usr/bin/env node
/* ============================================================
   new-post.js — Blog post generator script
   Run from the root of your nk-blog/ folder:

     node new-post.js

   It will ask you a few questions, then:
     1. Creates posts/post-N.html with your content
     2. Creates assets/images/posts/post-N/ and copies your images in
     3. Appends the new post entry to scripts/posts-data.js automatically
   ============================================================ */

const readline = require('readline');
const fs        = require('fs');
const path      = require('path');

// ---- Check we're in the right folder ----
if (!fs.existsSync('scripts/posts-data.js')) {
  console.error('\n❌  Run this script from inside your nk-blog/ folder:\n    cd nk-blog && node new-post.js\n');
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

// ---- Helpers ----

// Read current POSTS array to find the next post number
function getNextPostId() {
  const src = fs.readFileSync('scripts/posts-data.js', 'utf8');
  const ids = [...src.matchAll(/id:\s*'(post-(\d+))'/g)].map(m => parseInt(m[2]));
  const max = ids.length ? Math.max(...ids) : 0;
  return max + 1;
}

// Format a date string like "19 June 2026" and a sort key "2026-06-19"
function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const display = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  const sort    = d.toISOString().slice(0, 10);
  return { display, sort };
}

// Sanitize title into a slug (not used for file names since we use post-N, but useful)
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Append a new post entry to posts-data.js
function appendToPostsData({ id, title, date, dateSort, topic, imagePath, excerpt, file }) {
  let src = fs.readFileSync('scripts/posts-data.js', 'utf8');

  const imageValue = imagePath ? `'${imagePath}'` : 'null';

  const entry = `
  {
    id:       '${id}',
    title:    '${title.replace(/'/g, "\\'")}',
    date:     '${date}',
    dateSort: '${dateSort}',
    topic:    '${topic}',
    image:    ${imageValue},
    excerpt:  '${excerpt.replace(/'/g, "\\'")}',
    file:     '${file}'
  }`;

  // Insert before the "ADD YOUR NEXT POST HERE" comment, or before the closing ];
  if (src.includes('/* ---- ADD YOUR NEXT POST HERE ---- */')) {
    src = src.replace('  /* ---- ADD YOUR NEXT POST HERE ---- */', entry + ',\n\n  /* ---- ADD YOUR NEXT POST HERE ---- */');
  } else {
    src = src.replace(/\n\];/, `,\n${entry}\n\n];`);
  }

  fs.writeFileSync('scripts/posts-data.js', src, 'utf8');
}

// Build the HTML for inline image blocks
function buildImageBlocks(imageFiles, postImgDir) {
  if (!imageFiles.length) return '';
  return imageFiles.map((f, i) => {
    const position = i % 2 === 0 ? 'post-image-right' : 'post-image-left';
    const relPath  = `../assets/images/posts/${postImgDir}/${path.basename(f)}`;
    return `
        <!-- Image ${i + 1} — change class to post-image-left, post-image-right, or post-image-full -->
        <div class="${position}">
          <img src="${relPath}" alt="${path.basename(f, path.extname(f))}">
        </div>`;
  }).join('\n');
}

// ---- Main flow ----

async function main() {
  console.log('\n✨  NK Blog — New Post Generator\n');

  // 1. Title
  const title = (await ask('Post title: ')).trim();
  if (!title) { console.error('Title is required.'); process.exit(1); }

  // 2. Date
  let dateInput = (await ask('Date (YYYY-MM-DD, or press Enter for today): ')).trim();
  if (!dateInput) dateInput = new Date().toISOString().slice(0, 10);
  const dates = formatDate(dateInput);
  if (!dates) { console.error('Could not parse date. Use YYYY-MM-DD format.'); process.exit(1); }

  // 3. Topic — show available topics
  const topicsData = fs.readFileSync('scripts/topics-data.js', 'utf8');
  const topicIds = [...topicsData.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
  console.log('\nAvailable topics: ' + topicIds.join(', '));
  const topic = (await ask('Topic id (e.g. lifestyle): ')).trim().toLowerCase();
  if (!topicIds.includes(topic)) {
    console.warn(`⚠️  '${topic}' not found in topics-data.js — adding anyway. Remember to add it to topics-data.js if it's new.`);
  }

  // 4. Excerpt / short description
  const excerpt = (await ask('Short excerpt (1-2 sentences, shown on card if no image): ')).trim();

  // 5. Images — optional, space-separated absolute or relative paths
  console.log('\nImages: drag files into terminal, or type paths separated by spaces.');
  console.log('Press Enter to skip if you have no images yet.\n');
  const imgInput = (await ask('Image path(s): ')).trim();

  const rawPaths = imgInput
    ? imgInput.split(/\s+/).map(p => p.trim().replace(/^'|'$/g, '').replace(/^"|"$/g, ''))
    : [];

  // Validate image paths
  const validImages = [];
  for (const p of rawPaths) {
    const resolved = path.resolve(p);
    if (fs.existsSync(resolved)) {
      validImages.push(resolved);
    } else {
      console.warn(`  ⚠️  File not found, skipping: ${p}`);
    }
  }

  // 6. Body content
  console.log('\nPost body text: paste your content, then press Enter twice + type END and Enter to finish.');
  console.log('(You can also write "TODO" and edit the HTML file directly.)\n');
  let bodyLines = [];
  let blankCount = 0;
  while (true) {
    const line = await ask('');
    if (line.trim() === 'END') break;
    bodyLines.push(line);
  }
  const bodyText = bodyLines.join('\n').trim() || 'TODO — write your post content here.';

  rl.close();

  // ---- Generate files ----

  const postNum  = getNextPostId();
  const postId   = `post-${postNum}`;
  const postFile = `posts/${postId}.html`;
  const imgDir   = postId;

  // Create image folder and copy images
  const imgFolderPath = `assets/images/posts/${imgDir}`;
  if (!fs.existsSync(imgFolderPath)) fs.mkdirSync(imgFolderPath, { recursive: true });

  const copiedImages = [];
  for (const src of validImages) {
    const dest = path.join(imgFolderPath, path.basename(src));
    fs.copyFileSync(src, dest);
    copiedImages.push(src);
    console.log(`  📸  Copied: ${path.basename(src)} → ${imgFolderPath}/`);
  }

  // Thumbnail = first image (if any)
  const thumbnailPath = copiedImages.length
    ? `assets/images/posts/${imgDir}/${path.basename(copiedImages[0])}`
    : null;

  // Build image blocks for HTML
  const imageBlocksHTML = buildImageBlocks(copiedImages, imgDir);

  // Split body into paragraphs
  const paragraphs = bodyText.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  let bodyHTML = '';
  paragraphs.forEach((para, i) => {
    bodyHTML += `\n        <p>${para}</p>`;
    // Insert first image block after the first paragraph
    if (i === 0 && imageBlocksHTML) {
      bodyHTML += '\n' + imageBlocksHTML;
    }
  });

  // Capitalise topic for display
  const topicLabel = topic.charAt(0).toUpperCase() + topic.slice(1);

  // Write post HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NK Blog — ${title}</title>
  <link rel="stylesheet" href="../styles/fonts.css">
  <link rel="stylesheet" href="../styles/colors.css">
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/banner.css">
  <link rel="stylesheet" href="../styles/post.css">
  <link rel="stylesheet" href="../styles/responsive.css">
</head>
<body>

  <div id="site-header"></div>

  <main class="page-content">
    <div class="post-wrapper">

      <a class="post-back-link" href="../index.html">&larr; Back to all posts</a>

      <h1 class="post-title">${title}</h1>
      <p class="post-meta">
        ${dates.display} &nbsp;&bull;&nbsp;
        <a href="../topics/${topic}.html">${topicLabel}</a>
      </p>

      <div class="post-body">
${bodyHTML}
      </div>

    </div>
  </main>

  <script src="../scripts/posts-data.js"></script>
  <script src="../scripts/topics-data.js"></script>
  <script>var ROOT_PATH = '../';</script>
  <script src="../scripts/banner-html.js"></script>

</body>
</html>
`;

  fs.writeFileSync(postFile, html, 'utf8');
  console.log(`\n  📄  Created: ${postFile}`);

  // Append to posts-data.js
  appendToPostsData({
    id:        postId,
    title,
    date:      dates.display,
    dateSort:  dates.sort,
    topic,
    imagePath: thumbnailPath,
    excerpt:   excerpt || title,
    file:      postFile
  });
  console.log(`  ✅  Added to scripts/posts-data.js`);

  console.log(`\n🎉  Done! Your new post is live at: ${postFile}\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
