/**
 * Created by andycall on 15/5/12.
 */

var path = require('path');

var config = {
    //debug 为 true 时，用于本地调试
    //debug: true,

    // mongodb 配置
    db: 'mongodb://andycall:dong1234@127.0.0.1/homework',
    db_name: 'redrock',

    // oauth config
    oauth_client_id : "ebdc4ffe9b73c17f0f75",
    oauth_client_secret : "1f94f3ee14eb7c3f9bd736eaf0b87103ca052d7c",

    // 程序运行的端口
    port: 3000

};

module.exports = config;
