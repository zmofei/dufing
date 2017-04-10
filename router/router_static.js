'use strict';

const mime = require('./router_mime');
const fs = require('fs');
const path = require('path');
const staticBase = 'static';

function Static(request, response, _path) {
    // let appPath = path.join(process.mainModule.filename, '..');
    //let appPath = process.env.PWD;
     let appPath = process.env.PWD || path.join(process.mainModule.filename, '..');
    let filePath = path.join(appPath, staticBase, _path).replace(/\?.+$/, '');
    // console.log(filePath)
    fs.stat(filePath, function(err, state) {
        let hasExtend = filePath.match(/\.\w+$/);
        if (state && hasExtend) {
            let extend = hasExtend[0];
            let mimeStr = mime[extend];
            if (!mimeStr) {
                response.writeHead(404, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                response.end('404 Not Found');
                return false;
            }
            var mtime = state.mtime.toGMTString();
            if (mtime == request.headers['if-modified-since']) {
                // if the file is cached
                response.writeHead(304, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                response.end('304 Not Modified');
            } else {
                var now = new Date();
                // the default expores time is one year
                now.setFullYear(now.getFullYear() + 1);
                var expires = now.toGMTString();
                var headData = {
                    'Content-Type': mimeStr + '; charset=utf-8',
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
                    var end = partialend ? parseInt(partialend, 10) : state.size - 1;
                    var chunksize = (end - start) + 1;
                    headData['Content-Range'] = 'bytes ' + start + '-' + end + '/' + state.size;
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
            response.writeHead(404, {
                'Content-Type': 'text/html; charset=UTF-8'
            });
            response.end('404 Not Found');
        }
    })
}

module.exports = Static;
