import AbstractView from '../component/abstract-view.js';

export default class carouselImage extends AbstractView {
	constructor(rootSeletor) {
		super(rootSeletor);
	}
	// implemented function
	initElement(rootEl) {
		this.dom = {
			imgContainer: rootEl.querySelector('.carousel_item'),
			imgLink: rootEl.querySelector('.carousel_item a'),
			imgItem: rootEl.querySelector('.carousel_item .image_box'),
		};
	}

	bindEvent(){

	}
	// functions 
	updateImg(imgSrc) {
		imgSrc = 'http://via.placeholder.com/400x150/3498db/fff&text=6';
		this.dom.imgItem.setAttribute('src', imgSrc);
	}
	
}
