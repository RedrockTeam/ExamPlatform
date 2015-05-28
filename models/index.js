/**
 * Created by andycall on 15/5/27.
 */
var mongoose = require('mongoose');
var config = require('../config');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect(config.db, function(err) {
    if(err) {
        console.error('connect to %s error', config.db, err.message);
        process.exit(1);
    }
    console.log('mongoDB connected');
});

autoIncrement.initialize(connection);

require('./User');
require('./Subject');
require('./Result');
require('./Exam');

exports.User = mongoose.model('User');
exports.Subject = mongoose.model('Subject');
exports.Exam = mongoose.model('Exam');
exports.Result = mongoose.model('Result');
exports.monogoose = mongoose;