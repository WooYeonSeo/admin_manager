import cardComponent from '../component/card-component.js';
import DotComponent from '../component/dots-component.js';
import carouselImage from '../component/carousel-image-component.js';

export default class CardCarousel {
    constructor(viewModel) {
      // 여러개 되면 id 값을 받을 수 있을듯 
      this.rootElement = document.querySelector('.card_box');
      this.viewModel = viewModel;
      this.cardComponents = []; //여기맞나
      this.DotComponents = [];
      
      this.initCardView('.card_box', this.viewModel.getCardData(), this.viewModel.getCardDotData());
      //this.initCarouselView('.main_carousel_box');
      this.initCarousel(this.viewModel.getCardDotData());

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
      //load card components 
      for (const card of cardData) {
        let newcard = new cardComponent(rootSeletor);
        this.cardComponents.push(newcard); 
        newcard.initCard(card); 

        let dots = new DotComponent("#"+newcard.dom.card.getAttribute("id"));
        this.DotComponents.push(dots);
        //console.log("dotData ", dotData);
        //console.log("dotData[card.title] ", dotData[card.title]);
        dots.initDot(dotData[card.title]);
      } 
    }

    /* initCarouselView(rootSeletor){
      this.carouselComponent = new carouselImage(rootSeletor);
    } */

    /* initCarousel(imgData){
      this.carouselComponent.InitImage(imgData);
    } */
    
    bindEvent() {
      // emitter event on 
      for (const card of this.cardComponents) {
        card.on('CHANGE_IMG_FIRST', ()=>{
          this.viewModel.changeImgIndex(1);
        });
      }
    }

    scaleUpCard(imgSrc,offset,flag) {
      //this.cardComponent.updateImg(imgSrc,offset,flag);
    }
  }