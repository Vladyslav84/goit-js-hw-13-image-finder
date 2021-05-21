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
// const photoCard = document.querySelector('.photo-card')
// const divEl = document.querySelector('.div')

// console.log(_debounce);

LoadMoreBtnEl.addEventListener('click', handleloadMore);
LoadMoreBtnEl.addEventListener('click', scroll);

input.addEventListener('input', _debounce(getImg, 500));

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

function scroll(elm) {
    window.scrollTo({
    top: galleryEl.scrollHeight,
    behavior: 'smooth',
});
}
