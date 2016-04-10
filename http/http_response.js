'use strict';

const https = {
    304: {
        header: {
            'Content-Type': 'text/html; charset=UTF-8'
        },
        content: '304 Not Modified'
    },
    403: {
        header: {
            'Content-Type': 'text/html; charset=UTF-8'
        },
        content: '403 Forbidden'
    },
    404: {
        header: {
            'Content-Type': 'text/html; charset=UTF-8'
        },
        content: '404 Not Found'
    }
}

class DufingHttp {
    constructor(args) {
        this.proto = args;
    }

    http(code, header, content) {
        var self = this.proto;
        code = code || 200;
        header = header || {
            'Content-Type': 'text/html; charset=UTF-8'
        }
        content = content || '200 OK';

        if (https[code]) {
            header = https[code].header || header;
            content = https[code].content || content;
        }

        self.res.writeHead(code, header);
        self.res.end(content);
    }
}

module.exports = DufingHttp;
