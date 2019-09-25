var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  let result = {
      status : 500,
      message : '요청 성공',
      data : { 
              is_logined : false,
              name : "",
          }
  };
  console.log("index page1",req.session.passport  !== undefined);
  console.log("index page2",req.session.passport );
  if( req.session !== undefined && req.session.passport !== undefined ){
    if(req.session.passport.user!==undefined){
      result.status = 200;
      result.data.is_logined = true;
      result.data.name = req.session.passport.user.user_name;
    }
  }
  console.log("index page",req.session);
  res.render('../public/views/index.ejs' ,result);
  //res.send("data");
});

router.get('/loginpage', function(req, res, next) {
  console.log("test in");
  res.render('../public/views/signin.ejs', { title: 'login' });
});


module.exports = router;
