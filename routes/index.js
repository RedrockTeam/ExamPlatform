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
    var displayName = req.user.displayName;

    examTitle = examTitle.substring(0, 40);
    if(! /\d{1,4}/.test(subjectId) || ! examTitle || examTitle.length > 40){
        return res.status(404).end("哦， 你来搞我服务器了嘛。 你完了→_→");
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

            Result.getResultBySubjectId(displayName, subjectId, function(err, resultContent){
                res.render('index', {
                    title: 'Redrock考试平台',
                    user : req.user,
                    subjectId : subjectId,
                    examTitle : examTitle,
                    subject : subject,
                    subjectIdArr : exam.subjectId,
                    resultContent: resultContent
                });
            });
        });
    });
});

router.post("/subject", function(req, res){
    var subjectId = parseInt(req.body.page);
    var result = req.body.result;
    var displayName = req.user.displayName;
    var isAdmin = req.user.isAdmin;
    var examTitle = req.body.examTitle;


    //if(isAdmin){
    //    return res.end("<script>alert('管理员不要乱动学员的东西→_→')</script>");
    //}
    Exam.getActiveExam(function(err, exam){
        if(err){
            console.log(err);
            return res.json(err);
        }

        if(! exam){
            return res.end("暂未开始！");
        }

        subjectIdArr = exam.subjectId;

        var next = _.indexOf(subjectIdArr, subjectId) + 1;
        if(!next){
            res.set("Content-Type", 'text/html');
            return res.end("都做完了！");
        }

        Result.getResultByName(displayName, function(err, oldResult){
            if(err){
                res.json({error : err});
            }

            if(! oldResult){

                Result.saveResult({
                    ExamTitle : examTitle,
                    displayName : displayName,
                    result : [
                        {
                            subjectId : subjectId,
                            result : result
                        }
                    ]
                }, function(err, result){
                    if(err){
                        res.end('错误!');
                    }

                    var lastId = _.last(subjectIdArr);

                    if(lastId === subjectId){
                        res.set("Content-Type", 'text/html');
                        res.end('都结束了, 点击返回键继续回去修改');
                    } else {
                        res.redirect('/subject?subid=' + subjectIdArr[_.indexOf(subjectIdArr, subjectId) + 1] + '&examTitle=' + examTitle);
                    }
                });
            } else {
                Result.updateResultByName(displayName, {
                    subjectId : subjectId,
                    result : result
                }, function(err, newRes){

                    var lastId = _.last(subjectIdArr);

                    if(lastId === subjectId){
                        res.set("Content-Type", 'text/html');
                        res.end('都结束了, 点击返回键继续回去修改');
                    }else{
                        res.redirect('/subject?subid=' + subjectIdArr[_.indexOf(subjectIdArr, subjectId) + 1] + '&examTitle=' + examTitle);
                    }
                });
            }
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

exports.router = router;
exports.relativePath = relativePath;