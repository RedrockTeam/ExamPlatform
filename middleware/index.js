/**
 * Created by andycall on 15/5/6.
 */

/**
 * 插件采用黑名单方式，
 * 默认全部加载middleware文件夹内所有的中间价，
 * 跳过黑名单
 * @type {Array}
 */

var fs = require('fs');
var DirectoryRoot = __dirname;
var _ = require('lodash');
var path = require('path'),
    cli = require('cli-color'),
    setupMiddleware,
    notice = cli.blue,
    routeNotice = cli.magenta;

function deleteFromArray(ele, arr){
    for(var i = 0; i < arr.length; i ++){
        if(arr[i] === ele){
            arr.splice(i, 1);
        }
    }
}

function MiddleWareManager(app){
    this._server = app;
    this.middlewares = [];
    this.blackList = [];
}

MiddleWareManager.prototype.getMiddleWareName = function(src){
    var dirList = fs.readdirSync(src);
    var _this = this;

    _.each(dirList, function(dirname){
        var current = fs.lstatSync(path.join(DirectoryRoot, dirname));
        if(current.isDirectory()) {
            getMiddleWareName(path.join(src, dirname));
        } else if(dirname === 'index.js' || dirname.substring(0,1) === '.') {
            return;
        }
        else {
            _this.middlewares.push(path.join(src, dirname));
        }
    });
};

MiddleWareManager.prototype.loadBlackList = function(){
    var blackList = fs.readFileSync(path.join(DirectoryRoot, '.blackList'), {encoding: "utf-8"}).split('\n');
    this.blackList = blackList;
};

MiddleWareManager.prototype.loadRouters = function(){
    var routeList = fs.readdirSync(path.join(DirectoryRoot, '../', 'routes'));
    var _this = this;

    _.each(routeList, function(route){
        var routerObj = require(path.join(process.cwd(), 'routes', route));
        var router = routerObj.router;
        var relativePath = routerObj.relativePath;
        console.log(routeNotice("loading router", relativePath));
        _this._server.use(relativePath, router);
    });
};

MiddleWareManager.prototype.setup = function(){
    var server = this._server;

    var _this = this;

    // load blackList
    this.loadBlackList();

    // get all middleware
    this.getMiddleWareName(DirectoryRoot);

    _.each(_this.blackList, function(black){
        deleteFromArray(path.join(DirectoryRoot, [black, '.js'].join('')), _this.middlewares);
    });

    _.each(_this.middlewares, function(middleware){
        console.log(notice("loading middleware: ", middleware));
        var middlewareFile = require(middleware);
        var middlewareType = middlewareFile.type;
        if(middlewareFile.param){
            server.use(middlewareFile.call(server, middlewareFile.param));
        }
        else if(middlewareType === 'middleware'){
            server.use(middlewareFile);
        }
    });

    // load all routes
    this.loadRouters();
};

setupMiddleware = function(app){
    var middleware = new MiddleWareManager(app);

    // load custom middleware
    middleware.setup();
};

module.exports = setupMiddleware;