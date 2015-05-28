/**
 * Created by andycall on 15/5/27.
 */
var mongoose = require('mongoose');
var config = require('../config');


mongoose.connect(config.db, function(err) {
    if(err) {
        console.error('connect to %s error', config.db, err.message);
        process.exit(1);
    }
    console.log('mongoDB connected');
});


require('./User');
require('./Subject');

exports.User = mongoose.model('User');
exports.Subject = mongoose.model('Subject');
exports.monogoose = mongoose;

