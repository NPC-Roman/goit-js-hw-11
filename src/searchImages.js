import Notiflix from 'notiflix';
import axios from 'axios';
const loadMoreBtn = document.querySelector('.load-more');
const endOfResults = document.querySelector('.end-of-results');

export default class SearchImages {
  constructor() {
    this.name = '';
    this.page = 1;
  }

  async fetchImages() {
    const BASE_URL =
      'https://pixabay.com/api/?key=39262191-95c38e0c922a6e4de67d8ef27';
    const BASE_PARAMS =
      '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

    return await axios
      .get(`${BASE_URL}&q=${this.name}${BASE_PARAMS}&page=${this.page}`)
      .then(data => {
        console.log(data.data.total);
        if (data.data.total === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          loadMoreBtn.classList.add('is-hidden');
          endOfResults.classList.add('is-hidden');
        } else if (this.page >= data.data.total / 40) {
          Notiflix.Notify.success(`Hooray! We found ${data.data.total} images`);
          loadMoreBtn.classList.add('is-hidden');
          endOfResults.classList.remove('is-hidden');
        } else {
          Notiflix.Notify.success(`Hooray! We found ${data.data.total} images`);
          loadMoreBtn.classList.remove('is-hidden');
          endOfResults.classList.add('is-hidden');
        }

        this.nextPage();
        return data.data.hits;
      })
      .catch(error => console.log(error));
  }

  nextPage() {
    this.page += 1;
  }

  reset() {
    this.page = 1;
  }

  get newName() {
    return this.name;
  }

  set newName(newN) {
    this.name = newN;
  }
}
