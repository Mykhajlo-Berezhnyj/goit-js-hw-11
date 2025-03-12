import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api";
import { refs } from "./js/refs";
import { renderImages } from "./js/render-functions";

let page = 1;
let isLoading = false;
refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = refs.inputQuery.value.trim();
    if (query) {
        page = 1;
        refs.gallery.innerHTML = '';
        loadImages(query);
    }
});

const loadImages = (query) => {
    if (isLoading) {
        return;
    }
    isLoading = true
    fetchImages(query, page)
        .then(images => {
            if (images.length === 0) {
                iziToast.show({
                    title: 'Warning!',
                    message: ' Sorry, there are no images matching your search query.Please try again!',
                    titleColor: '#FFFFFF',
                    messageColor: '#FFFFFF',
                    position: 'topRight',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                });
            } else {
                renderImages(images);
                page += 1;
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
        .finally(() => {
            isLoading = false;
        });
};
const loadScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = documentElement.scrollHeight;
    if (scrollPosition >= pageHeight - 200) {
        const query = refs.inputQuery.value.trim();
        if (query) {
            loadImages(query);
        }
    }
};
window.addEventListener('scroll', loadScroll);