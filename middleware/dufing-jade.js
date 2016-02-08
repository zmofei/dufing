'use strict';

const jade = require('jade');
const path = require('path');
const fs = require('fs');
const httpResponse = require('../http/http_response');

exports.jade = function(obj) {
    let self = this;
    let path = this.router.path.replace(/\.\w+$/, '.jade');
    fs.stat(path, function(err, stats) {
        if (stats) {
            let fn = jade.compileFile(path);
            let html = fn(obj.data);
            self.res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            self.res.end(html);
        } else {
            httpResponse.res404(self.req, self.res);
        }
    });
};
