import './sass/main.scss';
// import handlabars from '../node_modules/handlebars';
// import axios from '../node_modules/axios';
import _debounce from '../node_modules/lodash.debounce';
import galleryTml from './templates/galleryTml.hbs';
import ApiService from './js/apiService';
// const BASE_URL = 'https://pixabay.com/api/';
// const PIXABAY_KEY = '21694115-487a2c793b7208539d5182bab';
const galleryEl = document.querySelector('.gallery');
const LoadMoreBtnEl = document.querySelector('.LoadMoreBtn');
const input = document.querySelector('.input');
const apiService = new ApiService();

// let perPage = 12;
// let pageNum = 1;
// let searhImg = '';
// console.log(_debounce);

LoadMoreBtnEl.addEventListener('click', handleloadMore);
// input.addEventListener('input', _debounce(() => {

//     searhImg = input.value;

//     getImg(searhImg);

// }, 500),);
input.addEventListener('input', _debounce(getImg, 500));

// console.log(searhImg);

// function renderGallary(renderGrid) {

//     galleryTml(renderGrid);

// }

function getImg(evt) {
    evt.preventDefault();

    apiService.query = evt.target.value;

    // console.log(apiService.query)

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

function handleloadMore() {
    apiService.getImg().then(renderGallary);
};


function resetRenderPage() {

    galleryEl.innerHTML = '';

};

function renderGallary(articles) {

    galleryEl.insertAdjacentHTML('beforeend', galleryTml(articles));

};

// function renderLoadMore() {



// };

