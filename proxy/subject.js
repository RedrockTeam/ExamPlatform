/**
 * Created by andycall on 15/5/28.
 */
var Subject = require('../models').Subject;
var _ = require('lodash');


exports.getSubjectsById = function(id, callback){
    Subject.findOne({ id : id}, callback);
};

exports.getSubjectsByIndex = function(index, callback){
    Subject.findOne({_id : index}, callback);
};

exports.getSubjetByTitle = function(title, callback){
    Subject.findOne({ title : title}, callback);
};

exports.saveSubject = function(data, callback){
    var subject = new Subject();

    _.assign(subject, data);

    subject.save(callback);
};

exports.deleteSubjectById = function(id, callback){
    Subject.find({ _id : id}).remove(callback);
};
