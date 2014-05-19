var fs = require('fs');
var jade = require('jade');
var router = require('./router_get');

exports.dynamic = function(req, res, path) {
    'use strict';

    var routers = router.getRouter();
    var testPath = path.replace(/\./, '');

    for (var i = 0; routers[i]; i++) {
        var reg = routers[i].reg;
        var routerDate = routers[i].router;

        var testResult = testPath.match(reg);

        if (testResult) {
            if (typeof routerDate == 'function') {
                routerDate(req, res);
                return false;
            } else {
                //TODO what if have './'?
                req.params = testResult;
                path = './' + routerDate;
                break;
            }
        }
    }
    //TODO test express
    var modelPath, pagePath;

    if (/\/$/.test(path)) {
        modelPath = path + 'index.js';
        pagePath = path + 'index.jade';
    } else {
        modelPath = path + '.js';
        pagePath = path + '.jade';
    }

    reden(modelPath, pagePath, function() {
        if (!/\/$/.test(path)) {
            modelPath = path + '/index.js';
            pagePath = path + '/index.jade';
            reden(modelPath, pagePath);
        } else {
            res.end(404 + '\n');
        }
    });

    function reden(modelPath, pagePath, callback) {
        fs.exists(modelPath, function(exists) {
            if (exists) {
                var workPath = process.cwd();
                var modefile = modelPath.replace(/^\./, '');
                var model = require(workPath + modefile);
                if (model.model) {
                    model.model(req, res, function(model) {
                        showView(model);
                    });
                } else {
                    showView();
                }
            } else {
                showView();
            }

            function showView(model) {
                var model = model || {}
                model.sys = model.sys || {};
                model.sys.url = req.url;
                fs.exists(pagePath, function(exists) {
                    if (exists) {
                        fs.readFile(pagePath, function(err, data) {
                            var fn = jade.compile(data, {
                                filename: pagePath
                            });

                            var htmlOutput = fn(model || {});

                            showHtml(htmlOutput);

                            function showHtml(html) {
                                var now = new Date();
                                now.setFullYear(now.getFullYear() + 1);
                                var headData = {
                                    'Content-Type': 'text/html; charset=utf-8',
                                    'Version': 'HTTP/1.1',
                                    'Cache-Control': 'private, max-age=0'
                                };
                                res.writeHead(200, headData);
                                res.end(html);
                            }

                        });

                    } else {
                        if (callback) {
                            callback()
                        } else {
                            res.end(404 + '\n');
                        }
                    }
                });
            }

        });
    }
};