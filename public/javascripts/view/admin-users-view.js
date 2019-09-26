
export default class userList {
    constructor() {
      this.rootElement = document.querySelector('.user_list');
      
      this.initElement(this.rootElement);
      this.bindEvent();
      this.getMoreUsersHadnler();
    }

    initElement(root) {
      this.dom = {
        readmorebtn : root.querySelector(".readmore_btn"),
        tableBody : root.querySelector("tbody"),
      };
  
      this.template = {
        trItem: `
          <tr>
            <th scope="row">{idx}</th>
            <td class="user_id" value="{id}">{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td> <input type="checkbox" name="admin" value="{value}" {admin}> </td>
          </tr>
        `
      };
    }

    bindEvent() {
      // emitter event on 
      this.dom.tableBody.addEventListener("click", this.setUserAuthHandler.bind(this),true);
      this.dom.readmorebtn.addEventListener("click", this.getMoreUsersHadnler.bind(this));
    }

    async setUserAuthHandler(e){
      e.stopPropagation();
      
      let authtype = e.target.getAttribute("value");
      let userid = e.target.closest('tr').querySelector('.user_id');
      
      await this.setUserAuth(authtype , userid.getAttribute("value"));
    
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

    async getMoreUsersHadnler(){
      let pageid = this.dom.readmorebtn.getAttribute("value");
      let {data}= await this.getUsers(pageid);
      
      this.dom.readmorebtn.setAttribute("value",Number(pageid)+1);
      this.initCard(data.userlist);
    }

    getUsers(pageidx = 0) {
       
        let fetchSetting = {
            method: 'GET',
        };
        console.log("pageidx ", '/signin/users/'+pageidx)
        return fetch('/signin/users/'+pageidx, fetchSetting).then(res => res.json())
        .then((response)=>{
            console.log("response ", response);
            return response;
        });
    }
  
    initCard(userArr) {
      let trlist = "";
      userArr.forEach((user,idx)=>{
        let trTemplate = this.template.trItem;
        trTemplate = trTemplate.replace('{idx}', `${idx}`);
        trTemplate = trTemplate.replace( /{id}/gi, `${user.user_id}`);
        trTemplate = trTemplate.replace('{name}', `${user.user_name}`);
        trTemplate = trTemplate.replace('{email}', `${user.email}`);
        if(user.admin == 1){
          trTemplate = trTemplate.replace('{value}', `0`);
          trTemplate = trTemplate.replace('{admin}', `checked`);
        }else{
          trTemplate = trTemplate.replace('{value}', `1`);
          trTemplate = trTemplate.replace('{admin}', ``);
        }
        trlist += trTemplate;
      });
      this.dom.tableBody.insertAdjacentHTML('beforeend',trlist);
      this.dom.rows = this.dom.tableBody.children;
    }

  }
