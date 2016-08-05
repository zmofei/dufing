# Dufing - A folder system based Node.js webserver

--------------------------------------------------------------------------------

Dufing 是一个基于文件系统的Node.js webserver, 他可以自动根据文件结构读取router文件，同时支持第三方middleware。

## 准备工作

1. 新建项目目录
2. 进入项目目录，初始化项目 `npm init`

## 安装

```
npm install --save dufing
```

## 快速上手

#### 1. app.js

在项目根目录建立我们的项目文件  `app.js`，这个文件作为我们的启动文件，后续如果需要运行项目只要在该目录执行 `node app.js` 即可。

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

#### 2. /root/index.js

在根目录中建立 `root` 文件夹，这个文件夹将会成为我们开发的主要目录。

所有非静态资源请求，都会访问到该目录对应的文件，详见`文件系统`的说明。

接下来，我们在root目录下建立 `index.js` 文件，这样我们访问网站的跟目录时(如 `http://localhost/` )，根据文件系统的规则，就会执行这个文件了。


```JavaScript
/**
 * root/index.js
 * 默认情况下 root 为代码的根目录
 * 访问 127.0.0.1:8333/ 系统会自动的查找 `root/index.js`
 * 具体的路由规则，详见路由模块的介绍
 */

var renderGet = function() {
    // this.req 相当于请求的request
    // this.res 相当于请求的response
    this.res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    this.res.end('welcome to dufing');
}

// exports.[method] 将需要执行的代码块抛给dufing处理
exports.get = renderGet;
// 这里的get指用户只能通过get请求方法访问页面
// 如果想要只接受post请求，可以写成 export.post = renderGet;
```

此时，运行 `node app.js` 访问 `http://127.0.0.1:8124/` 就可以看到结果了

#### 3. static/\*.\*

默认情况下，static为静态资源目录，所有符合规则的静态资源都会被直接读取到。

比如访问

`http://hostname/test.js` 系统会尝试访问 `static/test.js` 如果不存在返回404

## 示例
[朱文龙的自留地](http://www.zhuwenlong.com) ([代码](https://github.com/zmofei/myblog))
