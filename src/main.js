import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { refs } from './js/refs';
import { renderImages } from './js/render-functions';
import iconError from './img/error.svg';
import { showLoader, hideLoader } from './js/loader';

let page = 1;
let isLoading = false;
let currentQuery = '';

refs.form.addEventListener('input', () => {
    const queryInput = refs.inputQuery.value.trim();
  if (queryInput === '') {
      refs.btnSearch.setAttribute('disabled', true);
      refs.inputQuery.value = '';
      iziToast.warning({
          title: 'Caution',
          message:
            'Sorry, the input cannot be empty or contain only spaces!',
           position: 'bottomLeft',
          maxWidth: 300,
          timeout: 1000,
        });
  } else {
  refs.btnSearch.removeAttribute('disabled');
  }
});

refs.form.addEventListener('submit', event => {
  event.preventDefault();
    const query = refs.inputQuery.value.trim();
    currentQuery = query;
  if (query) {
    page = 1;
    refs.gallery.innerHTML = '';
    loadImages();
  }
  refs.inputQuery.value = '';
});

const loadImages = () => {
  if (isLoading) {
    return;
  }
  isLoading = true;
  showLoader();
  fetchImages(currentQuery, page)
    .then(images => {
      if (images.length === 0) {
         iziToast.error({
          message:
            ' Sorry, there are no images matching your search query.Please try again!',
          messageColor: '#FAFAFB',
          position: 'topRight',
          backgroundColor: '#EF4040',
          borderColor: '#FFBEBE',
          maxWidth: 432,
          class: 'custom-toast',
          position: 'topRight',
          theme: 'dark',
          iconUrl: iconError,
        });
      } else {
        renderImages(images);
        page += 1;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
        isLoading = false;
        hideLoader();     
    });
};
const loadScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  if (scrollPosition >= pageHeight - 200) {
    loadImages();
  }
};
window.addEventListener('scroll', loadScroll);
