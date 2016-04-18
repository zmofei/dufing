'use strict';

const jade = require('jade');
const path = require('path');
const fs = require('fs');
const httpResponse = require('../http/http_response');

class Jade {
    constructor(args) {
        this.proto = args;
    }

    render(_obj) {
        let obj = _obj || {};
        let self = this.proto;
        let path = self.router.path.replace(/\.\w+$/, '.jade');
        fs.stat(path, function(err, stats) {
            if (stats) {
                let fn = jade.compileFile(path);
                let html = fn(obj.data);

                var header = {
                    'Content-Type': 'text/html'
                }
                if (obj.header) {
                    for (var i in obj.header) {
                        header[i] = obj.header[i];
                    }
                }

                self.res.writeHead(200, header);
                self.res.end(html);
            } else {
                self.res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                self.res.end('404 Not Found - [dufing-jade]');
            }
        });
    }
}

exports.jade = Jade;
