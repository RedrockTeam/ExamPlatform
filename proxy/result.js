/**
 * Created by andycall on 15/5/29.
 */
var Result = require('../models').Result;
var _ = require('lodash');


exports.saveResult = function(data, callback){
    var result = new Result();

    _.assign(result, data);

    result.save(callback);
};


exports.getResultByName = function(name, callback){
    Result.findOne({displayName : name}, callback);
};

exports.updateResultByName = function(name, newR, callback){
    exports.getResultByName(name, function(err, res ){
        var oldResultArr = res.result;

        _.each(oldResultArr, function(old, index){
            if(old.subjectId == newR.subjectId){
                oldResultArr[index].result = newR.result;
            }
        });

        res.result = oldResultArr;
        res.save(callback);
    });
};

//exports.updateResultById = function(id, data, callback){
//    exports.getResultById(id, function(err, result){
//        _.assign(result, data);
//
//        result.save(callback);
//    });
//};
