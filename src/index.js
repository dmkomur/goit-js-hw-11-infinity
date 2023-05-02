import  Fetcher  from "./js/fetcherApi";
import makeMarkup from "./js/markupApi";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadBtn = document.querySelector('.load-more');
const pixaBayFetcher = new Fetcher();
const target = document.querySelector('#js-item');

formRef.addEventListener('submit', onFormSubmit);


const backdropGallery = new simpleLightbox('.gallery a');


const options = {
    root: null,
    rootMargin: '400px',
    threshold: 0
}
const callback = function(entry, observer) {
    if (entry[0].isIntersecting) {
        onBtnLoadClick();
}};
const observer = new IntersectionObserver(callback, options);


async function onFormSubmit(event) {
    event.preventDefault();
    clearMarkup();
    pixaBayFetcher.query = event.target.elements.searchQuery.value;
    const data = await pixaBayFetcher.getRequest();
    const fullString = makeMarkup(data);
    insertMarkup(fullString);
    if (pixaBayFetcher.page < pixaBayFetcher.totalPage) {
        pixaBayFetcher.page += 1;  
        backdropGallery.refresh();
        observer.observe(target);
    }
}
    



async function onBtnLoadClick() {
    const data = await pixaBayFetcher.getRequest();
    const fullString = makeMarkup(data);
    insertMarkup(fullString);
    if (pixaBayFetcher.page === pixaBayFetcher.totalPage) {
        Notify.info("We're sorry, but you've reached the end of search results.");
         observer.unobserve(target);   }
    if (pixaBayFetcher.page < pixaBayFetcher.totalPage) {
        pixaBayFetcher.page += 1;  
        backdropGallery.refresh();
    }

    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

function insertMarkup(fullMarkup) { 
        galleryRef.insertAdjacentHTML('beforeend', fullMarkup);
}

function clearMarkup() {
    pixaBayFetcher.page = 1;
    galleryRef.innerHTML = '';
}
