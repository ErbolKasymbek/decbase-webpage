// Slider Object Function - Refacotored by Google GEMINI AI
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

    // Helper to dynamically calculate boundaries on resize
    updateDimensions() {
      const cardWidth = this.cards[0].getBoundingClientRect().width;
      this.cardAndGap = cardWidth + this.gap;

      // Correct mathematical boundary for track translation
      const maxScrollableCards = this.cardsLength - this.cardsShown;
      this.end =
        maxScrollableCards > 0 ? -(maxScrollableCards * this.cardAndGap) : 0;

      // Enforce bounds if translation is out of range after a resize
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

      // Assuming buttons[0] is Prev and buttons[1] is Next
      // Highlight Prev if we have scrolled forward
      if (this.translateX < this.start) {
        this.buttons[0].classList.add("active");
      } else {
        this.buttons[0].classList.remove("active");
      }

      // Dim Next if we reached the absolute end
      if (this.translateX <= this.end) {
        this.buttons[1].classList.remove("active");
      } else {
        this.buttons[1].classList.add("active");
      }
    },

    moveX() {
      const initialWidth = this.cards[0].clientWidth;

      // Clean up existing observers if moveX is rerun
      if (this.observeCard) this.observeCard.disconnect();
      if (this.observeWrapper) this.observeWrapper.disconnect();

      // Handle Wrapper Resizing and Responsive Card Basis
      this.observeWrapper = new ResizeObserver((entries) => {
        const wrapperWidth = entries[0].contentBoxSize[0].inlineSize;

        this.cards.forEach((card) => {
          if (initialWidth > wrapperWidth || wrapperWidth <= 425) {
            card.style.flexBasis = "100%";
          } else {
            card.style.flexBasis = initialWidth + "px";
          }
        });

        // Recalculate dimensions after card layout stabilizes
        this.updateDimensions();
      });

      this.observeWrapper.observe(this.wrapper);

      // Event Listeners for controls
      this.buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // Dynamically read the action key value (prev or next) from dataset keys
          const dataset = e.currentTarget.dataset;
          const action = Object.values(dataset)[0];

          if (action === "next") {
            if (this.translateX > this.end) {
              this.translateX -= this.cardAndGap;
              // Prevent overshooting the final bounds
              if (this.translateX < this.end) this.translateX = this.end;
              this.updateTransform();
            }
          }

          if (action === "prev") {
            if (this.translateX < this.start) {
              this.translateX += this.cardAndGap;
              // Prevent overshooting the start bounds
              if (this.translateX > this.start) this.translateX = this.start;
              this.updateTransform();
            }
          }
        });
      });

      // Initial layout setup
      this.updateDimensions();
      this.toggleButtonClasses();
    },
  };
}

// Our Service section
const ourServiceButtons = document.querySelectorAll(
  "[data-service-slider-button]",
);
const ourServiceWrapper = document.querySelector(".our-service-bottom");
const ourServiceCards = document.querySelectorAll("[data-card]");

if (ourServiceWrapper && ourServiceCards.length > 0) {
  const ourServiceSlider = createSliderObject(
    ourServiceWrapper,
    37,
    ourServiceButtons,
    ourServiceCards,
  );
  ourServiceSlider.cardsShown = 3;
  ourServiceSlider.moveX();
}

// Testimonials section
const testimonialsButtons = document.querySelectorAll(
  "[data-testimonial-slider-button]",
);
const testimonialsWrapper = document.querySelector(
  ".testimonials-cards-wrapper",
);
const testimonialsCards = document.querySelectorAll(".testimonial-card");

if (testimonialsWrapper && testimonialsCards.length > 0) {
  const testimonialsSlider = createSliderObject(
    testimonialsWrapper,
    135,
    testimonialsButtons,
    testimonialsCards,
  );
  testimonialsSlider.cardsShown = 2;
  testimonialsSlider.moveX();
}
