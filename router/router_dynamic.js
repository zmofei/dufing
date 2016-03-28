'use strict';

const httpResponse = require('../http/http_response');
const middle = require('../middleware/middleware');
const fs = require('fs');
const path = require('path');
const rootBase = 'root';

let routerCache = {};

function Dynamic(request, response, _path) {
    let self = this;
    self.req = request;
    self.res = response;
    // let appPath = path.join(process.mainModule.filename, '..');
    let appPath = process.env.PWD;

    var usePath = _path.replace(/\?.*$/, '');

    // customer router
    // console.log(usePath, this.routerGet)
    self.reqParam = null;
    for (var i in this.routerGet) {
        var reg = new RegExp(this.routerGet[i][0]);

        var match = usePath.match(reg);
        if (match) {
            usePath = this.routerGet[i][1];
            self.reqParam = match;
            break;
        }
    }

    var method = self.req.method.toLowerCase();
    var cacheName = _path + '_' + method;

    if (routerCache[cacheName]) {
        middle.regArgs({
            router: {
                path: routerCache[cacheName].path
            }
        });
        routerCache[cacheName].fn.call(self, request, response)
    } else {
        let filePath = path.join(appPath, rootBase, usePath);

        let paths = [];
        // if the path not end with '\ ',
        // that's mean it colod be a folder or file
        if (!/\/$/.test(filePath)) {
            // if it's folder
            paths.push(filePath + '.js');
        }
        // if it file
        paths.push(path.join(filePath, 'index.js'));

        readDynamic(paths, function(_module, filePath) {
            var methodFunction = _module[method];
            // success
            if (typeof(methodFunction) == 'function') {
                routerCache[cacheName] = {
                    'fn': methodFunction,
                    'path': filePath
                };
                middle.regArgs({
                    router: {
                        path: filePath
                    }
                });
                methodFunction.call(self, request, response)
            } else {
                httpResponse.res404(request, response);
            }
        }, function() {
            // file
            httpResponse.res404(request, response);
        });
    }
}

function readDynamic(paths, success, fail) {
    var index = 0;
    getFile();

    function getFile(callback) {
        let filePath = paths[index];
        fs.stat(filePath, function(err, state) {
            if (state) {
                // success
                var _module = require(filePath);
                success(_module, filePath);
            } else {
                if (paths[++index]) {
                    getFile();
                } else {
                    // 404
                    fail();
                }
            }
        });
    }
}

module.exports = Dynamic;
