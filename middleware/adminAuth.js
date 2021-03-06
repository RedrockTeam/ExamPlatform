/**
 * Created by andycall on 15/5/28.
 */
var router = require('../routes/backend');
var _ = require('lodash');
var Path = require('path');

function adminAuth(req, res, next){

    if(req.isAuthenticated()){
        var user = req.user;
        var isAdmin = user.isAdmin;
        var path = req.path;
        var adminPath = [];

        var routerStack = router.router.stack;

        routerStack.forEach(function(value){
            if(value.route.path === '/'){
                adminPath.push('/backend');
            } else {
                adminPath.push(Path.join('/backend', value.route.path));
            }
        });

        if(_.indexOf(adminPath, path) > -1) {
            if(!isAdmin){
                return res.status(404).end('Page not found');
            }
        }
    }
    next();
}



module.exports = adminAuth;
module.exports.type = 'middleware';