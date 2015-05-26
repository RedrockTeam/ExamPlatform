/**
 * Created by andycall on 15/5/27.
 */

var User = require('../models').User;
var _ = require('lodash');


exports.getUserById = function(id, callback){
    User.findOne({id : id}, callback);
};

exports.updateUser = function(userData, callback) {
    User.update(userData, callback);
};

exports.saveUser = function(userData, callback){
    var user = new User();

    _.assign(user, userData);

    user._json = userData._json;

    user.save(callback);
};