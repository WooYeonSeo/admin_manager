const carouselModel = require('../model/carouselModel.js');
class CarouselService{
    /**
    * signupService 객체 생성.
    *
    * @constructor
    * @author: 
    * @this {signupService}
    * @param {} 
    */
    constructor(){
        this.carouselModel = new carouselModel();
    }

    /**
    * 케로셀 이미지 등록 
    *
    * @param {id} 확인할 id
    * @return {boolean} 쿼리 수행 결과
    */
    async uploadCarouselCard(imginfoObj){
        return await this.carouselModel.setCarouselImg(imginfoObj);
    }

    /**
     * image id 가지고오기
     *
     * @param {String} dir 디렉토리 주소
     * @returns {Object} file_seq : value
     * @memberof uploadCarouselService
     */
    async getFileId(dir){
        return await this.carouselModel.getFileId(dir);
    }

    /**
     * 케로셀 컨텐츠를 등록
     *
     * @param {Object} carouselContent
     * @returns
     * @memberof uploadCarouselService
     */
    async uploadCarouselContent(carouselContent){
        return await this.carouselModel.uploadCarouselContent(carouselContent);
    }

    async getCarouselContents(){
        let carouselArr  = await this.carouselModel.getCarouselContents();
        return carouselArr;
    }
}

module.exports ={
    CarouselService
}
