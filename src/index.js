import './sass/main.scss';
import handlabars from '../node_modules/handlebars';
import axios from '../node_modules/axios';
import _debounce from '../node_modules/lodash.debounce';
import galleryTml from './templates/galleryTml.hbs';
const BASE_URL = 'https://pixabay.com/api/';
const PIXABAY_KEY = '21694115-487a2c793b7208539d5182bab';
const galleryEl = document.querySelector('.gallery')

// console.log(galleryEl);

let perPage = 12;
let pageNum = 1;

const input = document.querySelector('.input');

input.addEventListener('input', _debounce(() => {

    let searhImg = input.value;

    getImg(searhImg);

    // getCountry(searhContry);

}, 500));

// function renderGallary(renderGrid) {

//     galleryTml(renderGrid);

// }

function getImg(imgName) {

    return axios.get(`https://pixabay.com/api/?key=${ PIXABAY_KEY }&q=${ imgName }&image_type=photo&page=${ pageNum }&per_page=${ perPage }&image_type=photo&orientation=horizontal&`)
        .then(function (response) {

            const imgObject = response.data.hits;

            const renderPage = galleryTml(imgObject);

            renderGallary(renderPage);

            console.log(imgObject);

        }).catch(error => {
            console.log(error);

        })
};
console.log()

function renderGallary(renderGrid) {

    galleryEl.innerHTML = renderGrid;

};

const handleloadMore = () => {
    return axios.get(`https://pixabay.com/api/?key=${ PIXABAY_KEY }&q=${ imgName }&image_type=photo&page=${ pageNum + 1 }&per_page=${ perPage + 12 }&image_type=photo&orientation=horizontal&`)
        .then(function (response) {

            const imgObject = response.data.hits;

            const renderPage = galleryTml(imgObject);

            renderGallary(renderPage);

            console.log(imgObject);

        }).catch(error => {
            console.log(error);

        })

}

