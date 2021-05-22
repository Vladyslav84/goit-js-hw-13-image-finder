import './sass/main.scss';
import _debounce from '../node_modules/lodash.debounce';
import galleryTml from './templates/galleryTml.hbs';
import ApiService from './js/apiService';

const galleryEl = document.querySelector('.gallery');
const LoadMoreBtnEl = document.querySelector('.LoadMoreBtn');
const input = document.querySelector('.input');
const apiService = new ApiService();

LoadMoreBtnEl.addEventListener('click', handleloadMore);
LoadMoreBtnEl.addEventListener('click', scroll);

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

function handleloadMore() {
    apiService.getImg().then(renderGallary);
    scroll(galleryEl);
};


function resetRenderPage() {

    galleryEl.innerHTML = '';

};

function renderGallary(articles) {

    galleryEl.insertAdjacentHTML('beforeend', galleryTml(articles));

};

function scroll() {
    window.scrollTo(0, galleryEl.clientHeight - 150)
    console.log(galleryEl.scrollHeight);
}
