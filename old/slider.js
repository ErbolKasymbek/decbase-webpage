// Slider Object Function
function createSliderObject(wrapper, gap, btns, cards) {
  return {
    wrapper: wrapper,
    gap: gap,
    buttons: btns,
    btnsDataset: null,
    cards: cards,
    translateX: 0,
    cardWidth: cards[0].clientWidth,
    cardAndGap: 0,
    cardsLength: cards.length,
    cardsShown: 3,
    start: 0,
    end: 0,
    observeCard: null,
    observeWrapper: null,

    moveX() {
      let initialWidth = this.cards[0].clientWidth;
      let cardWidth;
      let wrapperWidth;

      this.cards.forEach((card) => {
        if (card.clientWidth > this.wrapper.clientWidth) {
          card.style.flexBasis = "100%";
        }
        if (card.clientWidth < this.wrapper.clientWidth) {
          card.style.flexBasis = initialWidth + "px";
        }
      });

      this.observeCard = new ResizeObserver((entries) => {
        cardWidth = entries[0].borderBoxSize[0].inlineSize;
      });
      this.observeCard.observe(this.cards[0]);

      this.observeWrapper = new ResizeObserver((entries) => {
        console.log(this.observeWrapper);
        wrapperWidth = entries[0].contentBoxSize[0].inlineSize;
        if (cardWidth > wrapperWidth) {
          this.cards.forEach((card) => {
            card.style.flexBasis = "100%";
          });
        }

        if (wrapperWidth > 425) {
          this.cards.forEach((card) => {
            card.style.flexBasis = initialWidth + "px";
          });
        }
      });
      this.observeWrapper.observe(this.wrapper);

      this.buttons.forEach((btn) => {
        this.btnsDataset = btn.dataset;
      });

      for (let dataName in this.btnsDataset) {
        this.btnsDataset = dataName;
      }

      this.cardAndGap = this.cardWidth + this.gap;
      this.end =
        (this.cardsLength - this.cardsShown) *
        (this.cardAndGap - this.gap) *
        -1;

      this.buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          if (e.currentTarget.dataset[this.btnsDataset] === "next") {
            if (this.end < this.translateX) {
              this.translateX = this.translateX - this.cardAndGap;
              this.cards.forEach((card) => {
                card.style.transform = "translateX(" + this.translateX + "px)";
              });
              if (this.start > this.translateX) {
                btns[0].classList.add("active");
              }
              if (this.end > this.translateX) {
                btns[1].classList.remove("active");
              }
            }
          }

          console.log(this.translateX);

          if (e.currentTarget.dataset[this.btnsDataset] === "prev") {
            if (this.start > this.translateX) {
              this.translateX = this.translateX + this.cardAndGap;
              this.cards.forEach((card) => {
                card.style.transform = "translateX(" + this.translateX + "px)";
              });
              if (this.start === this.translateX) {
                btns[0].classList.remove("active");
              }
              if (this.end < this.translateX) {
                btns[1].classList.add("active");
              }
            }
          }
        });
      });
    },
  };
}

// Our service slider
const ourServiceButtons = document.querySelectorAll(
  "[data-service-slider-button]"
);
const ourServiceWrapper = document.querySelector(".our-service-bottom");
const ourServiceCards = document.querySelectorAll("[data-card]");

const ourServiceSlider = createSliderObject(
  ourServiceWrapper,
  37,
  ourServiceButtons,
  ourServiceCards
);

ourServiceCards.forEach((card) => {
  console.log(card);
});

ourServiceSlider.moveX();

// Testimonials slider
const testimonialsButtons = document.querySelectorAll(
  "[data-testimonial-slider-button]"
);
const testimonialsWrapper = document.querySelector(
  ".testimonials-cards-wrapper"
);
const testimonialsCards = document.querySelectorAll(".testimonial-card");

const testimonialsSlider = createSliderObject(
  testimonialsWrapper,
  135,
  testimonialsButtons,
  testimonialsCards
);

testimonialsSlider.cardsShown = 2;
testimonialsSlider.moveX();
