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
const searchForm = document.querySelector('.search-form')
const divEl = document.querySelector('div');

LoadMoreBtnEl.addEventListener('click', handleloadMore);
galleryEl.addEventListener('click', onGalleryElClick);
input.addEventListener('input', resetPage);
searchForm.addEventListener('submit', getImg)

function getImg(evt) {
    evt.preventDefault();
    const form = evt.target;
    apiService.query = form.elements.query.value;

    if (apiService.query)
    {
        console.log('ff');
        apiService.getImg().then(renderGallary);

        // LoadMoreBtnEl.classList.toggle('opacity');
    } else
    {
        // LoadMoreBtnEl.classList.toggle('opacity');
    }
    apiService.resetPage()

};

async function handleloadMore() {
    await apiService.getImg().then(renderGallary);
    scroll();
};
function resetPage() {

    if (input.value === '')
    {
        resetRenderPage();
        // LoadMoreBtnEl.classList.toggle('opacity');
    }
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

function onGalleryElClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName === 'IMG')
    {
        const instance = basicLightbox.create(` <img src=${ evt.target.getAttribute('data-source') } >`).show();
    }
};

const onEntry = entries => {
    entries.forEach(entry => {
        if (console.log(entry.isIntersecting))
        {
            console.log('gg');

            // newApiService.fetchArticles().then(onMakeGallery).catch(onFetchError);
            apiService.getImg().then(renderGallary);

            // handleloadMore();
        }
    });
};
// console.log(onEntry);
const options = {
    rootMargin: '300px',
    // threshold: 0.1,
};

let observer = new IntersectionObserver(onEntry, options);

observer.observe(divEl);

apiService.getImg().then(renderGallary);