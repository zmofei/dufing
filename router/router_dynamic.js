'use strict';

const httpResponse = require('../http/http_response');
const fs = require('fs');
const path = require('path');
const rootBase = 'root';

let routerCache = {};

function Dynamic(request, response, _path) {
    let appPath = path.join(process.mainModule.filename, '..');
    let filePath = path.join(appPath, rootBase, _path);

    if (routerCache[path]) {

    } else {
        let paths = [];
        // if the path not end with '\ ',
        // that's mean it colod be a folder or file
        if (!/\/$/.test(filePath)) {
            // if it's folder
            paths.push(filePath + '.js');
        }
        // if it file
        paths.push(path.join(filePath, 'index.js'));

        readDynamic(paths, function(_module) {
            // success
            if (typeof(_module) == 'function') {
                _module(request, response)
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
                success(_module);
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
