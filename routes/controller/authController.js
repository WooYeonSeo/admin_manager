const {util} = require('../../modules/util.js');
class AuthController {
    constructor(authService){
        this.authService = authService;
    }
    async checkAdminAuth(req,res,next){
        if(req.user !== undefined && Number(req.user.is_admin) === 1){
            next();
        }else{
            res.redirect('/')
        }
    }
}
module.exports ={AuthController}