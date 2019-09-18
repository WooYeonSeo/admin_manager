import { imgData } from './model/image-data.js';
import ImageModel from './model/image-model.js';
import Carousel from './view/carousel-view.js';
import CarouselViewModel from './view/carousel-view-model.js';


class LoadView {
	constructor() {
		this.model = new ImageModel(imgData);
		this.viewModel = new CarouselViewModel(this.model);
		this.carouselView = new Carousel(this.viewModel);

		//this.cviewModel = new MainCarouselViewModel(this.model);
		//this.mainSlideviewModel = new MainCarouselViewModel(this.model);
		//this.carouselView = new MainCarousel(this.viewModel, this.mainSlideviewModel);
	}
}

let test =new LoadView();
console.log('test1')