import {util} from '../util/util.js';
export default class mainHeader {
    constructor(){
        this.rootElement = document.querySelector('header');
    }
    init(){
        this.bindEvent();
    }
    async bindEvent(){
        let logoutBtn = this.rootElement.querySelector("#logout"); 
        logoutBtn.addEventListener("click", this.logoutEventHandler.bind(this));
    }

    async logoutEventHandler(){
        let response = await this.logout();
    
        if(response.status =="200"){
            document.location.href = "/";
        }else{
            //error page go
        }   
    }

    logout(){
        let fetchSetting = {
            method: 'GET', 
            headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
            body: JSON.stringify(), 
        };

        return fetch('/signin/logout', fetchSetting)
        .then(res => res.json())
        .then((response)=>{
            return response;
        });
    }
}

