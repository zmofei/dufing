var fs = require('fs');
var mimes = require('../mime/mime').mime();
var ress = require('./router_response');


exports.staticFile = function(req, res, fileSrc) {
  //console.log('xxxx',fileSrc,require('path').resolve(fileSrc))

  'use strict';

  var fileType = fileSrc.match(/\w+$/)[0];

  var mime = mimes[fileType] || '';
  if (!mime) {
    ress.res403(req, res);
    return false;
  }

  var filePath = fileSrc;
  fs.exists(filePath, function(exists) {
    if (exists) {
      fs.stat(filePath, function(err, stats) {

        var mtime = stats.mtime.toGMTString();

        if (mtime == req.headers['if-modified-since']) {
          ress.res304(req, res);
          return false;
        } else {

          var now = new Date();
          now.setFullYear(now.getFullYear() + 1);
          var expires = now.toGMTString();
          var headData = {
            'Content-Type': mime + '; charset=utf-8',
            'Version': 'HTTP/1.1',
            'Last-Modified': mtime || null,
            'Cache-Control': 'private, max-age=31536000',
            'Expires': expires,
            'Content-Length': stats.size || ''
          };

          if (req.headers.range) {
            var range = req.headers.range;
            var parts = range.replace(/bytes=/, '').split('-');
            var partialstart = parts[0];
            var partialend = parts[1];

            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : stats.size - 1;
            var chunksize = (end - start) + 1;

            headData['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stats.size;
            headData['Accept-Ranges'] = 'bytes';
            headData['Content-Length'] = chunksize;
            res.writeHead(206, headData);
          } else {
            res.writeHead(200, headData);
          }

          var stream = fs.createReadStream(filePath);
          stream.pipe(res);
          stream.on('end', function() {
            res.end();
          });
        }
      });
    } else {
      ress.res404(req, res);
    }
  });
};