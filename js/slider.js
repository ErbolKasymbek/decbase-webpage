// Slider Object Factory Function
function createSliderObject(wrapper, gap, btns, cards) {
  return {
    wrapper: wrapper,
    gap: gap,
    buttons: btns,
    cards: cards,
    translateX: 0,
    cardsLength: cards.length,
    cardsShown: 3,
    start: 0,
    end: 0,
    cardAndGap: 0,
    observeCard: null,
    observeWrapper: null,

    // Calculates precise boundary dimensions dynamically
    updateDimensions() {
      const cardWidth = this.cards[0].getBoundingClientRect().width;
      this.cardAndGap = cardWidth + this.gap;

      const maxScrollableCards = this.cardsLength - this.cardsShown;
      this.end =
        maxScrollableCards > 0 ? -(maxScrollableCards * this.cardAndGap) : 0;

      // Safety constraint: Prevent layout canvas overflow states on resize
      if (this.translateX < this.end) {
        this.translateX = this.end;
        this.updateTransform();
      }
    },

    updateTransform() {
      this.cards.forEach((card) => {
        card.style.transform = `translateX(${this.translateX}px)`;
      });
      this.toggleButtonClasses();
    },

    toggleButtonClasses() {
      if (this.buttons.length < 2) return;

      // buttons[0] is Prev, buttons[1] is Next based on HTML source order
      if (this.translateX < this.start) {
        this.buttons[0].classList.add("active");
      } else {
        this.buttons[0].classList.remove("active");
      }

      if (this.translateX <= this.end) {
        this.buttons[1].classList.remove("active");
      } else {
        this.buttons[1].classList.add("active");
      }
    },

    moveX() {
      const initialWidth = this.cards[0].clientWidth;

      if (this.observeCard) this.observeCard.disconnect();
      if (this.observeWrapper) this.observeWrapper.disconnect();

      // Monitors responsive breakout limits cleanly
      this.observeWrapper = new ResizeObserver((entries) => {
        const wrapperWidth = entries[0].contentBoxSize[0].inlineSize;

        this.cards.forEach((card) => {
          if (initialWidth > wrapperWidth || wrapperWidth <= 425) {
            card.style.flexBasis = "100%";
          } else {
            card.style.flexBasis = initialWidth + "px";
          }
        });

        this.updateDimensions();
      });

      this.observeWrapper.observe(this.wrapper);

      // Event Control Handlers
      this.buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // e.currentTarget bypasses nested inner SVGs to read data properties directly
          const dataset = e.currentTarget.dataset;
          const action = Object.values(dataset)[0];

          if (action === "next") {
            if (this.translateX > this.end) {
              this.translateX -= this.cardAndGap;
              if (this.translateX < this.end) this.translateX = this.end;
              this.updateTransform();
            }
          }

          if (action === "prev") {
            if (this.translateX < this.start) {
              this.translateX += this.cardAndGap;
              if (this.translateX > this.start) this.translateX = this.start;
              this.updateTransform();
            }
          }
        });
      });

      // Initialize dimensions instantly
      this.updateDimensions();
      this.toggleButtonClasses();
    },
  };
}

// ==========================================
// 1. Our Service Slider Execution
// ==========================================
const ourServiceButtons = document.querySelectorAll(
  "[data-service-slider-button]",
);
const ourServiceWrapper = document.querySelector(".our-service-bottom");
const ourServiceCards = document.querySelectorAll("[data-card]");

if (ourServiceWrapper && ourServiceCards.length > 0) {
  const ourServiceSlider = createSliderObject(
    ourServiceWrapper,
    37, // Gap matches design token
    ourServiceButtons,
    ourServiceCards,
  );
  ourServiceSlider.cardsShown = 3; // Displays 3 columns simultaneously
  ourServiceSlider.moveX();
}

// ==========================================
// 2. Testimonials Slider Execution
// ==========================================
const testimonialsButtons = document.querySelectorAll(
  "[data-testimonial-slider-button]",
);
// Targets your moving container wrapper element safely
const testimonialsWrapper = document.querySelector(
  ".testimonials-cards-wrapper",
);
const testimonialsCards = document.querySelectorAll(".testimonial-card");

if (testimonialsWrapper && testimonialsCards.length > 0) {
  const testimonialsSlider = createSliderObject(
    testimonialsWrapper,
    135, // Premium spacing gap token
    testimonialsButtons,
    testimonialsCards,
  );
  testimonialsSlider.cardsShown = 2; // Displays 2 review blocks simultaneously
  testimonialsSlider.moveX();
}
