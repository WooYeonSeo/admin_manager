import cardComponent from '../component/card-component.js';
import cardComponent2 from '../component/card-component2.js';
import DotComponent from '../component/dots-component.js';
import carouselImage from '../component/carousel-image-component.js';

export default class CardCarousel {
    constructor(viewModel) {
      this.rootElement = document.querySelector('.card_box');
      this.viewModel = viewModel;
      
      this.initCardView('.card_box', this.viewModel.getCardData(), this.viewModel.getCardDotData());
      //this.initCardView2('.card_box', this.viewModel.getCardData(), this.viewModel.getCardDotData());
      this.initCarouselView('.main_carousel_box');
      this.initCarousel(this.viewModel.getImgInfo());

      this.bindEvent();
      //this.initCards(this.viewModel.getCardData());
    }
    /**
     * set cards component 
     *
     * @param {*} rootSeletor
     * @param {*} CardData
     * @memberof CardCarousel
     */

    initCardView(rootSeletor, cardData, dotData ) {
      this.cardComponent  = new cardComponent2(rootSeletor);
      this.cardComponent.initCard(cardData); 

      this.DotComponent = new DotComponent(rootSeletor);
      this.DotComponent.initDot(dotData);
      
    }


    initCarouselView(rootSeletor){
      this.carouselComponent = new carouselImage(rootSeletor);
    }

    initCarousel(imgData){
      this.carouselComponent.InitImage(imgData);
    }
    
    bindEvent() {
      // emitter event on 
      this.cardComponent.on('CHANGE_IMG_FIRST', (e)=>{
        e.stopPropagation();
        let cardid = e.target.parentElement.id;
        cardid = Number(cardid.replace('card_', ''));

        this.viewModel.changeImgIndexMany(cardid);
      });

      this.carouselComponent.on('CHANGE_IMG_PREV', ()=>{
        this.viewModel.changeImgIndex(-1);
      });

      this.carouselComponent.on('CHANGE_IMG_NEXT', ()=>{
        this.viewModel.changeImgIndex(1);
      });

      this.viewModel.on('CHANGE_IMG_IDX', (flag)=>{
        let src = this.viewModel.getImgInfo();
        let offset = this.viewModel.getOffset();
       
        this.updateImg(src,offset,flag);
        this.updateDot(this.viewModel.getImgIndex());
      });

    }

    updateImg(imgSrc,offset,flag) {
      this.carouselComponent.updateImg(imgSrc,offset,flag);
    }

    updateDot(idx){
      this.DotComponent.updateDot(idx);
    }

  }