# response 中间件

response 中间件用来处理http请求的response的高级方法。

## API

### this.response.json(obj)

obj 为需要返回的obj对象。


/root/index.js

```javascript
var getResponse = function() {
    var data = {
        title: 'hello response',
        body: 'method is get'
    }
    this.response.json(data);
}

var postResponse = function() {
    var data = {
        title: 'hello response',
        body: 'method is post'
    }
    this.response.json(data);
}

exports.get = getResponse;
exports.post = postResponse;
```

如上，当用户以get方式访问目标地址（http://localhost:port/）会得到如下内容 

```JSON
{
    title: 'hello response',
    body: 'method is get'
}
```

如果以post的方式访问的话或得到如下内容：

```JSON
{
    title: 'hello response',
    body: 'method is post'
}
```

*以上两种访问得到文件头均为 `"Content-Type": "application/json"`