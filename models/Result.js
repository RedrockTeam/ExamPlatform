/**
 * Created by andycall on 15/5/28.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var ResultShema = new Schema({
    title : String,
    result : String,
    id : Number,
    displayName : String
});


mongodb.model('Result', ResultShema);