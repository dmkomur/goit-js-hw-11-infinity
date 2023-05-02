import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

 export default class Fetcher {
    #BASE_URL = 'https://pixabay.com/api/';
    #KEY = '35940654-53ff2df5a392944f3c25f9a4b';
     constructor() {
         this.query = '';
         this.page = 1;
         this.per_page = 40;
         this.totalPage = 1;
     }
     async getRequest() { 
         const parametrs = {
             key: this.#KEY,
             q: this.query,
             page: this.page,
             per_page: this.per_page,
             image_type: 'photo',
             orientation: 'horizontal',
             safesearch: true,
        }
         const response = await axios.get(this.#BASE_URL, { params: parametrs });
         
         if (response.data.total === 0) { Notify.failure("Sorry, there are no images matching your search query. Please try again."); } 
         this.totalPage = Math.ceil(response.data.total / this.per_page);  
         
        return response.data.hits;
     };
}

