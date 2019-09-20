
import ComponentImg from '../component/carousel-image-component.js';

export default class Carousel {
    constructor(viewModel) {
      // 여러개 되면 id 값을 받을 수 있을듯 
      this.rootElement = document.querySelector('.mini_carousel_box');
      this.initElement(this.rootElement);
      
      this.viewModel = viewModel;
      this.initView('.carousel_box');
      this.bindEvent();

      this.initCarousel(this.viewModel.getImgData());
    }

    initElement() {
      this.dom = {
        carouselitem : this.rootElement.querySelector('.carousel_item:nth-child(2)')
      };
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

      this.viewModel.on('CHANGE_IMG_IDX', (flag)=>{
        let src = this.viewModel.getImgInfo();
        let offset = this.viewModel.getOffset();
        let idx = this.viewModel.getIdx();
        //console.log('src- ' ,src ,' offset -', offset);
        this.updateImg(src,offset,flag);
      });
    }

    initCarousel(imgData){
      this.componentImg.InitImage(imgData);
    }

    updateImg(imgSrc,offset,flag) {
      this.componentImg.updateImg(imgSrc,offset,flag);
    }
  }