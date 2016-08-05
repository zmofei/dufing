# 开发

使用dufing开发非常容易，对于每个动态文件，需要通过 `exports.[method]` 对外方法，在访问地址时，系统会直接执行对应的方法。

举例如下：

```JAVASCRIPT
/**
 * /root/index.js
 **/

// render 通过后面的 exports.[method] 抛给动态路由处理
// 符合规则的地址会直接执行该方法
var render = function() {
	// this.res 等同于http请求的response，具体详见API
    this.res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    this.res.end('welcome to dufing');
}

var postTest = function(){
    this.res.end('使用post方法')
}

// 通过exports.[method]告诉动态路由，应该执行的方法
// 其中method为http的method，可为get,post,put,delete 等
exports.get = render;
```

以上代码，

运行之后如果用get方法访问（http://ip:port/）系统会返回 `welcome to dufing` 的字样

如果使用post方法访问该地址，系统会返回`使用post方法`字样


