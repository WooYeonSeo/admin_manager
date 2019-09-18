import AbstractView from '../component/abstract-view.js';

export default class carouselImage extends AbstractView {
	constructor(rootSeletor) {
		super(rootSeletor);
	}
	// implemented function
	// root : carousel box
	initElement(root) {
		this.dom = {
			prev : root.querySelector('.carousel_control_prev'),
			next : root.querySelector('.carousel_control_next'),
			imgItem: root.querySelector('.carousel_item .image_box'),
		};
	}

	bindEvent(){
		this.dom.prev.addEventListener('click', () => {
			this.emit('CHANGE_IMG_PREV');
		});

		this.dom.next.addEventListener('click', () => {
			this.emit('CHANGE_IMG_NEXT');
		});
	}
	// functions 
	updateImg(imgSrc) {
		this.dom.imgItem.setAttribute('src', imgSrc);
	}	
}
