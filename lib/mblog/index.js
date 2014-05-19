var server = require('./server/server');
var mime = require('./mime/mime');
var get = require('./router/router_get');

exports.start = server.start;
exports.mime = {
    add: mime.add,
    remove: mime.remove
};

exports.get = get.addRouter; 