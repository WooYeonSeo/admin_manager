const {signinService} = require('../service/signinService.js');

module.exports =  (app) => {
    let user = new signinService();

    let passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session()); 

    passport.serializeUser((user, done)=>{
        console.log("user ", user);
        done(null, user);
    });

    passport.deserializeUser((user, done)=>{
        console.log("deserializeUser ", user);
        done(null, user);
    });

    passport.use(new LocalStrategy(
         (username, password, done)=>{
            user.checkUser(username,password).then((idchecker)=>{
                if(idchecker){
  
                    user.getUserInfo(username).then((userinfo)=>{
                        console.log("userinfo ", userinfo);
                        let userdata = {
                            "user_id" : userinfo.user_id,
                            "user_name" : userinfo.user_name
                        }
    
                        done(null, userdata, {
                            message: 'Welcome.'
                        });
                    })
                }else{
                    return done(null, false, {
                        message: 'Incorrect user.'
                    });
                }
            })
        } 
    ));
    return passport;
}