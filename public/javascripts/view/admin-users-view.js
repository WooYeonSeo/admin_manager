
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
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td> <input type="checkbox" name="admin" value="Y" {admin}> </td>
          </tr>
        `
      };
    }

    bindEvent() {
      // emitter event on 
      //this.dom.tableBody.addEventListener("click", this.getMoreUsers.bind(this));
      this.dom.readmorebtn.addEventListener("click", this.getMoreUsersHadnler.bind(this));
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
        trTemplate = trTemplate.replace('{id}', `${user.user_id}`);
        trTemplate = trTemplate.replace('{name}', `${user.user_name}`);
        trTemplate = trTemplate.replace('{email}', `${user.email}`);
        if(user.admin == 1){
          trTemplate = trTemplate.replace('{admin}', `checked`);
        }else{
          trTemplate = trTemplate.replace('{admin}', ``);
        }
        trlist += trTemplate;
      });
      this.dom.tableBody.insertAdjacentHTML('beforeend',trlist);
      this.dom.rows = this.dom.tableBody.children;
    }

  }
