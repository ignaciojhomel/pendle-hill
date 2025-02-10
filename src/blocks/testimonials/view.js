import Splide from "@splidejs/splide";

var slider = new Splide('.testimonial-slider', {
  type: 'loop',
  arrows: false,
  pagination: true,
  gap: 20,
  perPage: 1,
  perMove: 1,
  mediaQuery: 'min',
  breakpoints: {
    768: {
        destroy: true,
    },
  },
}).mount();