/**
 * Created by andycall on 15/5/28.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var autoIncrement = require('mongoose-auto-increment');
var SubjectShema = new Schema({
    index: { type: Schema.Types.ObjectId, ref: 'Index' },
    title : String,
    result : String,
    id : String,
    username : String
});

SubjectShema.plugin(autoIncrement.plugin, 'Subject');
mongodb.model('Subject', SubjectShema);