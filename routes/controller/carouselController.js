
const {util} = require('../../modules/util.js');
class CarouselController {
    constructor(carouselService){
        this.carouselService = carouselService;
    }

    /**
     * 케로셀 이미지를 만들어서 데이터 요청 
     *
     * @param {*} files
     * @returns
     * @memberof carouselController
     */
    async uploadImage(files){
        let data = {} ; 
        console.log("files ", files);
        if (Array.isArray(files)) {
            data['filename'] = files[0].originalname;
            data['dir'] = '/uploads/'+files[0].filename;
            data['size'] =files[0].size;
            data['extention'] = files[0].mimetype;
        }
        // upload  images 
        console.log("data ", data);
        if(!await this.carouselService.uploadCarouselCard(data)){
            return '';
        }
        return data.dir;
    }

    /**
     * 케로셀 데이터를 Obecjt로 만들어서 서비스에 등록 작업 요청
     *
     * @param {*} bodyData carousel input form 데이터
     * @param {*} idx
     * @returns
     * @memberof carouselController
     */
    async uploadContent(bodyData,idx){
        // upload contents 
        let {file_seq} = await this.carouselService.getFileId(idx);
        let carouselContents = {
            "title" : bodyData.title,
            "subtitle" : util.enterParser(bodyData.description),
            "group_id": bodyData.group,
            "body": util.enterParser(bodyData.description),
            "head": bodyData.head,
            "file_seq" :file_seq,
            "link": bodyData.link
        }
        
        console.log("textdata ",carouselContents);
        if(await this.carouselService.uploadCarouselContent(carouselContents)){
            return true;
        }
       
        return false;
    }

}

module.exports ={CarouselController}