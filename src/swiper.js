// import Swiper from 'swiper';
// import { Pagination, Autoplay } from 'swiper/modules';

// import 'swiper/css';
new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 800,

  pagination: {
    el: '.swiper-pagination',
    allowSlideNext: true,
    clickable: true,
    dynamicBullets: true,
  },
  //   autoplay: {
  //     delay: 1500,
  //   },
});
