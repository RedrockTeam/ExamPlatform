/**
 * Created by andycall on 15/5/28.
 */


var ignorePath = [
    '/oauth',
    '/oauth/callback',
    '/loginin'
];
var _ = require('lodash');

function ensureAuthenticated(req, res, next) {
    var flag = true;
    _.each(ignorePath, function(path){
        if(req.path === path){
            flag = false;
        }
    });
    if(!flag){
        return next();
    }
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/loginin')
    //next();
}


module.exports = ensureAuthenticated;
module.exports.type = 'middleware';
