// import SearchImages from './searchImages';

// import 'simplelightbox/dist/simple-lightbox.min.css';

// import Notiflix from 'notiflix';
// import axios from 'axios';
// console.log(axios.isCancel('something'));

// const elements = {
//   submitForm: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// const searchImages = new SearchImages();

// elements.submitForm.addEventListener('submit', findImage);
// elements.loadMoreBtn.addEventListener('click', loadMore);

// function findImage(event) {
//   event.preventDefault();
//   resetImages();
//   elements.gallery.innerHTML = '';
//   searchImages.newName = event.currentTarget.elements.searchQuery.value.trim();

//   if (searchImages.newName === '') {
//     return noImages();
//   }
//   searchImages.reset();

//   document.body.style.backgroundColor = getRandomBackgroundColor();

//   searchImages.fetchImages().then(findGalleryOfImages).catch(noImages);
// }

// function loadMore() {
//   searchImages.fetchImages().then(findGalleryOfImages);
// }

// function findGalleryOfImages(images) {
//   elements.gallery.insertAdjacentHTML('beforeend', allImages(images));
// }

// function allImages(images) {
//   return images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         likes,
//         views,
//         comments,
//         downloads,
//         tags,
//       }) => {
//         return `
//     <div class="photo-card">
//     <a href=${largeImageURL}>
//     <img src="${webformatURL}" alt="${tags}" loading="lazy"  width=320px height=500px;/>
//     </a>

//     <div class="info">
//       <p class="info-item">
//         <b>Likes: ${likes}</b>
//       </p>
//       <p class="info-item">
//         <b>Views: ${views}</b>
//       </p>
//       <p class="info-item">
//         <b>Comment: ${comments}</b>
//       </p>
//       <p class="info-item">
//         <b>Downloads: ${downloads}</b>
//       </p>
//     </div>

//     </div>`;
//       }
//     )
//     .join('');
// }

// function resetImages() {
//   elements.gallery.innerHTML = '';
// }

// function noImages() {
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
// }

// const backgroundColors = [
//   '#E0BBE4',
//   '#FFDFD3',
//   '#9EDEF2',
//   '#C6F2AF',
//   '#D3DFCB',
//   '#FDF8E6',
//   '#FFFEDB',
// ];

// function getRandomBackgroundColor() {
//   const randomIndex = Math.floor(Math.random() * backgroundColors.length);
//   return backgroundColors[randomIndex];
// }
/*
import { fetchEvents } from './API';
import './styles.css';

const wrapper = document.querySelector('.swiper-wrapper');

fetchEvents()
  .then(el => {
    wrapper.insertAdjacentHTML('beforeend', renderSlide(el));
  })
  .catch(err => console.log(err));

function renderSlide(el) {
  return el
    .map(({ cook, topic, id }) => {
      return `
      <div class="swiper-slide">
      <div class="layout">
      <div class="slide-layout cook">
        <img src="${cook.imgUrl}" alt="${cook.name}" width="137px" height="442px" />
      </div>
    
      <div class="slide-layout dish-desc">
        <img
          src="${topic.previewUrl}"
          alt="${topic.name}"
          width="350px"
          height="400px"
        />
        <p class="dish-name">${topic.name}</p>
        <p class="country">${topic.area}</p>
      </div>
      <div class="slide-layout dish">
        <img
          src="${topic.imgWebpUrl}"
          alt="${topic.name}"
          width="350px"
          height="400px"
        />
      </div>
      </div>
    </div>
    
         `;
    })
    .join('');
}*/

import { getAllEvents } from './api-service.js';
import { createMarkupHeroEvents } from './hero-events.js';
import { refs } from './refs.js';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

export async function loadHeroData() {
  try {
    const events = await getAllEvents();
    const markup = createMarkupHeroEvents(events);
    refs.swiperWrapperHero.insertAdjacentHTML('beforeend', markup);

    const heroSwiper = new Swiper('.swiper-hero', {
      slidesPerView: 0.8,
      spaceBetween: 40,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
