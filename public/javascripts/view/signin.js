import {util} from '../util/util.js';

let signin = {
    init(){
        this.target = document.querySelector("#signin_form");
        this.registerEvent();
    },
    async registerEvent(){
        let loginBtn = this.target.querySelector("#main_login");
        loginBtn.addEventListener("click", this.login.bind(this));

        let singupBtn = this.target.querySelector("#main_signup");
        //singupBtn.addEventListener("click", router.routeForm.bind(router,"signup_form")); 

    },
    async login(){
        console.log("login btn clicked");
        let id = document.querySelector("#user_id").value; 
        let pw = document.querySelector("#user_pw").value; 

        this.checkId(id);
        let loginResult = await this.checkAccount(id,pw);
        if(loginResult.data.is_logined){
            util.pageGo('/');
        }else{
            //로그인 가능 정보가 없음
        }
    },
    checkId(id){
        let numpattern = /^[a-z0-9][a-z0-9_\-]{4,9}$/;	// id
        if (!numpattern.test(id)) return false;      
        else return true; 
    },
    checkAccount(id,pw){
        // fetch login check
        let fetchSetting = {
            method: 'POST', 
            headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
            body: JSON.stringify({id:id, pw:pw}), 
        };

        return fetch('/signin/login', fetchSetting)
        .then(res => res.json())
        .then((response)=>{
            return response;
        });
    },
    getUserInfo(){
        // fetch login check
        let fetchSetting = {
            method: 'GET', 
            headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }
        };
        
        return fetch('/signin/get/username', fetchSetting)
        .then(res => res.json())
        .then((response)=>{
            //console.log('response : ',response)
            return response;
        });
    }
}
signin.init();