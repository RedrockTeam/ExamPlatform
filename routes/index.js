var express = require('express');
var router = express.Router();
var _ = require('lodash');


var ignorePath = [
    '/oauth',
    '/oauth/callback',
    '/loginin'
];

function ensureAuthenticated(req, res, next) {
    //var flag = true;
    //_.each(ignorePath, function(path){
    //    if(req.path === path){
    //        flag = false;
    //    }
    //});
    //if(!flag){
    //    return next();
    //}
    //if (req.isAuthenticated()) { return next(); }
    //res.redirect('/loginin')
    next();
}

// config this router relative path
var relativePath = "/";

router.use(ensureAuthenticated);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', user : req.user });
});

router.get('/hello', function(req, res, next){
    res.render('hello', { user : req.user});
});

router.get('/loginin', function(req, res){
    res.render('login');
});

router.get('/loginout', function(req, res){
    req.logout();
    res.redirect('/loginin');
});



router.post('/autoSave', function(){

});

router.post('/getSave', function(){

});

exports.router = router;
exports.relativePath = relativePath;