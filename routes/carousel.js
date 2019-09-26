var express = require('express');
var router = express.Router();
const multer = require('multer');
const {CarouselController} = require('./controller/carouselController.js');
const {CarouselService} = require('../service/CarouselService.js');
let carouselService = new CarouselService();
let carousel = new CarouselController(carouselService);


const storage = multer.diskStorage({
  destination(req, file, callback) {
      callback(null, 'uploads'); // 기본 업로드  env에 빼자
  },

  filename(req, file, callback) {
      let savedName = "";
      let array = file.originalname.split('.');
      console.log(array)
      savedName = Date.now().toString()+"."+array[1];
      callback(null, savedName);
  }
});

const upload = multer({
  storage,
  limits: {
      files: 10,
      fileSize: 1024 * 1024 * 1024
  }
});

// /carousel/get/
/* GET users listing. */
router.get('/', async (req, res, next)=>{
  let result = {
    status : '200',
    message : '요청 성공',
    data : {}
  }; 

  let carouselArr = await carouselService.getCarouselContents();

  result.data = carouselArr;
  res.json(result);
});

router.post('/upload/mini', upload.array('slide_photo', 1), async (req, res, next) => {
  let result = {
      status : '200',
      message : '요청 성공',
      data : {}
  }; 
  let idx = await carousel.uploadImage(req.files);
  if(!await carousel.uploadContent(req.body,idx)){
      result.status = '400'
      result.message = '등록 실패'
  }
  res.json(result);
});
module.exports = router;
