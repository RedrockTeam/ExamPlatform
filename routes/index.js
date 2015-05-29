var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../proxy/user');
var Subject = require('../proxy/subject');
var Exam = require('../proxy/exam');

// config this router relative path
var relativePath = "/";


/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = req.user.id;



    res.render('index', { title: 'Express', user : req.user });
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