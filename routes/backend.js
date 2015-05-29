/**
 * Created by andycall on 15/5/27.
 */

var express = require('express');
var router = express.Router();
var Subject = require('../proxy/subject');
var Exam = require('../proxy/exam');
// config this router relative path
var relativePath = "/backend";
var error = require('../error');
var crypto = require('crypto');

/* GET home page. */

router.get('/', function(req, res){
    Exam.getExamList(function(err, exams){
        if(err){
            console.log(err);
            res.status(404).end(JSON.stringify(err));
        }
        res.render('background', {
            exams : exams
        });
    });
});

router.get('/createExam', function(req, res){
    res.render('createExam');
});

router.post('/createExam', function(req, res){
    var examTitle = req.body.title;
    var authorId = crypto.createHash('sha1').update(Math.random().toString()).digest('hex');

    Exam.createExam(examTitle, authorId, function(err){
        if(err){
            console.log(err);
            return res.json({error : "测试创建失败"});
        }

        res.redirect('/backend/addSubject?examTitle='+ examTitle);
    });

});

router.get('/addSubject', function(req, res){
    var userId = req.user.id;
    var examTitle = req.query.examTitle;

    if(! examTitle) {
        return res.redirect('/backend/createExam');
    }

    Exam.getExamByTitle(examTitle, function(err, exam){
        if(err){
            console.log(err);
            return res.status(400).end("获取测试信息错误！");
        }

        Subject.getSubjectsById(exam.authorId, function(err, subjects){
            if(err){
                res.status(404).json({
                    error : JSON.stringify(err)
                });
            }
            res.render('addSubject', {
                subject : subjects,
                examTitle: examTitle
            });

        });

    });
});

router.post('/addSubject', function(req, res){
    var title = req.body.title;
    var username = req.user.displayName;
    var examTitle = req.body.examTitle;
    var startTime = req.body.startTime;

    Exam.getExamByTitle(examTitle, function(err, exam){
        if(err){
            return res.json({error : "查找测试错误！"});
        }

        Subject.getSubjetByTitle(title, function(err, subject){
            if(subject){
                return res.json({error : "名称重复！"});
            }

            Subject.saveSubject({
                title : title,
                id : exam.authorId,
                username : username
            }, function(err, newSubject){
                if(err){
                    error.logError(err);
                }

                exam.startTime = startTime;
                exam.subjectId.push(newSubject._id);

                exam.save(function(err){
                    if(err) {
                        return res.json({
                            error: "测试保存错误！"
                        });
                    }

                    res.json({status : 200, title : title, id : newSubject._id});
                });
            });
        });
    });
});

router.post('/deleteSubject', function(req, res){
    var id = req.body.id;
    var examTitle = req.body.examTitle;

    Exam.deleteSubjectId(examTitle, id, function(err, exam){
        if(err){
            console.log(err);
            //return res.json({error : "删除失败!"});
        }

        Subject.deleteSubjectById(id, function(err){
            if(err){
                console.log(err);
            }

            res.status(200).end(JSON.stringify({statusCode : 200}));
        });
    });
});

exports.router = router;
exports.relativePath = relativePath;