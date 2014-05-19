var url = require('url');
var routerStatic = require('./router_static');
var routerDynamic = require('./router_dynamic');

exports.router = function(req, res) {

  var reqUrl = url.parse(req.url);
  var path = reqUrl.pathname;

  var fileType = /\.(\w+)$/.test(path);
  //static
  if (fileType) {
    var fileSrc = './static/' + path.replace(/^\//,'');
    routerStatic.staticFile(req, res, fileSrc);
  } else {
    var fileSrc = '.' + path;
    routerDynamic.dynamic(req, res, fileSrc);
  }
  //

};
