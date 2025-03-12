import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./refs";

export const renderImages = (images) => {
    const gallery = refs.gallery;
    gallery.innerHTML = images.map(image =>
         ` <li class="gallery-item">
          <a class="galery-link" href="${image.webUrl}"> <img src="${image.imgUrl}" alt="${image.alt}" /></a>
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
    ).join('');    
   
const lightbox = new SimpleLightbox('.gallery a', {
    captionData: 'alt',
    captionDelay: 250,
});
lightbox.refresh();
};