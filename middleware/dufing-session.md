# session 中间件

session 中间价可以帮助你保存和读取用户session。

默认的 session key 为 ds (dufing sesion)，值为 `******-***`(36位的时间戳-session在该应用中的id) 格式

## API

### this.session.set(key, value, exp)

##### @param key 

session的key

##### @param value

session的value

##### @param exp

session的过期时间，单位为毫秒（针对全局，不是某个key）


举例如下：

```javascript
// /root/index.js
var get = function() {
    this.session.set('username', 'abc', 1000*60*60*24*30)
}

exports.get = get;
```


### this.session.get(key)

session的key

举例如下：

```javascript
// /root/index.js
var get = function() {
    this.session.get('username')
}

exports.get = get;
```

### this.session.expires(exp);

##### @param exp

session的过期时间，单位为毫秒

```javascript
// /root/index.js
var get = function() {
    // 设置session 30天后过期
    this.session.exp(1000*60*60*24*30)
}

exports.get = get;
```