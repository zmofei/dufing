'use strict';

const server = require('./server/server');

class M {
    constructor(obj) {
        const port = obj.port || 8124;
        server(port);
    }
}

module.exports = M;
