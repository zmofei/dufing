# 自定义路由

dufing 默认会按照文件夹的目录去安排路由，但是很多时候，我们需要自定义路由规则，这时候就可以使用dufing的自定义路由功能。

举例如下：

```JAVASCRIPT
/**
 * app.js
 **/
'use strict';

// 初始化dufing
let Dufing = require('dufing');
let site = new Dufing({
    port: 8333
});

// 自定义路由
site.get(/\/blog\/(\d{0,5})$/, '/blog');
```

```JAVASCRIPT
/**
 * root/blog/index.js
 **/
'use strict';
var render = function() {
    // this.reqParam 为匹配到路由参数，
    // 这里如果访问的地址是http://ip:port/blog/12345
    // 那么this.reqParam就相当于执行了下面的内容：
    // '/blog/12345'.match(/\/blog\/(\d{5})/)
    // 结果为：
    // ["/blog/12345", "12345"]
    this.reqParam
}
exports.get = render;
```

以上代码，

运行之后如果用get方法访问（http://ip:port/blog/12345）系统就会把该请求发送到`/blog`目录中，之后的处理步骤和正常访问(http://ip:port/blog/12345)时的步骤一致。


