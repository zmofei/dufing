# jade 中间件

jade中间件是系统自带的中间件，我们力求把它设计的足够简单。

jade主要用来显示jade模板，在动态路由文件方法中可以通过 `this.jade` 访问到。

## API

### this.jade.render(data)

其中data为Object对象，是传递给jade文件模板的数据，该方法会自动查找当前目录下同名的.jade文件，如访问 `http://hostname/resume/new` 对应的动态路由文件为 `/root/resume/new.js` , 那么此时jade插件回去尝试寻找 `/root/resume/new.jade` 文件，如果有就会带着数据去编译并返回给浏览器。

下面是个例子：

#### /root/index.js

```JAVASCRIPT
var render = function() {
	// 使用了jade中间件之后，在动态路由文件中就可以通过this.jade访问到jade
	// 这里jade插件会自动寻找 同名的.jade文件，并把传去的变量一起编译，输出给浏览器。
    this.jade.render({
    	// data 为传给.jade文件的变量
        data: {
            title: 'dufing',
            body: 'welcome use dufing'
        }
    })
}

exports.get = render;
```

#### /root/index.jade

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