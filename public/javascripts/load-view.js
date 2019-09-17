import { imgData } from './model/image-data.js';
import ImageModel from './model/image-model.js';
import Carousel from './view/carousel-view.js';

class LoadView {
	constructor() {
		this.model = new ImageModel(imgData);
		this.carouselView = new Carousel(this.model);
	}
}

new LoadView();