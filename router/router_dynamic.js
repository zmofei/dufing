'use strict';

const httpResponse = require('../http/http_response');
const fs = require('fs');
const path = require('path');
const rootBase = 'root';

let routerCache = {};

function Dynamic(request, response, _path) {
    let appPath = path.join(process.mainModule.filename, '..');
    var filePath = path.join(appPath, rootBase, _path);
    console.log('DDDD',filePath)

    // let appPath = path.join(process.mainModule.filename, '..');
    // let filePath = path.join(appPath, staticBase, _path);

    if (routerCache[path]) {

    } else {
        // if the path can be a file
        if (!/\/$/.test(filePath)) {
            // if the path not end with '\ ',
            // that's mean it colod be a folder or file
            // try to deal with it as file
            filePath = path.join(filePath + '.js');
            console.log('try path 1', filePath)
        }

        // try to deal with it as floder
        filePath = path.join(filePath, 'index.js');
        console.log('try path 2-',filePath);
        // console.log('try path 2',path.join(process.cwd(), '../example/root/index.js'));
        let page = require(filePath);
        console.log(page)
    }


    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('Welcome to mSite\n');
    return false;

        // if (routerCache[path]) {
        //
        // } else {
        //     //router
        //     console.log('Origin', path.join(reqPath))
        //     // if the path can be a file
        //     if (!/\/$/.test(reqPath)) {
        //         // if the path not end with '\ ',
        //         // that's mean it colod be a folder or file
        //         // try to deal with it as file
        //         console.log('try path', path.join(process.cwd(), rootBase, reqPath + '.js'))
        //     }
        //
        //     // try to deal with it as floder
        //     console.log('try path', path.join(process.cwd(), rootBase, reqPath, 'index.js'))
        //
        //     // static
        //     // console.log('path Three', path.join(process.cwd(), staticBase, reqPath))
        // }
        // console.log('path', path.join(process.cwd(), rootBase, reqPath));
        // console.log('cwd', process.cwd());

    fs.stat(filePath, function(err, state) {
        if (state) {
            var mtime = state.mtime.toGMTString();
            if (mtime == request.headers['if-modified-since']) {
                // if the file is cached
                httpResponse.res304(request, response);
            } else {
                var now = new Date();
                // the default expores time is one year
                now.setFullYear(now.getFullYear() + 1);
                var expires = now.toGMTString();

                var headData = {
                    'Content-Type': 'text/javascript; charset=utf-8',
                    'Version': 'HTTP/1.1',
                    'Last-Modified': mtime || null,
                    'Cache-Control': 'private, max-age=31536000',
                    'Expires': expires,
                    'Content-Length': state.size || ''
                };

                if (request.headers.range) {
                    // Streaming Media Like mp4
                    var range = request.headers.range;
                    var parts = range.replace(/bytes=/, '').split('-');
                    var partialstart = parts[0];
                    var partialend = parts[1];
                    var start = parseInt(partialstart, 10);
                    var end = partialend ? parseInt(partialend, 10) : stats.size - 1;
                    var chunksize = (end - start) + 1;
                    headData['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stats.size;
                    headData['Accept-Ranges'] = 'bytes';
                    headData['Content-Length'] = chunksize;
                    response.writeHead(206, headData);
                } else {
                    response.writeHead(200, headData);
                }

                var stream = fs.createReadStream(filePath);
                stream.pipe(response);
                stream.on('end', function() {
                    response.end();
                });
            }
        } else {
            httpResponse.res404(request, response);
        }
    })
}

module.exports = Dynamic;
