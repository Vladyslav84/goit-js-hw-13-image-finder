import axios from '../../node_modules/axios';
// import galleryTml from '../templates/galleryTml.hbs';
export default class ApiService {
    constructor() {
        this.imgName = '';
        this.pageNum = 1;
        this.perPage = 12;
        this.PIXABAY_KEY = '21694115-487a2c793b7208539d5182bab';
    }
    getImg() {
        return axios.get(`https://pixabay.com/api/?key=${ this.PIXABAY_KEY }&q=${ this.imgName }&image_type=photo&page=${ this.pageNum }&per_page=${ this.perPage }&image_type=photo&orientation=horizontal&`)
            .then(function (response) {

                return response.data.hits;

                // const renderPage = galleryTml(imgObject);

                // renderLoadMore(renderPage);
            })
            .then(data => {
                this.pageNum += 1;
                return data;
            })
            .catch(error => {
                console.log(error);

            })
    }
    resetPage() {
        this.pageNum = 1;
      }
    get query() {
        return this.imgName;
    };
    set query(newImgName) {
        this.imgName = newImgName;
    }
};