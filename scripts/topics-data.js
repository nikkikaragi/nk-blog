/* ============================================================
   TOPICS-DATA.JS — All blog topic categories.

   TO ADD A NEW TOPIC:
   1. Add a new object to the TOPICS array below
   2. The "id" must match the "topic" field used in posts-data.js
   3. A topic page will automatically show all posts with that topic id

   Fields:
     id      — unique identifier (lowercase, no spaces, e.g. "home-decor")
     label   — display name shown on the Topics page cards
   ============================================================ */

var TOPICS = [

  { id: 'lifestyle',     label: 'Lifestyle'     },
  { id: 'fitness',       label: 'Fitness'       },
  { id: 'beauty',        label: 'Beauty'        },
  { id: 'fashion',       label: 'Fashion'       },
  { id: 'home',          label: 'Home'          },
  { id: 'relationships', label: 'Relationships' }

  /* ---- ADD A NEW TOPIC HERE ---- */
  /* Example: { id: 'travel', label: 'Travel' } */

];
