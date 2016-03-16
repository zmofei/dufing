'use strict';

class Response {
    constructor(args) {
        this.proto = args;
    }

    json(obj) {
        let self = this.proto;
        let json = JSON.stringify(obj);
        self.res.writeHead(200, { "Content-Type": "application/json" });
        self.res.end(json);
    }
}

exports.response = Response;