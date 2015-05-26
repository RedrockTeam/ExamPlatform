/**
 * Created by andycall on 15/5/27.
 */
var passport = require('passport');
var User = require('../proxy/user');
var errors = require('../error');

passport.serializeUser(function(user_raw, done){
    User.getUserById(user_raw.id, function(err, user){
        if(err){
            errors.logWarn(err, "Can not read from mognodDB");
            return done(err);
        }
        if( ! user){
            User.saveUser(user_raw, function(err){
                if(err){
                    errors.logError(err, 'Can not save User');
                }
                done(null, user_raw);
            });
        } else if(user_raw.token !== user.accessToken ){
            User.updateUser({'accessToken' : user_raw.accessToken}, function(err){
                if(err){
                    errors.logError(err, 'can not update User!');
                }

                done(null, user_raw);
            });
        } else {
            done(null, user);
        }
    });
});

passport.deserializeUser(function(obj, done) {

    done(null, obj);
});


module.exports.type = 'none';