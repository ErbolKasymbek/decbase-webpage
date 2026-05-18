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

// Media queries for desktop nav menu and mobile nav menu
const headerNav = document.querySelector("[data-header-nav]");
const headerMenuLinks = document.querySelectorAll("[data-nav-menu-item]");
const mobileSignUp = document.querySelector("#mobile-sign-up");
const mobileMenuLinks = document.querySelectorAll("[data-mobile-menu-link]");
const mediaQuery1200 = window.matchMedia("(max-width: 1200px)");
const mediaQuery992 = window.matchMedia("(max-width: 992px)");
const mediaQuery768 = window.matchMedia("(max-width: 768px)");

function checkStaticMediaQuery1200() {
  if (mediaQuery1200.matches) {
    headerMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "none";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "block";
      }

      if (index < 5) {
        link.parentElement.style.marginBlockEnd = "0px";
      }
    });

    mobileSignUp.style.display = "block";
  } else {
    headerMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "block";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "none";
      }

      if (index < 5) {
        link.parentElement.style.marginBlockEnd = "20px";
      }
    });

    mobileSignUp.style.display = "none";
  }
}

function checkStaticMediaQuery992() {
  if (mediaQuery992.matches) {
    headerMenuLinks.forEach((link, index) => {
      if (index > 2) {
        link.style.display = "none";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 2) {
        link.style.display = "block";
      }

      if (index > 2 && index < 5) {
        link.parentElement.style.marginBlockEnd = "20px";
      }
    });
  } else {
    headerMenuLinks.forEach((link, index) => {
      if (index > 2 && index < 5) {
        link.style.display = "block";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 2 && index < 5) {
        link.style.display = "none";
      }

      if (index > 2 && index < 5) {
        link.parentElement.style.marginBlockEnd = "0px";
      }
    });
  }
}

function checkStaticMediaQuery768() {
  if (mediaQuery768.matches) {
    headerNav.style.display = "none";

    headerMenuLinks.forEach((link, index) => {
      if (index > -1) {
        link.style.display = "none";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > -1) {
        link.style.display = "block";
      }

      if (index > -1) {
        link.parentElement.style.marginBlockEnd = "20px";
      }
    });
  } else {
    headerNav.style.display = "flex";

    headerMenuLinks.forEach((link, index) => {
      if (index > -1 && index < 3) {
        link.style.display = "block";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > -1 && index < 3) {
        link.style.display = "none";
      }

      if (index > -1 && index < 3) {
        link.parentElement.style.marginBlockEnd = "0px";
      }
    });
  }
}

function checkDynamicMediaQuery1200(e) {
  if (e.matches) {
    headerMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "none";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "block";
      }

      if (index < 5) {
        link.parentElement.style.marginBlockEnd = "0px";
      }
    });

    mobileSignUp.style.display = "block";
  } else {
    headerMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "block";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 4) {
        link.style.display = "none";
      }

      if (index < 5) {
        link.parentElement.style.marginBlockEnd = "20px";
      }
    });

    mobileSignUp.style.display = "none";
  }
}

function checkDynamicMediaQuery992(e) {
  if (e.matches) {
    headerMenuLinks.forEach((link, index) => {
      if (index > 2) {
        link.style.display = "none";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 2) {
        link.style.display = "block";
      }

      if (index > 2 && index < 5) {
        link.parentElement.style.marginBlockEnd = "20px";
      }
    });
  } else {
    headerMenuLinks.forEach((link, index) => {
      if (index > 2 && index < 5) {
        link.style.display = "block";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > 2 && index < 5) {
        link.style.display = "none";
      }

      if (index > 2 && index < 5) {
        link.parentElement.style.marginBlockEnd = "0px";
      }
    });
  }
}

function checkDynamicMediaQuery768(e) {
  if (e.matches) {
    headerNav.style.display = "none";

    headerMenuLinks.forEach((link, index) => {
      if (index > -1) {
        link.style.display = "none";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > -1) {
        link.style.display = "block";
      }

      if (index > -1) {
        link.parentElement.style.marginBlockEnd = "20px";
      }
    });
  } else {
    headerNav.style.display = "flex";

    headerMenuLinks.forEach((link, index) => {
      if (index > -1 && index < 3) {
        link.style.display = "block";
      }
    });

    mobileMenuLinks.forEach((link, index) => {
      if (index > -1 && index < 3) {
        link.style.display = "none";
      }

      if (index > -1 && index < 3) {
        link.parentElement.style.marginBlockEnd = "0px";
      }
    });
  }
}

checkStaticMediaQuery1200();
checkStaticMediaQuery992();
checkStaticMediaQuery768();

mediaQuery1200.addEventListener("change", checkDynamicMediaQuery1200);
mediaQuery992.addEventListener("change", checkDynamicMediaQuery992);
mediaQuery768.addEventListener("change", checkDynamicMediaQuery768);

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
