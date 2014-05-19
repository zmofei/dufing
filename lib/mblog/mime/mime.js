var conf = require('../config/config');

var mime = conf.mime;

exports.add = function(object) {
    for (var i in object) {
        mime[i] = object[i];
    }
};

exports.remove = function(String) {
    var mimeArray = String.split(',');
    for (var i = 0, len = mimeArray.length; i < len; i++) {
        delete mime[mimeArray[i]];
    }
};

exports.mime = function() {
    return mime;
};