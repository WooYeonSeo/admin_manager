import { imgData } from '../model/image-data.js';
import { cardData } from '../model/card-data.js';
import ImageModel from '../model/image-model.js';
import CardModel from '../model/card-model.js';
import CarouselViewModel from './carousel-view-model.js';
import CardCarouselViewModel from './card-carousel-view-model.js';
import Carousel from './carousel-view.js';
import CardCarousel from './card-carousel.js';
import mainHeader from './mainHeader.js';

class LoadViewMain {
	constructor() {
		// mini carousel
		this.model = new ImageModel(imgData);
		this.viewModel = new CarouselViewModel(this.model);
		this.carouselView = new Carousel(this.viewModel);

		// card carousel
		this.cardModel = new CardModel(cardData);
		this.cardCarouselViewModel = new CardCarouselViewModel(this.cardModel);
		this.cardCarouselView = new CardCarousel(this.cardCarouselViewModel);

		// header 
		this.mainHeader = new mainHeader();
		this.mainHeader.init();
	}
}

let test =new LoadViewMain();