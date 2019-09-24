const dbConnection = require('../db/dbConnection.js');
const {userinfo} = require('../db/query/userinfo.js');

/**
 *
 *
 * @class userinfoModel
 */
module.exports = class userinfoModel{
    /**
     *Creates an instance of userinfoModel.
     * @constructor
     * @author: 
     * @this {userinfoModel}
     * @param {}
     */
    constructor(){
        this.db = new dbConnection(); 
    }

    /**
     *
     *
     * @param {String} id 사용자 id
     * @returns {number} rows.cnt 쿼리에서 조회된 id 갯수
     */
    async getuserIdCnt(id){
        let [rows] = await this.db.get(userinfo.SELECT_USER_ID_CNT,[id]);
        return rows.cnt;
    }

    /**
     *
     *
     * @param {String} id 사용자 id
     * @param {String} pw 사용자 pw
     * @returns {number} rows.cnt 사용자 정보 갯수
     */
    async checkUser(id,pw){
        console.log("checkUser model",userinfo.SELECT_USER_ACCOUNT);
        let [rows] = await this.db.get(userinfo.SELECT_USER_ACCOUNT,[id,pw]);
        return rows.cnt;
    }

    /**
     * 사용자정보 조회
     *
     * @param {String} id 사용자 id
     * @returns {Object} 사용자 정보 객체
     */
    async getuserInfo(id){
        let [rows] = await this.db.get(userinfo.SELECT_USER_INFO,[id]);
        return rows;
    }

    /**
     * 디비에 사용자 정보 추가
     *
     * @param {Object} info 사용자정보
     * @returns {Object} 쿼리 수행 결과
     */
    async insertuserInfo(info){
        await this.db.get(userinfo.INSERT_USER_INFO,info);
        
        return true;
    }
    /**
     * 디비에 사용자 태그 추가
     *
     * @param {String} id 사용자 id
     * @param {Array} tags 사용자 tag목록 
     * @returns {boolean} 쿼리 수행 결과
     */
    async insertuserTags(id,tags){
       
       
        for (const tag of tags) {
            console.log("user insert tags : ", id, ' - ', tag)
            await this.db.get(userinfo.INSERT_USER_TAGS, [id,tag]).catch((e)=>{
                console.log("errer??" , e)
            });
        }
        return true;
    }
}