var express = require('express');
var router = express.Router();

const {CarouselController} = require('./controller/carouselController.js');
const {CarouselService} = require('../service/CarouselService.js');
let carouselService = new CarouselService();
let carousel = new CarouselController(carouselService);

/* /admin/main */
router.get('/main', (req, res)=>{
    res.render('../public/views/admin/main.ejs');
  });

router.get('/carousel/uploadform', (req, res)=>{
  res.render('../public/views/admin/admin-carousel-upload.ejs');
});

module.exports = router;