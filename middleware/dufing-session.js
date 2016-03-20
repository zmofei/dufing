/**
 * @author Mofei Zhu <hello@zhuwenlong.com>
 * this file is session middleware of dufing
 */

'use strict';

// create uniqude id 
var createId = (function() {
    var _id = 10000;
    return function() {
        var id = (+new Date() % (1000 * 60 * 60 * 24 * 100)).toString(36) + '-' + (_id++).toString(36);
        if (_id >= 99999) {
            _id = 10000;
        }
        return id;
    }
})();

//get cookie
function getCookie(req) {
    var theCookie = req['headers']['cookie'];
    var cookieObj = {};
    if (!theCookie) {
        return cookieObj;
    }
    var cookieArray = theCookie && theCookie.split(';');
    for (var i = 0, len = cookieArray.length; i < len; i++) {
        var temArray = cookieArray[i].split('=');
        cookieObj[temArray[0].replace(/^\s*/g, '')] = temArray[1];
    }
    return cookieObj;
};

// main class
class Session {
    constructor(args) {
        var self = this;
        this.proto = args;

        // the default name of session is ds(dufing session)
        this.key = 'ds';
        this.autoCleanTime = 1000 * 60 * 60 * 20;

        this.sessions = {};
        this.expList = {};

        self._autoClean()
    }

    // get the session
    get(key) {
        let self = this.proto;
        var sessionId = this._getSessionId();

        var data = this.sessions[sessionId];
        if (key) {
            if (data) {
                return data[key];
            } else {
                return null;
            }
        } else {
            return data;
        }
    }

    // set the session
    set(key, value, exp) {
        let self = this.proto;
        var sessionId = this._getSessionId();
        var data = new Date();
        data.setMilliseconds(data.getMilliseconds() + (exp || 1000 * 60 * 60 * 24 * 30));

        if (!sessionId || !this.sessions[sessionId]) {
            // new visite
            sessionId = sessionId || createId();
            self.req.sessionId = sessionId;
            var cookieStr = this.key + '=' + sessionId + '; expires=' + data;
            self.res.setHeader('Set-Cookie', cookieStr);

            // push to time list
            var time = new Date(+data);
            time.setDate(time.getDate() + 1);
            time.setHours(0);
            time.setMinutes(0);
            time.setSeconds(0);
            time.setMilliseconds(0);
            this.expList[+time] = this.expList[+time] || [];
            this.expList[+time].push(sessionId);
            this.sessions[sessionId] = {
                _exp: +time
            };
        } else {
            // old friend
            if (exp) {
                var cookieStr = this.key + '=' + sessionId + '; expires=' + data;
                self.res.setHeader('Set-Cookie', cookieStr);

                // clear old exp time 
                var newList = [];
                var _expStr = this.sessions[sessionId]._exp;
                if (_expStr) {
                    for (var i in this.expList[_expStr]) {
                        if (this.expList[_expStr][i] != sessionId) {
                            newList.push(this.expList[_expStr][i])
                        }
                    }

                    // use new list instancdof old list
                    this.expList[_expStr] = newList;

                    // push to new time list
                    var time = new Date(+data);
                    time.setDate(time.getDate() + 1);
                    time.setHours(0);
                    time.setMinutes(0);
                    time.setSeconds(0);
                    time.setMilliseconds(0);
                    this.expList[+time] = this.expList[+time] || [];
                    this.expList[+time].push(sessionId);
                    this.sessions[sessionId]._exp = +time;
                }

            }
        }

        this.sessions[sessionId] = this.sessions[sessionId] || {}
        this.sessions[sessionId][key] = value;
    }

    expires(time) {
        let self = this.proto;
        var sessionId = this._getSessionId();
        if (time) {
            var data = new Date();
            data.setMilliseconds(data.getMilliseconds() + time);
            var cookieStr = this.key + '=' + sessionId + '; expires=' + data;
            self.res.setHeader('Set-Cookie', cookieStr);


            var newList = [];
            var _expStr = this.sessions[sessionId]._exp;
            for (var i in this.expList[_expStr]) {
                if (this.expList[_expStr][i] != sessionId) {
                    newList.push(this.expList[_expStr][i])
                }
            }

            this.expList[_expStr] = newList;
            var expStr = +data;
            this.expList[expStr].push(sessionId);
        }
    }

    // del the session
    del(key) {
        var sessionId = this._getSessionId();
        delete this.sessions[sessionId][key];
    }

    // clear cache
    clear() {
        var self = this;
        // var expStr = +new Date();
        var data = new Date();
        data.setDate(data.getDate() - 1);
        data.setHours(0);
        data.setMinutes(0);
        data.setSeconds(0);
        data.setMilliseconds(0);
        for (var i in self.expList) {
            if (parseInt(i) < +data) {
                var arr = self.expList[i];
                arr.map(function(val) {
                    delete self.sessions[val];
                });
                delete self.expList[i];
            }
        }
    }

    // get session id from cache
    _getSessionId() {
        let self = this.proto;
        var cookie = getCookie(self.req);
        var sessionId = cookie[this.key] || self.req.sessionId;
        return sessionId;
    }

    _autoClean(time) {
        var self = this;
        self.clear();
        setTimeout(function() {
            self._autoClean(self.autoCleanTime);
        }, time || self.autoCleanTime);
    }
}

exports.session = Session;
