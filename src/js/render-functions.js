import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';

export const renderImages = images => {
  const gallery = refs.gallery;
  const galleryItems = images
    .map(
      image =>
        ` <li class="gallery-item">
          <a class="gallery-link" href="${image.webformatURL}"> <img class="gallery-img" src="${image.largeImageURL}" alt="${image.tags}" /></a>
          <table>
           <table>
            <tr>
              <th>Likes</th> 
              <th>Views</th>
              <th>Comments</th>
              <th>Downloads</th>
            </tr>
            <tr>
             <td>${image.likes}</td>
             <td>${image.views}</td>
             <td>${image.comments}</td>
             <td>${image.downloads}</td>
            </tr>
          </table>
        </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryItems);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
};
