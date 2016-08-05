# API

## 1. 示例方法

### Dufing.get(RgeExp,path)

该方法用来指定特殊的路由规则，其中 `RegExp` 为正则，`path` 为对应的文件。

示例如下
```
'use strict';
// 初始化dufing
let Dufing = require('dufing');
let site = new Dufing({
    port: 8333
});

// 通过 .get 指定特殊路由
// 该情况下，凡是符合`/\/blog\/(.{24})$/`规则的路由，
// 如`http://www.host.com/blog/123412341234123412341234`
// 都会被指向到路径`/blog/old` 
// 系统会按照`文件系统`的规则执行（依次匹配`/blog/old.js`,`/blog/old/index.js`）
site.get(/\/blog\/(.{24})$/, '/blog/old');
```

## 2. 动态路由方法

### this.req

	等同于此次http请求的 request 

### this.res

	等同于此次http请求的 response
