# Dufing - A folder system based Node.js webserver

--------------------------------------------------------------------------------

Dufing 是一个基于文件系统的Node.js webserver, 他可以自动根据文件结构读取router文件，同时支持第三方middleware。

## 安装

```
npm install --save dufing
```

## 快速上手

#### 1. app.js

```JavaScript
/**
 * app.js
 * 使用dufing只需简单的require，然后实例化即可
 */

'use strict';

let Dufing = require('dufing');

let site = new Dufing({
    // 指定端口 默认端口是8124
    port: 8333
});
```

#### 2. root/index.js

```JavaScript
/**
 * root/index.js
 * 默认情况下 root 为代码的根目录
 * 访问 127.0.0.1:8333/ 系统会自动的查找 `root/index.js`
 * 具体的路由规则，详见路由模块的介绍
 */

var render = function() {
    // this.req 相当于请求的request
    // this.res 相当于请求的response
    this.res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    this.res.end('welcome to dufing');
}

// module.exports 将需要执行的代码块抛给dufing处理
module.exports = render;
```

#### 3. static/\*.\*

默认情况下，static为静态资源目录，所有符合规则的静态资源都会被直接读取到。

比如访问

`http://hostname/test.js` 系统会尝试访问 `static/test.js` 如果不存在返回404

## 示例
[朱文龙的自留地](http://www.zhuwenlong.com) ([代码](https://github.com/zmofei/myblog))
