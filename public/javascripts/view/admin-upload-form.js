
export default class CarouselForm {
    constructor() {
      this.rootElement = document.querySelector('#main_carousel_form');
      this.bindEvent();
    }

    bindEvent() {
      // emitter event on 
      this.rootElement.querySelector("#upload").addEventListener("click", this.insertCarouselData.bind(this));
    }

    insertCarouselData() {
        let formData = new FormData(this.rootElement);
        console.log(formData);
        let fetchSetting = {
            method: 'POST',
            body: formData
        };
        
        fetch('/carousel/upload/mini', fetchSetting).then(res => res.json())
        .then((response)=>{
            console.log("response ", response);
            return response;
        });
    }

  }
