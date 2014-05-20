var url = require('url');
var routerStatic = require('./router_static');
var routerDynamic = require('./router_dynamic');
var routerAlias = require('./router_alias');

exports.router = function(req, res) {

    var reqUrl = url.parse(req.url);
    var path = reqUrl.pathname;
    
    //get domain and alias
    var host = req.headers.host.split(':');
    var hostname = host[0];
    var port = host[1] || 80;
    var dealHost = hostname.trim().match(/([\w|\.]*?)\.{0,1}(\w+\.\w+)$/);
    var alias = dealHost[1] || null;
    var domain = dealHost[2];
    var aliases = routerAlias.getAlias();
    var aliasFolder = aliases[alias] ? aliases[alias] : '';

    //static
    var fileType = /\.(\w+)$/.test(path);
    if (fileType) {
        var fileSrc = '.' + aliasFolder + '/static/' + path.replace(/^\//, '');
        routerStatic.staticFile(req, res, fileSrc);
    } else {

        var fileSrc = '.' + aliasFolder + path;
        console.log(fileSrc)
        routerDynamic.dynamic(req, res, fileSrc);
    }
    //

};