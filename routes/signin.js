const express = require('express');
const router = express.Router();
const {signinService} = require('../service/signinService.js');
let  path = require('path');
let user = new signinService();
// url : /signin/
router.get('/', (req, res,next)=>{
    res.render(path.join(__dirname ,'../views/signin.ejs'));
});

// url : /signin/login
router.post('/login', async (req, res)=>{
    //let result = await user.idChecker(req.body.id); // true false
    let id = req.body.id;
    let pw = req.body.pw;
    let result = {
        status : '200',
        message : '요청 성공',
        data : { 
                is_logined : false,
                name : "",
            }
    };
    
    if(await user.checkUser(id,pw)){
        let userinfo = await user.getUserInfo(id);
        //세션 세팅
        req.session.is_logined = true;
        req.session.user_name = userinfo.user_name;
        // response result setting
        result.data.name = userinfo.user_name;
        result.data.is_logined = true;
        res.cookie('pageid', 'main_form') // ,option
    }else{
        req.session.is_logined = false;
        req.session.user_name = "";
        res.cookie('pageid', 'signin_form') // ,option
    }
    req.session.save(()=>{
        res.json(result);
        //res.render('../public/views/signin.ejs', { title: 'login' });
    });
});


// url : /signin/get/username
router.get('/get/username', user.checkisLogined , async (req, res)=>{
    //let result = await user.idChecker(req.body.id); // true false
    let result = {
        status : '200',
        message : '요청 성공',
        data : { 
                is_logined : req.session.is_logined ,
                name : req.session.user_name,
            }
    };
    
    console.log('result ', req.session);
    res.json(result);
});

//signin/logout
router.get('/logout', async (req, res)=>{
    //let result = await user.idChecker(req.body.id); // true false
    let result = {
        status : '200',
        message : '로그아웃 성공',
        data : { 
                is_logined : req.session.is_logined,
            }
    };
   
    if(req.session !== undefined && req.session.is_logined == true){
        req.session.is_logined = false;
        res.cookie('pageid', 'signin_form') // ,option
    }
    req.session.save(()=>{
        console.log("req.session.is_logined : ", req.session.is_logined);
        res.json(result);
    });

});

module.exports = router;