/* ============================================================
   BANNER.JS — Handles the mobile hamburger menu open/close.
   No changes needed here unless you want different behavior.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var hamburgerBtn  = document.getElementById('hamburger-btn');
  var mobileMenu    = document.getElementById('mobile-menu');
  var menuCloseBtn  = document.getElementById('mobile-menu-close');
  var menuLinks     = document.querySelectorAll('#mobile-menu a');

  // Open menu when hamburger is tapped
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      mobileMenu.classList.add('open');
    });
  }

  // Close menu when X is tapped
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  }

  // Close menu when any link is tapped (navigates away)
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  });

  // Close menu if user taps outside it (optional UX nicety)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      mobileMenu.classList.remove('open');
    }
  });

});
