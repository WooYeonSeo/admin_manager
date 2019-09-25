import {util} from '../util/util.js';
export default class mainHeader {
    constructor(){
        this.rootElement = document.querySelector('header');
    }
    init(){
        this.bindEvent();
    }
    async bindEvent(){
        let logoutBtn = this.target.querySelector("#logout"); 
        logoutBtn.addEventListener("click", this.logoutEventHandler);
    }

    logoutEventHandler(){
        console.log("logout");
        util.pageGo('/signin/logout');
    }
}

