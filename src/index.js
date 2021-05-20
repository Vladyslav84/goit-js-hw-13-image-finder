import './sass/main.scss';
import handlabars from '../node_modules/handlebars';
import axios from '../node_modules/axios';
import _debounce from '../node_modules/lodash.debounce';
import galleryTml from './templates/galleryTml.hbs';
const BASE_URL = 'https://pixabay.com/api/';
const PIXABAY_KEY = '21694115-487a2c793b7208539d5182bab';
const galleryEl = document.querySelector('.gallery');
const LoadMoreBtnEl = document.querySelector('.LoadMoreBtn');
const input = document.querySelector('.input');

let perPage = 12;
let pageNum = 1;
let searhImg = '';
console.log(axios);

LoadMoreBtnEl.addEventListener('click', handleloadMore);
input.addEventListener('input', _debounce(() => {

    searhImg = input.value;

    getImg(searhImg);

}, 500),);

// console.log(searhImg);

// function renderGallary(renderGrid) {

//     galleryTml(renderGrid);

// }

function getImg() {
    
    return axios.get(`${BASE_URL}?key=${ PIXABAY_KEY }&q=${searhImg}&image_type=photo&page=${ pageNum }&per_page=${ perPage }&image_type=photo&orientation=horizontal&`)
        .then(function (response) {

            const imgObject = response.data.hits;

            const renderPage = galleryTml(imgObject);

            renderGallary(renderPage);

             resetRenderPage();

            LoadMoreBtnEl.classList.toggle('opacity');

        }).catch(error => {
            console.log(error);

        })
};
function handleloadMore (imgName){
    console.log(imgName);
    perPage += 12;
    pageNum += 1;

    return axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${imgName}&image_type=photo&page=${pageNum}&per_page=${perPage}&image_type=photo&orientation=horizontal&`)
        .then(function (response) {
 
            const imgObject = response.data.hits;

            const renderPage = galleryTml(imgObject);

            renderLoadMore(renderPage);

            console.log(imgObject);

        }).catch(error => {
            console.log(error);
            
        })
};

console.log()

function resetRenderPage() {

      if (!input.value) {
        galleryEl.innerHTML = '';
    };
};

function renderGallary(renderGrid) {

    galleryEl.innerHTML = renderGrid;

};

function renderLoadMore(renderGrid) {

    galleryEl.insertAdjacentHTML('beforeend', renderGrid);

};

