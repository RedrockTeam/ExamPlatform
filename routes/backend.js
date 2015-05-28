/**
 * Created by andycall on 15/5/27.
 */

var express = require('express');
var router = express.Router();
var Subject = require('../proxy/subject');

// config this router relative path
var relativePath = "/backend";
var error = require('../error');

/* GET home page. */

router.get('/', function(req, res){
    res.render('background');
});

router.get('/addSubject', function(req, res){
    var userId = req.user.id;

    Subject.getTitleById(userId, function(err, subjects){
        if(err){
            res.status(404).json({
                error : JSON.stringify(err)
            });
        }

        res.render('addSubject', {
            subject : subjects
        });
    });
});

router.post('/addSubject', function(req, res){
    var title = req.body.title;
    var id = req.user.id;
    var username = req.user.displayName;

    Subject.getSubjetByTitle(title, function(err, subject){
        if(subject){
            return res.json({error : "名称重复！"});
        }

        Subject.saveSubject({
            title : title,
            id : id,
            username : username
        }, function(err){
            if(err){
                error.logError(err);
            }
            res.json({status : 200, title : title, id : id});
        });
    });
});

router.post('/deleteSubject', function(req, res){
    var id = req.body.id;

    Subject.deleteSubjectById(id, function(err){
        if(err){
            res.json({
                error : error
            });
        }
        res.json({
            statusCode : 200
        });
    });
});

exports.router = router;
exports.relativePath = relativePath;