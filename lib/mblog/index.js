var server = require('./server/server');
var mime = require('./mime/mime');
var get = require('./router/router_get');
var alias = require('./router/router_alias');

exports.start = server.start;
exports.mime = {
    add: mime.add,
    remove: mime.remove
};

exports.get = get.addRouter;
exports.alias = alias.addAlias;