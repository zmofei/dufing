var conf = require('../config/config');

var confAlias = conf.alias || {};

exports.addAlias = function(alias, folder) {
    confAlias[alias] = folder ? folder : alias;
};

exports.getAlias = function() {
    return confAlias;
};