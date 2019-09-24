const userinfoModel = require('../model/userinfoModel.js');
class signupService{
    /**
    * signupService 객체 생성.
    *
    * @constructor
    * @author: 
    * @this {signupService}
    * @param {} 
    */
    constructor(){
        this.userinfoModel = new userinfoModel();
    }

    /**
    * id가 존재하는지 확인
    *
    * @param {id} 확인할 id
    * @return {boolean} 쿼리 수행 결과
    */
    async idChecker(id){
        let result = await this.userinfoModel.getuserIdCnt(id);
        if(!result) return true;
        return false;
    }

    /**
    * id 사용자 추가
    *
    * @param {Object} userinfo 사용자정보 객체
    * @return {boolean} 쿼리 수행 결과
    */
   async insertUser(userinfo){
       // Object.values(userInfo) , object keys..
       let userinfoArr = [userinfo.user_id, userinfo.user_name,userinfo.password, userinfo.birth, userinfo.gender, userinfo.email, userinfo.phone]
        let result1 = await this.userinfoModel.insertuserInfo(userinfoArr); //not tags

        let taglist = userinfo.tags;
        if(!Array.isArray(taglist)){
            taglist = JSON.parse(taglist);
        }
        await this.userinfoModel.insertuserTags(userinfo.user_id, taglist); // tags

        if(!result1) return true;
        return false;
    }
}

module.exports ={
    signupService
}
