// === Lyceum JS — Minimal & Zen Version ===
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. Fade-in on scroll
  ========================================================= */
  const fadeEls = document.querySelectorAll(".fade-in");
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach(el => io.observe(el));

  /* =========================================================
     2. ABOUT DROPDOWN CLICK TOGGLE
  ========================================================= */
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!toggle || !menu) return;

    // Initialize hidden
    menu.hidden = true;

    // Click toggles open/close
    toggle.addEventListener("click", e => {
      e.stopPropagation();

      // Close any other open dropdowns first
      document.querySelectorAll(".dropdown.open").forEach(openDropdown => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove("open");
          const openMenu = openDropdown.querySelector(".dropdown-menu");
          const openToggle = openDropdown.querySelector(".dropdown-toggle");
          if (openMenu && openToggle) {
            openMenu.hidden = true;
            openToggle.setAttribute("aria-expanded", "false");
          }
        }
      });

      // Toggle this one
      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
      menu.hidden = !isOpen;
    });
  });

  // Click outside closes dropdowns
  document.addEventListener("click", e => {
    document.querySelectorAll(".dropdown.open").forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        const menu = dropdown.querySelector(".dropdown-menu");
        const toggle = dropdown.querySelector(".dropdown-toggle");
        if (menu && toggle) {
          menu.hidden = true;
          toggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Automatically open About menu on About pages
  if (window.location.pathname.includes("about")) {
    const aboutDropdown = document.querySelector(".dropdown");
    if (aboutDropdown) {
      aboutDropdown.classList.add("open");
      const menu = aboutDropdown.querySelector(".dropdown-menu");
      const toggle = aboutDropdown.querySelector(".dropdown-toggle");
      if (menu && toggle) {
        menu.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
      }
    }
  }

  /* =========================================================
     3. WATERMARK PARALLAX MOTION
  ========================================================= */
  let ticking = false;

  const updateParallax = () => {
    const scrollValue = window.scrollY || 0;
    document.documentElement.style.setProperty("--scroll", `${scrollValue}px`);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();
});
