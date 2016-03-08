'use strict'

const url = require('url');
const process = require('process');
const dynamicRouter = require('./router_dynamic');
const staticRouter = require('./router_static');


const rootBase = 'root';

let routerCache = {};



function Router(request, response) {
    var reqUrl = url.parse(request.url);
    var reqPath = reqUrl.path;

    if (/\.\w+/.test(reqPath)) {
        // if is static
        staticRouter(request, response, reqPath);
    } else {
        // if is dynamic
        dynamicRouter.call(this, request, response, reqPath);
    }

}

module.exports = Router;
