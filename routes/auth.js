const express = require('express');
const router = express.Router();
const {signinService} = require('../service/signinService.js');
let  path = require('path');
let user = new signinService();
// url : /signin/
router.get('/', (req, res,next)=>{
    res.render(path.join(__dirname ,'../views/signin.ejs'));
});

module.exports = function (passport) {

    router.post('/login_process',
        passport.authenticate('local', {
        successRedirect: '/', // /
        failureRedirect: '/loginpage'
    }));
 

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
        req.logout();
        
        req.session.save(()=>{
            console.log("req.session.is_logined : ", req.session.is_logined);
            res.json(result);
        });

    });
    return router;
}
