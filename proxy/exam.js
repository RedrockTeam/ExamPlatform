/**
 * Created by andycall on 15/5/28.
 */
var Exam = require('../models').Exam;
var _ = require('lodash');
var eventproxy = require('eventproxy');
var ep = new eventproxy();


exports.createExam = function(title, id, callback){
    var exam = new Exam();

    exam.title = title;
    exam.authorId = id;
    exam.isRunning =  false;

    exam.save(callback);
};

exports.getExamByTitle = function(title, callback){
    Exam.findOne({ title : title}, callback);
};

exports.updateExam = function(data, callback){
    Exam.update(data, callback);
};

exports.deleteSubjectId = function(title, id, callback){
    Exam.findOne({
        title : title
    }, function(err, exam){
        console.log(exam);
        _.each(exam.subjectId, function(sid, index){
            if(sid == id){
                exam.subjectId.splice(index, 1);
                console.log(exam);
                exam.save(callback);
            }
        });

        return callback(null);
    });

    //Exam.collection.pull({ title : title } , {$pull : {'subjectId' :{ number : sid } }}, callback);
};


exports.activeExamByTitle = function(title, callback){
    exports.getExamList(function(err, exams){
        if(err){
            callback(err);
        }

        _.each(exams, function(exam){
            console.log(exam);
            exam.isRunning = false;
            exam.save(ep.done('setTrue'));
        });

        ep.after('setTrue', exams.length, function(){

            Exam.findOne({ title : title}, function(err, exam){
                if(err){
                    callback(err);
                }
                exam.isRunning = true;

                exam.save(callback);
            });
        });

        ep.fail('setTrue', function(err){
            console.log(err);
        });
    });
};

exports.getExamList = function(callback){
    Exam.find({}, callback);
};