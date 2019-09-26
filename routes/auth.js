const express = require('express');
const router = express.Router();
const {signinService} = require('../service/signinService.js');
let  path = require('path');
let user = new signinService();
const {AuthController} = require('./controller/authController.js');
let authController = new AuthController(user);
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

    router.get('/users/:page', async (req,res)=>{
        let result = {
            status : '',
            message : '',
            data : {
                
            }
        };
        let page = req.params.page;
        let offset = 10;
        let users = await user.getUsers(page*offset,offset);
        result.data['userlist'] = users;
        
        res.json(result);
    }) 

    router.post('/update/type', async (req,res)=>{
        let result = {
            status : '',
            message : '',
            data : {
                
            }
        };
        
        if(await user.updateAuth(req.body.userid, req.body.type)){
            result.status = 200;
            result.message = '수정 성공';
        }
        
        res.json(result);
    }) 
    return router;
}
