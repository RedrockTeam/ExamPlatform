/**
 * Created by andycall on 15/5/12.
 */

var path = require('path');

var config = {
    //debug 为 true 时，用于本地调试
    //debug: true,

    // mongodb 配置
    db: 'mongodb://andycall:dong1234@127.0.0.1/redrock',
    db_name: 'redrock',

    // 程序运行的端口
    port: 3000

};

module.exports = config;
