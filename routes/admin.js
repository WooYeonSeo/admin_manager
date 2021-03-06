var express = require('express');
var router = express.Router();

const {AuthController} = require('./controller/authController.js');
const {signinService} = require('../service/signinService.js');
let authService = new signinService();
let authController = new AuthController(authService);

router.use(authController.checkAdminAuthRouter)
/* /admin/main */
router.get('/main', (req, res)=>{
    res.render('../public/views/admin/main.ejs');
  });

router.get('/carousel/uploadform', (req, res)=>{
  res.render('../public/views/admin/admin-carousel-upload.ejs');
});

router.get('/carousel/list',  (req, res)=>{
  res.render('../public/views/admin/admin-carousel-list.ejs');
})

module.exports = router;