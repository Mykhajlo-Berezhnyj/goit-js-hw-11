import{a as d,S as f,i as h}from"./assets/vendor-mYwBqgd4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();d.defaults.baseURL="https://pixabay.com/api/";const m="49272526-e1b2de60044cea6af49c76424",p=(s,t=1)=>d.get("",{params:{key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:21,page:t}}).then(n=>n.data.hits.map(e=>({webUrl:e.webformatURL,imgUrl:e.largeImageURL,alt:e.tags,likes:e.likes,views:e.views,comments:e.comments,downloads:e.downloads}))).catch(n=>{throw console.error("Error fetchImages:",n),n}),l={form:document.querySelector(".form"),inputQuery:document.querySelector('input[type="text"]'),btnSearch:document.querySelector(".btn-search"),gallery:document.querySelector(".gallery")},y=s=>{const t=l.gallery;t.innerHTML=s.map(e=>` <li class="gallery-item">
          <a class="galery-link" href="${e.webUrl}"> <img src="${e.imgUrl}" alt="${e.alt}" /></a>
          <table>
           <table>
            <tr>
              <th>Likes</th> 
              <th>Views</th>
              <th>Comments</th>
              <th>Downloads</th>
            </tr>
            <tr>
             <td>${e.likes}</td>
             <td>${e.views}</td>
             <td>${e.comments}</td>
             <td>${e.downloads}</td>
            </tr>
          </table>
        </li>`).join(""),new f(".gallery a",{captionData:"alt",captionDelay:250}).refresh()};let c=1,a=!1;l.form.addEventListener("submit",s=>{s.preventDefault();const t=l.inputQuery.value.trim();t&&(c=1,l.gallery.innerHTML="",u(t))});const u=s=>{a||(a=!0,p(s,c).then(t=>{t.length===0?h.show({title:"Warning!",message:" Sorry, there are no images matching your search query.Please try again!",titleColor:"#FFFFFF",messageColor:"#FFFFFF",position:"topRight",backgroundColor:"#EF4040",position:"topRight"}):(y(t),c+=1)}).catch(t=>{console.error("Error:",t)}).finally(()=>{a=!1}))},g=()=>{const s=window.scrollY+window.innerHeight,t=documentElement.scrollHeight;if(s>=t-200){const n=l.inputQuery.value.trim();n&&u(n)}};window.addEventListener("scroll",g);
//# sourceMappingURL=index.js.map
