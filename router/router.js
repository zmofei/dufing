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
        dynamicRouter(request, response, reqPath);
    } else {
        // if is dynamic
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end('Welcome to mSite\n');
        staticRouter(reqPath);
    }

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

}

module.exports = Router;
