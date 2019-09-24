var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  let result = {
      status : 200,
      message : '요청 성공',
      data : { 
              is_logined : false,
              name : "",
          }
  };

  if( req.session !== undefined && req.session.is_logined == true ){
    result.data.is_logined = true;
    result.data.name = req.session.user_name;
  }

  res.render('../public/views/index.ejs' ,result);
  //res.send("data");
});

router.get('/loginpage', function(req, res, next) {
  console.log("test in");
  res.render('../public/views/signin.ejs', { title: 'login' });
});


module.exports = router;
