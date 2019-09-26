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
			`,
			ItemTemplate: `
                <div class="carousel_item" data-index="{index}"> 
                    <a href="#">
                        <img class="image_left_box" src="{imgsrc}">
                    </a> 
                    <div class="carousel_content_box">
                        <p class="tags"> {tags} </p>
                        <p class="slide_title"> {title} </p>
                        <p class="slide_content"> {sub_title} </p>
                        <p class="slide_link"> {link} </p>
                    </div>
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

	/**
	 * 이미지를 이미지 템플릿에 바인딩해서 케로셀 목록에 추가
	 *
	 * @param {*} imgArr
	 * @memberof carouselImage
	 */
	InitImage(imgArr) {
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
	 * 카드의 아이템 정보를 템플릿에 바인딩해서 케로셀 목록에 추가.
	 *
	 * @param {Array} itemArr
	 * @memberof carouselImage
	 */
	InitItem(itemArr) {
		let items = "";
		for (let i = 0; i < imgArr.length; i++) {
			let ItemTemplate = this.template.ItemTemplate;
			ItemTemplate = ItemTemplate.replace('{index}', `${i}`);
			ItemTemplate = ItemTemplate.replace('{imgsrc}', `${itemArr[i].imgsrc}`);
			ItemTemplate = ItemTemplate.replace('{tags}', `${itemArr[i].tags}`);
			ItemTemplate = ItemTemplate.replace('{slide_title}', `${itemArr[i].title}`);
			ItemTemplate = ItemTemplate.replace('{slide_content}', `${itemArr[i].subtitle}`);
			ItemTemplate = ItemTemplate.replace('{slide_link}', `${itemArr[i].slide_link}`);

			items += ItemTemplate;
		}
		
		this.dom.imgItemList.innerHTML = items;
		this.dom.items = this.dom.imgItemList.children;

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
		if(flag){
			this.moveWithoutAnimation(offset);
		}else{
			this.move(offset);
		}
	}

	/**
	 * 케로셀 이동
	 *
	 * @param {*} offset
	 * @memberof carouselImage
	 */
	move(offset) {
		let duration = 1000;
		let easing = 'ease-out';
		this.dom.imgItemList.style.transition = `transform ${duration}ms ${easing}`;
		this.dom.imgItemList.style.transform = `translateX(${offset}px)`;
	}

	/**
	 * 마지막 첫번째 케로셀의 애니메이션 없이 이동 함수
	 *
	 * @param {*} offset
	 * @memberof carouselImage
	 */
	moveWithoutAnimation(offset) {
		setTimeout(() => {
			this.dom.imgItemList.style.transition = 'none';
        	this.dom.imgItemList.style.transform = `translate3D(${offset}px, 0, 0)`;
		}, 1000);
	}
}
