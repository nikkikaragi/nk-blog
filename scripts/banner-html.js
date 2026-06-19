/* ============================================================
   BANNER-HTML.JS — Injects the site banner into every page.
   This means you only need to edit the banner in ONE place.

   Every page includes this script and has a <div id="site-header"></div>
   at the top of the body, which gets filled with the banner HTML.

   Change nav link labels or add new pages here.
   ============================================================ */

/* --- CHANGE THE PATH DEPTHS BELOW ---
   Pages at root level (index.html, about.html, topics.html):
     Use paths like  'index.html', 'about.html', 'topics.html'
   Pages one folder deep (posts/post-1.html, topics/lifestyle.html):
     Use paths like  '../index.html', '../about.html', '../topics.html'
   The ROOT_PATH variable handles this automatically. */

/* Root path prefix — set by each page before including this script.
   If not set, defaults to '' (root level). */
var ROOT_PATH = (typeof ROOT_PATH !== 'undefined') ? ROOT_PATH : '';

document.addEventListener('DOMContentLoaded', function () {

  var header = document.getElementById('site-header');
  if (!header) return;

  /* ---- DESKTOP BANNER ---- */
  /* Change nav labels here. Add more links to nav-left or nav-right. */
  var bannerHTML = `
    <header class="site-header">

      <!-- ====== DESKTOP BANNER ====== -->
      <nav class="banner" aria-label="Main navigation">
        <div class="banner-inner">

          <!-- Left nav links -->
          <div class="nav-left">
            <!-- Change "Home" label or link here -->
            <a href="${ROOT_PATH}index.html">Home</a>
          </div>

          <!-- Center logo -->
          <!-- Change logo image path here -->
          <div class="banner-logo">
            <a href="${ROOT_PATH}index.html">
              <img src="${ROOT_PATH}assets/images/logo/logo.png" alt="NK Logo">
            </a>
          </div>

          <!-- Right nav links -->
          <div class="nav-right">
            <!-- Change "About" or "Topics" labels/links here -->
            <a href="${ROOT_PATH}about.html">About</a>
            <a href="${ROOT_PATH}topics.html">Topics</a>
            <!-- Add more links here if needed:
            <a href="${ROOT_PATH}contact.html">Contact</a> -->
          </div>

        </div>
      </nav>

      <!-- ====== MOBILE BANNER ====== -->
      <nav class="mobile-banner" aria-label="Mobile navigation">

        <!-- Mobile logo -->
        <a class="mobile-banner-logo" href="${ROOT_PATH}index.html">
          <img src="${ROOT_PATH}assets/images/logo/logo.png" alt="NK Logo">
        </a>

        <!-- Hamburger button (three dashes) -->
        <!-- Change aria-label here if desired -->
        <button class="hamburger-btn" id="hamburger-btn" aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>

      <!-- ====== MOBILE SLIDE-IN MENU ====== -->
      <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">

        <!-- Close button -->
        <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">&times;</button>

        <!-- Mobile nav links — change labels/links here -->
        <a href="${ROOT_PATH}index.html">Home</a>
        <a href="${ROOT_PATH}about.html">About</a>
        <a href="${ROOT_PATH}topics.html">Topics</a>
        <!-- Add more links here if needed -->

      </div>

    </header>
  `;

  header.innerHTML = bannerHTML;

  // Load the hamburger toggle script after banner is in the DOM
  var script = document.createElement('script');
  script.src = ROOT_PATH + 'scripts/banner.js';
  document.body.appendChild(script);

});
