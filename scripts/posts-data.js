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
/* ---- ADD YOUR NEXT POST HERE ---- with a comma after }*/
  {
    id:       '26-06-12_first-post',
    title:    'First Post',
    date:     '19 June 2026',
    dateSort: '2026-06-19',
    topic:    'lifestyle',
    image:    'assets/images/posts/26-06-12_first-post/phonto.jpg',
    excerpt:  'Eatnektarine&#39;s first blog post.',
    file:     'posts/26-06-12_first-post.html'
  }

  

];
