/**
 * Created by andycall on 15/5/27.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');


// config this router relative path
var relativePath = "/backend";

/* GET home page. */


router.get('/', function(req, res){
    res.render('background');
});


router.get('/addSubject', function(req, res){
    res.render('addSubject', {
        test_id : ""
    });
});

router.post('/addSubject', function(req, res){
    res.json({status : 200});
});

exports.router = router;
exports.relativePath = relativePath;