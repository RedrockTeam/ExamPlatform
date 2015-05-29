/**
 * Created by andycall on 15/5/28.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var ResultShema = new Schema({
    ExamTitle : String,
    result : [
        new Schema({
            subjectId : String,
            result : String
        }, {_id : false})
    ],
    displayName : String
});


mongodb.model('Result', ResultShema);