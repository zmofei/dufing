var http = require('http');
var router = require('../router/router.js');

exports.start = function(port) {

  var port = port || 8088;
  
  http.createServer(function(req, res) {
    router.router(req, res);
  }).listen(port);
  console.log('Server running at http://127.0.0.1:' + port + '/');
};
