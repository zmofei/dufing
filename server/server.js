const http = require('http');
const router = require('../router/router');
// console.log(router);


const process = require('process');

var url = require('url');

function server(port){
    http.createServer(router).listen(port);
    console.log('server start at ',port)
}

module.exports = server;
