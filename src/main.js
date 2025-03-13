import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { refs } from './js/refs';
import { renderImages } from './js/render-functions';
import iconError from './img/error.svg';
import { showLoader, hideLoader } from './js/loader';
import { Input } from 'postcss';

let page = 1;
let isLoading = false;

refs.inputQuery.addEventListener('input', () => {
  if (refs.inputQuery.value.trim() === '') {
    refs.btnSearch.setAttribute('disabled', true);
  }
  refs.btnSearch.removeAttribute('disabled');
});

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const query = refs.inputQuery.value.trim();
  if (query) {
    page = 1;
    refs.gallery.innerHTML = '';
    loadImages(query);
  }
  refs.inputQuery.value = '';
});

const loadImages = query => {
  if (isLoading) {
    return;
  }
  isLoading = true;
  showLoader();
  fetchImages(query, page)
    .then(images => {
      if (images.length === 0) {
        iziToast.show({
          message:
            ' Sorry, there are no images matching your search query.Please try again!',
          messageColor: '#FAFAFB',
          position: 'topRight',
          backgroundColor: '#EF4040',
          borderColor: '#FFBEBE',
          maxWidth: 432,
          theme: 'dark',
          class: 'custom-toast',
          position: 'topRight',
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
const loadScroll = query => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  if (scrollPosition >= pageHeight - 200) {
    loadImages(query);
  }
};
window.addEventListener('scroll', loadScroll);
