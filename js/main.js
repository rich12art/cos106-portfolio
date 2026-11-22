/* main.js
   Shared JavaScript used on every page.
   It controls the mobile hamburger menu.
*/

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  // If a page is missing the button (should not happen), stop here.
  if (!toggle || !nav) {
    return;
  }

  function setMenuOpen(isOpen) {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    var isOpen = !nav.classList.contains("is-open");
    setMenuOpen(isOpen);
  });

  // Close the menu after a link is tapped on a small screen.
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  // Close the menu if the user presses the Escape key.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
});
