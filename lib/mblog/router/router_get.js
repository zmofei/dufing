var conf = require('../config/config');

var confGet = conf.get || [];

exports.addRouter = function(url, router, option) {
    //
    if (url instanceof RegExp) {
        confGet.push({
            reg: url,
            router: router,
            option: option
        });
    } else {
        //TODO if the url is "/blog/:id" transform to RegExp
    }

};

exports.getRouter = function() {
    return confGet;
};