
import ComponentImg from '../component/carousel-image-component.js';

export default class Carousel {
    constructor(viewModel) {
      // 여러개 되면 id 값을 받을 수 있을듯 
      this.rootElement = document.querySelector('.carousel_box');
      this.initElement(this.rootElement);
      
      this.viewModel = viewModel;
      this.initView('.carousel_box');
      this.bindEvent();
    }

    initElement() {
      this.dom = {
        carouselitem : this.rootElement.querySelector('.carousel_item'),
      };

      //this.dom.carouselitem.style.width = this.dom.carouselitem.offsetWidth + 'px';
      //this.dom.carouselitem.style.height = this.dom.carouselitem.offsetHeight + 'px';
      this.dom.carouselitem.style.opacity = 1;
    }

    initView(rootSeletor) {
      this.componentImg = new ComponentImg(rootSeletor);
    }
    
    bindEvent() {

      this.componentImg.on('CHANGE_IMG_PREV', ()=>{
        this.viewModel.changeImgIndex(-1);
      });

      this.componentImg.on('CHANGE_IMG_NEXT', ()=>{
        this.viewModel.changeImgIndex(1);
      });

      this.viewModel.on('CHANGE_IMG_IDX', ()=>{
        let src = this.viewModel.getImgInfo();
        this.updateImg(src);
      });
    }

    updateImg(imgSrc) {
      this.componentImg.updateImg(imgSrc);
    }
  }