'use strict';

exports.json = function(obj) {
    let self = this;
    let json = JSON.stringify(obj);
    self.res.writeHead(200, { "Content-Type": "application/json" });
    self.res.end(json);
}
