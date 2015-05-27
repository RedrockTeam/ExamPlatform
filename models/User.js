/**
 * Created by andycall on 15/5/27.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var UserShema = new Schema({
    provider : String,
    accessToken : String,
    isAdmin : Boolean,
    id : {
        type: Number,
        unique: true
    },
    displayName : String,
    username : String,
    profileUrl : String,
    emails : [new Schema({
        value : String
    }, {_id : false})],
    raw: String,
    _json : Object
});


mongodb.model('User', UserShema);