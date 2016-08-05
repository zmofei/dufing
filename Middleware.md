# 中间件

dufing 引入了中间件的概念，允许第三方开发简单易用的中间件。

本wiki中提及的中间件如无特殊说明，均为系统自带的中间件，可以放心使用。

中间件的开发详见API章节。

中间件的使用方法非常简单，只需要在实例化的dufing时通过use方法注册即可，下面是使用中间件的一个完整例子：


### app.js

```JAVASCRIPT
'use strict';

// 引入dufing
let Dufing = require('dufing');

// 实例化dufing
let site = new Dufing({
    port: 8333
});

// 加载中间件 
// 以下示例是加载的jade中间件，默认情况下，系统自带的中间件无需手动加载，直接使用即可
// site.use({
//     jade: {}
// })
```

### /root/index.js

```JAVASCRIPT
var render = function() {
	// 使用了jade中间件之后，在动态路由文件中就可以通过this.jade访问到jade
	// 这里jade插件会自动寻找 同名的.jade文件，并把传去的变量一起编译，输出给浏览器。
    this.jade.render({
    	// data 为传给.jade文件的变量，具体见jade的api
        data: {
            title: 'dufing',
            body: 'welcome use dufing'
        }
    })
}

exports.get = render;
```

### /root/index.jade

jade 模板文件，其中`#{title}` `#{body}` 为动态路由传递过来的变量

```HTML
doctype html
html(lang="zh")
  head
    meta(charset="UTF-8")
    title #{title}
  body
    #{body}
```

如上，当用户访问 `http://hostname/` 的时候，根据文件系统路由规则，会去执行 `/root/index.js` 文件，在 `/root/index.js` 中，我们使用了jade中间件，其会访问同名文件 `/root/index.jade` 并把其当成模块处理。

用户访问这个页面看到的是，标题为 dufing 内容为 welcome use dufing 的页面。