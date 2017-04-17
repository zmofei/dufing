/**
 * Created by Falost on 2017/4/9.
 */
'use strict';

const hbs = require('hbs');
const fs = require('fs');
const layouts = require('handlebars-layouts');
const httpResponse = require('../http/http_response');

hbs.handlebars.registerHelper(layouts(hbs.handlebars));

class Hbs {
  constructor(args) {
    this.proto = args;
  }
  use(obj){
    let self = this.proto;
    let _obj = obj || {};
    let viewPath = _obj.viewPath || '';
    let adminViewPath = _obj.adminViewPath || '';

    if(viewPath !=='')
    hbs.registerPartials(viewPath);//注册前台后台视图路径
    if(adminViewPath !== '')
    hbs.registerPartials(adminViewPath);//注册后台模版路径

    //console.log(_obj.exname)
    self.exname = _obj.exname || '.hbs'; //设置模版文件后缀
    //self.viewPath = viewPath;
    //self.adminViewPath = adminViewPath;
    return self
  }

  render(filePath,_obj) {
    let obj = _obj || {};
    let self = this.proto;
    let layoutPath ;

    let path = _obj.path ? _obj.path + '/' + filePath + self.exname:self.router.path.replace(/\.\w+$/, self.exname);
    let _path = path;

    this.use({viewPath:_obj.path,adminViewPath:_obj.path,exname:self.exname});

    fs.stat(path, function(err, stats) {
      if (stats) {
        //如果有默认布局，就加载布局走
        if(_obj.layout){
          path = _obj.path + '/' + _obj.layout +  self.exname;
          layoutPath = _path;
          hbs.registerPartial('body', fs.readFileSync(layoutPath, 'utf8'));
        }
        // Compile template
        var template = hbs.compile(fs.readFileSync(path, 'utf8'));

        let html = template(obj.data);
        var header = {
          'Content-Type': 'text/html'
        }
        if (obj.header) {
          for (var i in obj.header) {
            header[i] = obj.header[i];
          }
        }
        self.res.writeHead(200, header);
        self.res.end(html);
      } else {
        self.res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        self.res.end('404 Not Found - [dufing-hbs]');
      }
    });
  }
}

exports.hbs = Hbs;
