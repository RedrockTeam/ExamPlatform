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
var subjectIdArr;

/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = req.user.id;
    var isAdmin = req.user.isAdmin;

    Exam.getActiveExam(function(err, exam){
        if(err){
            console.log(err);
            return res.json(err);
        }

        if(! exam){
            return res.end("暂未开始！");
        }

        subjectIdArr = exam.subjectId;
        var firstId = subjectIdArr.slice(0, 1);

        res.redirect('/subject?subid=' + firstId + "&examTitle=" + exam.title);
    });
});

router.get('/subject', function(req, res){
    var subjectId = req.query.subid;
    var examTitle = req.query.examTitle;

    examTitle = examTitle.substring(0, 40);
    if(! /\d{1,4}/.test(subjectId) || ! examTitle || examTitle.length > 40){
        res.status(404).end("哦， 你来搞我服务器了嘛。 你完了→_→");
    }

    Subject.getSubjectsByIndex(subjectId, function(err, subject){
        if(err){
            console.log(err);
            return res.json(err);
        }

        Exam.getExamByTitle(examTitle, function(err, exam){
            if(err){
                console.error(err);
                return res.json(err);
            }
            console.log('subject', subject);

            res.render('index', {
                title: 'Redrock考试平台',
                user : req.user,
                subjectId : subjectId,
                examTitle : examTitle,
                subject : subject,
                subjectIdArr : exam.subjectId
            });
        });
    });
});

router.post("/subject", function(req, res){
    var subjectId = req.body.page;
    var result = req.body.result;
    var displayName = req.user.displayName;
    var isAdmin = req.user.isAdmin;
    var examTitle = req.body.examTitle;



    if(isAdmin){
        return res.redirect('back').end("<script>alert('管理员不要乱动学员的东西→_→')</script>");
    }

    Result.updateResultByName(displayName, {
        subjectId : subjectId,
        result : result
    }, function(err, newResult){
        if(err){
            return res.json('更新错误！');
        }

        res.redirect('/subject?examTitle=' + examTitle + "&subid=" + subjectIdArr[_.indexOf(subjectIdArr, subjectId) + 1]);
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