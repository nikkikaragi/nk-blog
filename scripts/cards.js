/* ============================================================
   CARDS.JS — Builds the blog post card grid dynamically.
   Used on the Home page and Topic pages.
   Reads from posts-data.js (POSTS array).
   ============================================================ */

/**
 * Renders all blog cards into a container element.
 *
 * @param {string} containerId  - the id of the <div> to fill with cards
 * @param {string|null} filterTopic - if set, only shows posts with this topic id
 *                                    if null, shows ALL posts (Home page)
 */
function renderCards(containerId, filterTopic) {

  var container = document.getElementById(containerId);
  if (!container) return;

  // Sort posts newest first (by dateSort field)
  var sorted = POSTS.slice().sort(function (a, b) {
    return b.dateSort.localeCompare(a.dateSort);
  });

  // Filter by topic if on a topic page
  var posts = filterTopic
    ? sorted.filter(function (p) { return p.topic === filterTopic; })
    : sorted;

  // Show a message if no posts match
  if (posts.length === 0) {
    container.innerHTML = '<p style="font-family:var(--font-body);color:var(--color-text-secondary);padding:40px 0;">No posts yet — check back soon!</p>';
    return;
  }

  // Build the grid of cards
  var html = '';

  posts.forEach(function (post) {

    /* ---- Build image OR excerpt block ---- */
    html += '<a class="blog-card" href="' + post.file + '">';

    if (post.image) {
      html += '<img class="blog-card-image" src="' + post.image + '" alt="' + post.title + '" loading="lazy">';
    }

    html += '<div class="blog-card-body">';
    html +=   '<p class="blog-card-title">' + post.title + '</p>';
    html +=   '<p class="blog-card-date">' + post.date + '</p>';

    if (!post.image && post.excerpt) {
      html += '<p class="blog-card-excerpt">' + post.excerpt + '</p>';
    }

    html += '</div>';
    html += '</a>';

  });

  container.innerHTML = html;
}
