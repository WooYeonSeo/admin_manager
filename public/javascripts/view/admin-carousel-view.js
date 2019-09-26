
export default class CarouselList {
    constructor() {
      this.rootElement = document.querySelector('#main_carousel_list');
      
      this.initElement(this.rootElement );
      this.bindEvent();
      this.getContents();
    }

    initElement(root) {
      this.dom = {
        cardBody : root,
      };
  
      this.template = {
        cardItem: `
        <div class="card" class="card_{file_seq}" >
          <img src="{dir}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <p class="card-text">{head}</p>
            <p class="card-text">{body}</p>
            <a href="{link}" class="btn btn-primary">LINK</a>
          </div>
        </div>
        `
      };
    }

    bindEvent() {
      // emitter event on 
      //this.dom.tableBody.addEventListener("click", this.setUserAuthHandler.bind(this),true);
      //this.dom.readmorebtn.addEventListener("click", this.getContentsHadnler.bind(this));
    }

    async getContents(){
      let {data}= await this.getCardInfo();
    
      this.initCard(data);
    }
 
    async setUserAuth(authtype,userid){
      console.log(authtype)
      let fetchSetting = {
        method: 'POST', 
        headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
        body: JSON.stringify({type:authtype, userid:userid}), 
     };
  
      return fetch('/signin/update/type', fetchSetting).then(res => res.json())
      .then((response)=>{
          console.log("response ", response);
          return response;
      });
    }

   
    getCardInfo() {
       
        let fetchSetting = {
            method: 'GET',
        };
        console.log("pageidx ", '/carousel')
        return fetch('/carousel', fetchSetting).then(res => res.json())
        .then((response)=>{
            console.log("response ", response);
            return response;
        });
    }
  
    initCard(cardArr) {
      let calist = "";
      cardArr.forEach((card)=>{
        let cardTemplate = this.template.cardItem;
        cardTemplate = cardTemplate.replace('{file_seq}', `${card.file_seq}`);
        cardTemplate = cardTemplate.replace( /{dir}/gi, `${card.dir}`);
        cardTemplate = cardTemplate.replace('{title}', `${card.title}`);
        cardTemplate = cardTemplate.replace('{head}', `${card.head}`);
        cardTemplate = cardTemplate.replace('{body}', `${card.body}`);
        cardTemplate = cardTemplate.replace('{link}', `${card.link}`);
        
        calist += cardTemplate;
      });
      console.log("calist ", calist)
      this.dom.cardBody.innerHTML = calist;
      this.dom.cards = this.dom.cardBody.children;
    }
  }
