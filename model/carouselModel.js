const dbConnection = require('../db/dbConnection.js');
const {carouselinfo} = require('../db/query/carouselinfo.js');

/**
 *
 *
 * @class userinfoModel
 */
module.exports = class carouselModel{
    /**
     *Creates an instance of carouselModel.
     * @constructor
     * @author: 
     * @this {carouselModel}
     * @param {}
     */
    constructor(){
        this.db = new dbConnection(); 
    }

    /**
     *
     *
     * @param {Object} imgInfoObj image info 
     * @returns {boolean} 성공 실패
     */
    
    async setCarouselImg(imgInfoObj){
        let inputArr = [imgInfoObj.dir, imgInfoObj.filename, imgInfoObj.extention, 'admin', null, imgInfoObj.size];
        try {
            await this.db.get(carouselinfo.INSERT_MAIN_CAROUSEL_IMG, inputArr);
            return true;
        } catch (error) {
            console.log("error ",error)
            return false;
        }  
    }

    async getFileId(dir){
        try {
            let [file_seq]=await this.db.get(carouselinfo.SELECT_FILE_ID, dir);
            return file_seq;
        } catch (error) {
            console.log("error ",error)
            return "";
        }  
    }

   
}