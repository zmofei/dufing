/**
 * @author Mofei Zhu <hello@zhuwenlong.com>
 * this file is session middleware of dufing
 */

'use strict';


class Session {

    // get the session
    get() {
        var cookie = getCookie(this.req);
        console.log(cookie);
    }

    // set the session
    set() {

    }

    // del the session
    del() {

    }

    // clear cache
    clear() {

    }
}

// var session = {};



// //session time control
// session.time = {};

// //session library
// session.lib = {};


// exports.start = function(req, res) {
//     //get id from cookie or create a id
//     var cookieObj = getCookie(req);
//     if ((!cookieObj) || (!cookieObj.sessionid)) {
//         var id = Date.parse(new Date()) + '' + parseInt(Math.random() * 100000000000);
//         res.setHeader('Set-Cookie', 'sessionid=' + id);
//     } else {
//         var id = cookieObj.sessionid;
//     }

//     return {
//         //get session
//         get: function(key) {
//             if (!session['lib'][id]) {
//                 return null;
//             }
//             if (key) {
//                 return session['lib'][id][key];
//             } else {
//                 console.log('SESSION GTE:sessionid', id, 'sessionval', session['lib'][id]);
//                 return session['lib'][id];
//             }
//         },

//         //set seeion
//         set: function(key, value, exp) {
//             if (key == 'time') {
//                 console.log('The key "time" is not available');
//                 return false;
//             }

//             //set the value
//             session['lib'][id] = session['lib'][id] || {};
//             session['lib'][id][key] = value;
//             //if have time delete it
//             var timeid = session['lib'][id]['time'];
//             if (timeid) {
//                 delete session['time'][timeid][id];
//             }
//             //set|update the exp time and market
//             var data = new Date();
//             data.setMilliseconds(data.getMilliseconds() + (exp || 1000 * 60 * 60 * 24));
//             var time = '' + data.getFullYear() + data.getMonth() + data.getDate() + data.getHours() + data.getMinutes();
//             //console
//             session['lib'][id]['time'] = time;
//             session['time'][time] = session['time'][time] || {};
//             session['time'][time][id] = true;
//             //return
//             return true;
//         },
//         //del session
//         del: function(key) {
//             if (key) {
//                 delete session['lib'][id][key];
//             } else {
//                 delete session['lib'][id];
//             }
//         }
//     };
// };

// //the clear
// session.clear = function() {
//     var date = new Date();
//     date.setHours(date.getHours() + 24, 0, 0);
//     var waitTime = date - new Date();
//     var time = '' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes();
//     setTimeout(function() {
//         for (i in session['time'][time]) {
//             console.log(i, session['lib'][i], 'cleared');
//             delete session['lib'][i];
//         };
//         delete session['time'][time];
//         session.clear();
//     }, waitTime);
// };

// session.clear();


//get cookie
function getCookie(req) {
    var theCookie = req['headers']['cookie'];
    if (!theCookie) {
        return null;
    }
    var cookieArray = theCookie && theCookie.split(';');
    var cookieObj = {};
    for (var i = 0, len = cookieArray.length; i < len; i++) {
        var temArray = cookieArray[i].split('=');
        cookieObj[temArray[0].replace(/^\s*/g, '')] = temArray[1];
    }
    return cookieObj;
};

exports.session = function() {
    new Session(this);
};
