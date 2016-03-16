'use strict';

const http = require('http');
const router = require('../router/router');
const middle = require('../middleware/middleware');

var url = require('url');

function server(port) {
    let self = this;
    http.createServer(function(req, res) {
        middle.regArgs({
            req: req,
            res: res
        });
        router.call(self, req, res);
    }).listen(port);
    console.log('server start at ', port)
}

module.exports = server;
