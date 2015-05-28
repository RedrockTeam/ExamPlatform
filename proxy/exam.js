/**
 * Created by andycall on 15/5/28.
 */
var Exam = require('../models').Exam;
var _ = require('lodash');


exports.createExam = function(title, id, callback){
    var exam = new Exam();

    exam.title = title;
    exam.authorId = id;

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
        _.each(exam.subjectId, function(sid, index){
            if(sid === id){
                exam.subjectId.splice(index, 1);
                exam.save(callback);
            }
        });

        return callback(null);
    });
};
