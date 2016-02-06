'use strict';

exports.jade = function() {
    let jade = require('jade');
    console.log(this.router)
    // console.log(this.res)
    this.res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    this.res.end('Welcome to mSite - jade\n');
    // console.log('use jade')
};
