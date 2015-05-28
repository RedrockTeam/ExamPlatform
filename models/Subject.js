/**
 * Created by andycall on 15/5/28.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var SubjectShema = new Schema({
    title : String,
    result : String,
    id : Number,
    username : String
});


mongodb.model('Subject', SubjectShema);