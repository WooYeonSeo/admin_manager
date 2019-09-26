const {util} = require('../../modules/util.js');
class AuthController {
    constructor(authService){
        this.authService = authService;
    }
    /**
     * 관리자 권한 확인용 미들웨어
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof AuthController
     */
    async checkAdminAuthRouter(req,res,next){
        if(req.user !== undefined && Number(req.user.is_admin) === 1){
            next();
        }else{
            res.redirect('/')
        }
    }
}
module.exports ={AuthController}