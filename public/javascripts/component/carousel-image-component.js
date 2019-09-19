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
			imgItemList : root.querySelector('.carousel_item_list'),
		};

		this.template = {
			ImageTemplate: `
				<div class="carousel_item" data-index="{index}"> 
					<a href="#">
						<img class="image_left_box" src="{imgsrc}">
					</a> 
				</div>
			`
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

	InitImage(imgArr) {
		//dotList
		
		let images = "";
		for (let i = 0; i < imgArr.length; i++) {
			let ImageTemplate = this.template.ImageTemplate;
			ImageTemplate = ImageTemplate.replace('{index}', `${i}`);
			ImageTemplate = ImageTemplate.replace('{imgsrc}', `${imgArr[i]}`);
			images += ImageTemplate;
		}
		
		this.dom.imgItemList.innerHTML = images;
		this.dom.images = this.dom.imgItemList.children;

		this.insertClone();
	}

	/**
	 * 케로셀 회전을 위한 앞뒤로 노드 추가
	 *
	 * @memberof carouselImage
	 */
	insertClone(){
		const firstItem = this.dom.imgItemList.children[0];
		const lastItem = this.dom.imgItemList.children[this.dom.imgItemList.children.length - 1];

		this.dom.imgItemList.insertBefore(lastItem.cloneNode(true), this.dom.imgItemList.firstChild);
		this.dom.imgItemList.appendChild(firstItem.cloneNode(true));
	}

	// functions 
	updateImg(imgSrc, offset, flag) {
		console.log("offset 1 ", offset);
		if(flag){
			this.moveWithoutAnimation(offset);
		}else{
			this.move(offset);
		}
	}

	move(offset) {
		let duration = 1000;
		let easing = 'ease-out';
		this.dom.imgItemList.style.transition = `transform ${duration}ms ${easing}`;
		this.dom.imgItemList.style.transform = `translateX(${offset}px)`;
	}

	moveWithoutAnimation(offset) {
		setTimeout(() => {
			this.dom.imgItemList.style.transition = 'none';
        	this.dom.imgItemList.style.transform = `translate3D(${offset}px, 0, 0)`;
		}, 1000);
	}
}
