// Header fixed on scroll
const stickyBar = document.querySelector(".sticky-bar");

function stickHeader() {
  this.scrollY > 115
    ? stickyBar.classList.add("scrolled")
    : stickyBar.classList.remove("scrolled");
}

this.addEventListener("scroll", stickHeader);

// Burger Menu toggle
const burgerBtn = document.querySelector("#burger-id");
const burgerBtnLines = document.querySelectorAll(".burger-button-line");
const mobileMenu = document.querySelector(".mobile-menu");

burgerBtn.addEventListener("click", () => {
  burgerBtnLines.forEach((line) => {
    line.classList.toggle("active");
  });
  burgerBtn.classList.toggle("pressed");
  mobileMenu.classList.toggle("active");
});

//By GEMINI AI -->
// DOM Elements
const headerNav = document.querySelector("[data-header-nav]");
const headerMenuLinks = document.querySelectorAll("[data-nav-menu-item]");
const mobileSignUp = document.querySelector("#mobile-sign-up");
const mobileMenuLinks = document.querySelectorAll("[data-mobile-menu-link]");

// Media Queries
const mediaQuery1200 = window.matchMedia("(max-width: 1200px)");
const mediaQuery992 = window.matchMedia("(max-width: 992px)");
const mediaQuery768 = window.matchMedia("(max-width: 768px)");

// Unified handler for 1200px breakpoint
function handleMediaQuery1200(e) {
  const isMatch = e.matches;

  headerMenuLinks.forEach((link, index) => {
    if (index > 4) link.style.display = isMatch ? "none" : "block";
  });

  mobileMenuLinks.forEach((link, index) => {
    if (index > 4) link.style.display = isMatch ? "block" : "none";
    if (index < 5)
      link.parentElement.style.marginBlockEnd = isMatch ? "0px" : "20px";
  });

  mobileSignUp.style.display = isMatch ? "block" : "none";
}

// Unified handler for 992px breakpoint
function handleMediaQuery992(e) {
  const isMatch = e.matches;

  headerMenuLinks.forEach((link, index) => {
    if (index > 2) {
      // If matching, hide them. If not matching, only show indices 3 and 4 (index < 5)
      link.style.display = isMatch
        ? "none"
        : index < 5
          ? "block"
          : link.style.display;
    }
  });

  mobileMenuLinks.forEach((link, index) => {
    if (index > 2) {
      link.style.display = isMatch
        ? "block"
        : index < 5
          ? "none"
          : link.style.display;
    }
    if (index > 2 && index < 5) {
      link.parentElement.style.marginBlockEnd = isMatch ? "20px" : "0px";
    }
  });
}

// Unified handler for 768px breakpoint
function handleMediaQuery768(e) {
  const isMatch = e.matches;

  headerNav.style.display = isMatch ? "none" : "flex";

  headerMenuLinks.forEach((link, index) => {
    if (isMatch) {
      link.style.display = "none";
    } else if (index < 3) {
      link.style.display = "block";
    }
  });

  mobileMenuLinks.forEach((link, index) => {
    if (isMatch) {
      link.style.display = "block";
      link.parentElement.style.marginBlockEnd = "20px";
    } else if (index < 3) {
      link.style.display = "none";
      link.parentElement.style.marginBlockEnd = "0px";
    }
  });
}

// Initial evaluations on page load
handleMediaQuery1200(mediaQuery1200);
handleMediaQuery992(mediaQuery992);
handleMediaQuery768(mediaQuery768);

// Event listeners for screen resizing
mediaQuery1200.addEventListener("change", handleMediaQuery1200);
mediaQuery992.addEventListener("change", handleMediaQuery992);
mediaQuery768.addEventListener("change", handleMediaQuery768);

//  Expand read
const text = document.querySelector(".about-us-wrapper-top .text");
const expRead = document.querySelector(".expand-read");

expRead.addEventListener("mouseover", (e) => {
  if (e) {
    e.target.style.cursor = "pointer";
    e.target.style.color = "firebrick";
  }
});

expRead.addEventListener("mouseout", (e) => {
  if (e) {
    e.target.style.color = "rgb(0, 33, 105)";
  }
});

expRead.addEventListener("click", (e) => {
  if (e.target) {
    text.style.height = "auto";
    text.style.marginBlockEnd = "1.75rem";
    expRead.style.display = "none";
  }
});
