export default class Carousel {
    constructor() {
      this.rootElement = document.querySelector('.carousel_box');
      this.initElement(this.rootElement);
	    this.bindEvent();
    }

    initElement() {
   
      this.dom = {
        carouselitem : this.rootElement.querySelector('.carousel_item'),
        next : this.rootElement.querySelector('.carousel_control_next'),
        prev : this.rootElement.querySelector('.carousel_control_prev'),
        imgbox : this.rootElement.querySelector('.image_box')
      };

      this.template = {};
      
      this.dom.carouselitem.style.width = this.dom.carouselitem.offsetWidth + 'px';
      this.dom.carouselitem.style.height = this.dom.carouselitem.offsetHeight + 'px';
      this.dom.carouselitem.style.opacity = 1;

    }
    
    bindEvent() {
      this.dom.next.addEventListener('click', this.nextImg.bind(this));
      this.dom.prev.addEventListener('click', this.prevImg.bind(this));
    }

    nextImg() {
      this.dom.imgbox.src = 'http://via.placeholder.com/400x150/3498db/fff&text=2';
    }

    prevImg() {
      this.dom.imgbox.src = 'http://via.placeholder.com/400x150/3498db/fff&text=3';
    }
  }

  const carousel = new Carousel();
