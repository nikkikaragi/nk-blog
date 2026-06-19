# NK Blog

A clean, responsive personal blog. Cutesy aesthetic, mobile-first, easy to edit.

---

## Folder Structure

```
nk-blog/
│
├── index.html              ← Home page (all posts)
├── about.html              ← About Me page
├── topics.html             ← Topics index page
│
├── posts/                  ← One HTML file per blog post
│   ├── post-1.html
│   ├── post-2.html
│   └── ...
│
├── topics/                 ← One HTML file per topic/category
│   ├── lifestyle.html
│   ├── fitness.html
│   ├── beauty.html
│   ├── fashion.html
│   ├── home.html
│   └── relationships.html
│
├── styles/                 ← All CSS — one file per concern
│   ├── colors.css          ← 🎨 ALL colors live here
│   ├── fonts.css           ← 🔤 ALL fonts live here
│   ├── base.css            ← Global resets
│   ├── banner.css          ← Top banner + mobile menu
│   ├── cards.css           ← Blog post card squares
│   ├── topics.css          ← Topic category cards
│   ├── about.css           ← About page
│   ├── post.css            ← Individual blog post pages
│   └── responsive.css      ← Mobile + tablet breakpoints
│
├── scripts/                ← All JavaScript
│   ├── posts-data.js       ← 📝 Add/edit your blog posts here
│   ├── topics-data.js      ← 📂 Add/edit topic categories here
│   ├── banner-html.js      ← Injects banner into every page
│   ├── banner.js           ← Hamburger menu toggle
│   ├── cards.js            ← Renders blog card grids
│   └── topics.js           ← Renders topic card grids
│
└── assets/
    ├── images/
    │   ├── logo/
    │   │   └── logo.png        ← Your logo (centered in banner)
    │   ├── banner/
    │   │   └── banner-bg.jpg   ← Optional banner background image
    │   ├── about/
    │   │   └── about-photo.jpg ← Your About page photo
    │   └── posts/
    │       ├── post-1/
    │       │   ├── thumbnail.jpg   ← Card thumbnail
    │       │   └── image-2.jpg     ← In-post images
    │       ├── post-2/
    │       └── ...
    └── fonts/                  ← Optional: local font files
```

---

## How to Add a New Blog Post

1. **Add your post to `scripts/posts-data.js`**
   Copy the existing object format and fill in your fields.
   The `topic` field must match an id in `topics-data.js`.

2. **Create the post HTML file**
   Copy `posts/post-1.html` → `posts/post-6.html` (increment the number).
   Edit the title, date, topic link, and body content.

3. **Add images**
   Put them in `assets/images/posts/post-6/`.
   Reference them in your HTML as `../assets/images/posts/post-6/image.jpg`.

That's it! The home page and topic pages update automatically.

---

## How to Add a New Topic

1. **Add to `scripts/topics-data.js`**
   ```js
   { id: 'travel', label: 'Travel' }
   ```

2. **Create the topic page**
   Copy `topics/lifestyle.html` → `topics/travel.html`.
   Change `'lifestyle'` to `'travel'` in the renderCards call.
   Change the `<title>` and `<h1>` to "Travel".

3. Tag your posts with `topic: 'travel'` in `posts-data.js`.

---

## How to Change Colors

Open `styles/colors.css` — every color has a comment explaining what it controls.

## How to Change Fonts

Open `styles/fonts.css` — swap the Google Fonts `@import` URL and update the `--font-*` variables.

## How to Use a Banner Background Image

In `styles/banner.css`, uncomment the `background-image` lines and point to your image.

---

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages** in your repo.
3. Set Source to `main` branch, `/ (root)` folder.
4. Your site will be live at `https://yourusername.github.io/nk-blog/`

### Custom Domain
1. In GitHub Pages settings, enter your domain (e.g. `www.yourdomain.com`).
2. Add a CNAME record in your domain registrar pointing to `yourusername.github.io`.
3. GitHub will handle the SSL certificate automatically.
