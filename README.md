mSite
=====

mBlog is rename to mSite

our website is [mSite](http://msite.zhuwenlong.com) (only Chinese,Engling is in progressing)

The faster way built your website with node.js


Installation
=====

```
$ npm install msite
```

Usage
=====

```javascript
var app = require('msite');

app.start('9999');
```

Static files
=====

all the static files (*.*) are in the folder `/static`

eg: `127.0.0.1:9999/test.js` => `/static/test.js`


#### MIME
the default MIME is:

``` javascript
MIME = {
  'css' : 'text/css',
  'js' : 'text/javascript',
  'gif' : 'image/gif',
  'jpg' : 'image/jpeg',
  'png' : 'image/png',
  'ico' : 'image/x-icon',
  'html' : 'text/html',
  'htm' : 'text/html',
  'txt' : 'text/plain',
  'mp4' : 'video/mp4'
};
```

if you want add or remove some MIME,you can simple use:

add .exe file support
`app.mime.add({"exe":"plan/application"})`

remove .css file support
`app.mime.remove("css")`  

remove .css and .javascript file support
`app.mime.remove("css,javascript")`  

Dynamic url
=====

if access a dynamic url (not end with *.*);

for example,if you visite a url `name.com/abc/dd`

msite first try to read `/abc/dd.js` file,if the file is exists , run this file,if it's not exists,msite will try to read `/abc/dd.jade`,if it's also not exists ,msite will try to put dd as a folder and try to readen `/abc/dd/index.js` | `/abc/dd/index.jade`,if msite sitll got nothing,it return 404


> `name.com/abc/dd` => `/abc/dd.js` | `/abc/dd.jade`

> `name.com/abc/dd` => `/abc/dd/index.js` | `/abc/dd/index.jade`

##HTML Templpate

In msite we use Jade to readen html,it's easy and simple

[Jade language Reference](http://jade-lang.com/reference/#casefallthrough)

you also can use jade's layout to finish you pages


##Router Rules

### get(RegExp,folder,option)

* RegExp the ruler of your path
* floder the floder witch the file is 
* option.mime the default mime of dynamic is 'text/html', sometime we want change the mime, say if you setup a path 'xxx.com/rss',you want this url return 'application/rss+xml',you can use option.mime

sometimes we don't want visit as a filesystem.
for example you want the following address
`name.com/blog/1235`
to readen
`/blog/index.jade` and the model `/blog/index.js`
in this case you can use the method `get`

`name.com/blog/1235` => `/blog/index.jade` & `/blog/index.js`

```javascript
var app = require('msite');

//the router
app.get(/\/blog\/(\d{4})$/, 'blog');
//if the url match the /\/blog\/(\d{4})$/,
//msite will try to readen the index.jade and index.js in folder /blog

app.start('9999');
```

get with mime
```javascript
app.get(/\/rss$/, 'rss',{mime:'application/rss+xml'});
```


##Alias

you can simple use `.alias(aliasName,aliasFolder)` add a alias.

lat's say if your domain is `zhuwenlong.com`,and you want add a alias `msite.zhuwenlong.com`,you can write like this:

```javascript
var app = require('msite');

//add alias msite
app.alias('msite','/msite');
//add alias test
app.alias('test');

app.start('9999');
```

in `.alias(aliasName,aliasFolder)` you can assign the alias's floder,or the sys will use '/'+aliasFolder as a default alias folder


License
=====

MIT
