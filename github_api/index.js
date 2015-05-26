/**
 * Created by andycall on 15/5/27.
 */
var request = require('request');
var User = require('../proxy/user');
var errors = require('../error');

/**
 * All request traffic output
 * @param url       the URL where the server will be send
 * @param method    the HTTP method
 * @param token     the user authorization token
 * @param data      the data send with http request
 * @param callback  callback function after request success
 */
function sendRequest(url, method, token, data, callback){
    var argLength = arguments.length;

    if(argLength <= 3){
        return;
    } else if(argLength === 4){
        callback = data;
        data = null;
    }

    var options = {
        url : url,
        method : method,
        json : true,
        headers : {
            "Authorization" : "token " + token,
            "User-Agent" : "GithubDeployment",
            "Accept" : "application/json",
            "Time-Zone" : "Asia/Shanghai"
        }
    };

    if(data.token){
        delete data.token;
    } else {
        delete options.headers.Authorization;
    }

    if(/^head$|^get$/i.test(method)){
        options.fs = data;
    } else if(/^post$|^patch$|^delete$|^put$/i.test(method)){
        options.headers["Content-Type"] = "application/json";
        options.body = data;
    }

    request(options, function(error, response, body){
        if(error){
            errors.logWarn(error, "Can not connect to git api", 'Please check your network first');
        } else if(response.statusCode >= 200 && response.statusCode < 300){
            callback(null, body)
        } else {
            errors.handleGithubError(body, callback);
        }
    })
}

module.exports = sendRequest;

