import './styles.css';
import SearchImages from './searchImages';

import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import axios from 'axios';
console.log(axios.isCancel('something'));

const submitForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const searchImages = new SearchImages();

submitForm.addEventListener('submit', findImage);
loadMoreBtn.addEventListener('click', loadMore);

function findImage(event) {
  event.preventDefault();
  resetImages();
  gallery.innerHTML = '';
  searchImages.newName = event.currentTarget.elements.searchQuery.value.trim();

  if (searchImages.newName === '') {
    return noImages();
  }
  searchImages.reset();

  // Встановлюємо випадковий фон
  document.body.style.backgroundColor = getRandomBackgroundColor();

  searchImages.fetchImages().then(findGalleryOfImages).catch(noImages);
}

function loadMore() {
  searchImages.fetchImages().then(findGalleryOfImages);
}

function findGalleryOfImages(images) {
  gallery.insertAdjacentHTML('beforeend', allImages(images));
}

function allImages(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
        tags,
      }) => {
        return `
    <div class="photo-card">
    <a href=${largeImageURL}>
    <img src="${webformatURL}" alt="${tags}" loading="lazy"  width=320px height=500px;/>
    </a>

    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comment: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>

    </div>`;
      }
    )
    .join('');
}

function resetImages() {
  gallery.innerHTML = '';
}

function noImages() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

const backgroundColors = [
  '#E0BBE4',
  '#FFDFD3',
  '#9EDEF2',
  '#C6F2AF',
  '#D3DFCB',
  '#FDF8E6',
  '#FFFEDB',
];

function getRandomBackgroundColor() {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
}
