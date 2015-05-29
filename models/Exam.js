/**
 * Created by andycall on 15/5/28.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;

var ExamShema = new Schema({
    authorId : String,
    studentId : Array,
    subjectId : Array,
    startTime : Date,
    isRunning : Boolean,
    title : String
});

mongodb.model('Exam', ExamShema);