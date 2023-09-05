import 'simplelightbox/dist/simple-lightbox.min.css';

import './css/styles.css';
import Notiflix from 'notiflix';
import SearchImages from './searchImages';
import SimpleLightbox from 'simplelightbox';

import axios from 'axios';

const submitForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const endOfResults = document.querySelector('.end-of-results');

// new SimpleLightbox ('.photo-card a', {captionsData: 'alt', captionsDelay: 250})

const searchImages = new SearchImages();

submitForm.addEventListener('submit', findImage);
loadMoreBtn.addEventListener('click', loadMore);

function findImage(e) {
  e.preventDefault();
  resetImages();
  gallery.innerHTML = '';
  searchImages.newName = e.currentTarget.elements.searchQuery.value.trim();

  if (searchImages.newName === '') {
    return noImages();
  }
  searchImages.reset();

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
