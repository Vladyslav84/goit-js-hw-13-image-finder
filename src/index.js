import './sass/main.scss';
import _debounce from '../node_modules/lodash.debounce';
import galleryTml from './templates/galleryTml.hbs';
import ApiService from './js/apiService';
import * as basicLightbox from '../node_modules/basiclightbox/'
import '../node_modules/basiclightbox/dist/basicLightbox.min.css'

const galleryEl = document.querySelector('.gallery');
const LoadMoreBtnEl = document.querySelector('.LoadMoreBtn');
const input = document.querySelector('.input');
const apiService = new ApiService();

LoadMoreBtnEl.addEventListener('click', handleloadMore);
// galleryEl.addEventListener('click', onGalleryElClick);
input.addEventListener('input', _debounce(getImg, 1000));

function getImg(evt) {
    evt.preventDefault();

    apiService.query = evt.target.value;

    if (apiService.query)
    {

        apiService.getImg().then(renderGallary);

        LoadMoreBtnEl.classList.toggle('opacity');
    } else
    {
        resetRenderPage();
        LoadMoreBtnEl.classList.toggle('opacity');
    }
    apiService.resetPage()

};

async function handleloadMore() {
    await apiService.getImg().then(renderGallary);
    scroll();
};


function resetRenderPage() {

    galleryEl.innerHTML = '';

};

function renderGallary(articles) {

    galleryEl.insertAdjacentHTML('beforeend', galleryTml(articles));

};

function scroll() {

    window.scrollTo({
        top: galleryEl.clientHeight,
        behavior: "smooth"
    });
}

// function onGalleryElClick(evt) {
//     evt.preventDefault();

//     apiService.getImg().then(data => {

//         console.log(data[0]);

//         if (evt.target.nodeName === 'IMG')
//         {
//             console.log(evt.target.src);
//         }
//         console.log(data[0]);

//         data.forEach((el, ind) => {


//             if (el.webformatURL.includes(evt.target.src))
//             {

//                 currentInd = ind;
//                 console.log(currentInd);
//             }
//         });
//     });

// };

// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `)

// instance.show()
