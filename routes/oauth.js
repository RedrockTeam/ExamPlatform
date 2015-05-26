/**
 * Created by andycall on 15/5/27.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');


// config this router relative path
var relativePath = "/oauth";

/* GET home page. */
router.get('/', passport.authenticate('github'));
router.get('/callback', passport.authenticate('github', { failureRedirect : "/oauth"}), function(req, res, next){
    res.redirect('/');
});


exports.router = router;
exports.relativePath = relativePath;