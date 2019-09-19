import { imgData } from './model/image-data.js';
import { cardData } from './model/card-data.js';
import ImageModel from './model/image-model.js';
import CardModel from './model/card-model.js';
import CarouselViewModel from './view/carousel-view-model.js';
import CardCarouselViewModel from './view/card-carousel-view-model.js';
import Carousel from './view/carousel-view.js';
import CardCarousel from './view/card-carousel.js';

class LoadView {
	constructor() {
		// mini carousel
		this.model = new ImageModel(imgData);
		this.viewModel = new CarouselViewModel(this.model);
		this.carouselView = new Carousel(this.viewModel);

		// card carousel
		this.cardModel = new CardModel(cardData);
		this.cardCarouselViewModel = new CardCarouselViewModel(this.cardModel);
		this.cardCarouselView = new CardCarousel(this.cardCarouselViewModel);
	
	}
}

let test =new LoadView();
console.log('test1')