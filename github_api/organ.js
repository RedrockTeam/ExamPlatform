/**
 * Created by andycall on 15/5/27.
 */

var apiPrefix = "https://api.github.com";
var sendRequest = require('./index');
var errors = require('../error');


function getOrganList(options, callback){
    if(! options.token) {
        errors.logError("require user token", 'Unable to get user organ', 'please Login first');
    } else if(! options.username){
        errors.logError("require username", 'Unable to get user organ');
    }
    sendRequest(apiPrefix + "/users/" + options.username + "/orgs", 'GET', options.token, options, callback);

}

module.exports.getOrganList = getOrganList;