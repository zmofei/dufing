'use strict';

let M = require('../index.js');
console.log('xxx')

let site = new M({
    port: 8333
});

site.use({
    jade: {}
})
