const userinfoModel = require('../model/userinfoModel.js');
class signinService{

    /**
     * Creates an instance of signinService.
     * @constructor
     * @memberof signinService
     * @this {signinService}
     */
    constructor(){
        this.userinfoModel = new userinfoModel();
    }

    /**
     * 계정 확인
     * 
     * @param {String} id 사용자 id
     * @param {String} pw 사용자 pw
     * @returns {boolean} id 확인 결과 
     * @memberof signinService
     */
    async checkUser(id,pw){
        console.log("checkUser service ",id);
        return await this.userinfoModel.checkUser(id,pw);
    }

    
    /**
     *
     *
     * @param {String} id 사용자id
     * @returns {Object} 사용자 정보
     * @memberof signinService
     */
    async getUserInfo(id){     
        return await this.userinfoModel.getuserInfo(id);
    }

    
    /**
     *
     *
     * @param {*} req
     * @param {*} res
     * @memberof signinService
     */
    checkLoginSession(req,res){     
        console.log("checkloginSession");
    }


    /**
     *
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof signinService
     */
    checkisLogined(req,res,next){
        if(req.cookies.sid == undefined) {
            console.log("session id is not exist");
        }else{
            if(req.session.is_logined == undefined) req.session.is_logined = false;
            else if(req.session.is_logined){
                console.log("why here1?");
            }else{
                console.log("testtesttest");
                res.status(403).send();
            }
        }
        next();
    }

    /**
     * 사용자 정보 묶음으로 가지고오는 함수
     *
     * @param {*} offset 가지고 오기 시작할 데이터 갯수 
     * @param {*} limit 가지고 올 데이터 갯수
     * @returns 사용자 정보 객체로 반환
     * @memberof signinService
     */
    async getUsers(offset,limit){
        let userArr  = await this.userinfoModel.getuserList(offset,limit);
        return userArr;
    }

    /**
     * 권한 수정 요청
     *
     * @param {*} userid 사용자 id
     * @param {*} type 권한 타입
     * @returns 성공 여부
     * @memberof signinService
     */
    async updateAuth(userid,type){
        return this.userinfoModel.setuserAuth(userid,Number(type));
    }
}

module.exports ={
    signinService
}
