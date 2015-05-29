var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../proxy/user');
var Subject = require('../proxy/subject');
var Exam = require('../proxy/exam');
var Result = require('../proxy/result');
var eventproxy = require('eventproxy');


// config this router relative path
var relativePath = "/";


/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = req.user.id;
    var isAdmin = req.user.isAdmin;

    Exam.getActiveExam(function(err, exam){
        if(err){
            console.log(err);
            return res.json(err);
        }

        var subjectIdArr = exam.subjectId;
        //var e = new eventproxy();
        //
        //_.each(subjectIdArr, function(subjectid){
        //    Subject.getSubjectsById(subjectid, e.done('getSubject'));
        //});
        //e.after('getSubject', subjectIdArr.length, function(subjects){
        //
        //    res.render('index', { title: 'Redrock考试平台', user : req.user });
        //});
        var firstId = subjectIdArr.pop();

        res.redirect('/subject?subid=' + firstId + "&examTitle=" + exam.title);
    });
});

router.get('/subject', function(req, res){
    var subjectId = req.query.subid;
    var examTitle = req.query.examTitle;

    Subject.getSubjectsById(subjectId, function(err, subject){
        if(err){
            console.log(err);
            return res.json(err);
        }

        Exam.getExamByTitle(examTitle, function(err, exam){
            if(err){
                console.error(err);
                return res.json(err);
            }
            console.log(subject);

            res.render('index', { title: 'Redrock考试平台', user : req.user, subjectId : subjectId, subject : subject, subjectIdArr : exam.subjectId });
        });
    });
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