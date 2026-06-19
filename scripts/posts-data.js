/* ============================================================
   POSTS-DATA.JS — The master list of all blog posts.

   TO ADD A NEW POST:
   1. Add a new object to the POSTS array below
   2. Create a matching HTML file in /posts/  (e.g. posts/post-6.html)
   3. Put the post's image in /assets/images/posts/post-6/

   Fields:
     id        — unique identifier (must match folder name, e.g. "post-6")
     title     — post title shown on cards and the post page
     date      — display date string (e.g. "19 June 2026")
     dateSort  — sortable date string YYYY-MM-DD (used to sort newest first)
     topic     — must match exactly one topic ID in TOPICS (topics-data.js)
     image     — path to card thumbnail image (relative to site root)
                 set to null if there is no image — excerpt will show instead
     excerpt   — short preview text (shown when no image, or as a teaser)
     file      — path to the post HTML file
   ============================================================ */

var POSTS = [

  /* ---- EXAMPLE POSTS — replace with your real posts ---- */

  {
    id:       'post-1',
    title:    'My Favorite Summer Table Settings',
    date:     '12 June 2026',
    dateSort: '2026-06-12',
    topic:    'lifestyle',
    image:    'assets/images/posts/post-1/thumbnail.jpg',
    excerpt:  'Creating a beautiful outdoor dinner table does not have to cost a fortune. Here are my go-to tips for a dreamy summer spread...',
    file:     'posts/post-1.html'
  },

  {
    id:       'post-2',
    title:    'My Morning Workout Routine (Long Version That Wraps)',
    date:     '9 June 2026',
    dateSort: '2026-06-09',
    topic:    'fitness',
    image:    'assets/images/posts/post-2/thumbnail.jpg',
    excerpt:  'Starting the day with movement changed everything for me. Here is exactly what I do every morning before 8am...',
    file:     'posts/post-2.html'
  },

  {
    id:       'post-3',
    title:    'My Everyday Skincare Routine',
    date:     '28 May 2026',
    dateSort: '2026-05-28',
    topic:    'beauty',
    image:    'assets/images/posts/post-3/thumbnail.jpg',
    excerpt:  'Five simple steps for glowy skin without spending a fortune on products...',
    file:     'posts/post-3.html'
  },

  {
    id:       'post-4',
    title:    'Best Protein Snacks for Long Hikes (Another Long Title Example)',
    date:     '20 May 2026',
    dateSort: '2026-05-20',
    topic:    'fitness',
    image:    null,    /* No image — excerpt text will show on the card instead */
    excerpt:  'After testing dozens of snacks on the trail, here are the ones that actually keep me going without slowing me down...',
    file:     'posts/post-4.html'
  },

  {
    id:       'post-5',
    title:    'Hosting a Girls Brunch at Home',
    date:     '10 May 2026',
    dateSort: '2026-05-10',
    topic:    'lifestyle',
    image:    'assets/images/posts/post-5/thumbnail.jpg',
    excerpt:  'Everything you need to throw the most fun, low-stress brunch with your closest friends...',
    file:     'posts/post-5.html'
  }

  /* ---- ADD YOUR NEXT POST HERE ---- */

];
