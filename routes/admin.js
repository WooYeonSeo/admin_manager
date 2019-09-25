var express = require('express');
var router = express.Router();
const multer = require('multer');
const {uploadCarouselService} = require('../service/uploadCarouselService.js');
let carouselService = new uploadCarouselService();
/* /admin/main */
router.get('/main', (req, res)=>{
  res.render('../public/views/admin/main.ejs');
});



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

router.post('/upload/mini', upload.array('slide_photo', 1), async (req, res, next) => {
   
    let result = {
        status : '200',
        message : '요청 성공',
        data : {}
    }; 
    try {
        const files = req.files;  
        if (Array.isArray(files)) {
            result.data['filename'] = files[0].originalname;
            result.data['dir'] = '/uploads/'+files[0].filename;
            result.data['size'] =files[0].size;
            result.data['extention'] = files[0].mimetype;
        }
        // upload  images 
        console.log("result.data ", result.data);
        if(!await carouselService.uploadCarouselCard(result.data)){
            result.status = "400";
            result.message = "요청실패";
        }
        //let {file_seq} = await carouselService.uploadCarouselContent(result.data.dir);
        console.log("fileid" ,file_seq);
        //upload contents
        console.log(req.body.description);
        
        // return result 
        res.json(result);
        
    } catch (err) {
        console.dir(err.stack);
    }
});
module.exports = router;