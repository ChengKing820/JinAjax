+ function () {
  'use strict'
  var JinAjax = function (obj) {
    this.obj = obj
    this.init()

  }

  JinAjax.prototype.getParam = function () { //参数解析
    this.obj = this.obj || {}
    this.obj.methods = this.obj.methods || 'GET' //undefine 情况过滤
    this.obj.methods = this.obj.methods.toUpperCase()
    this.obj.url = this.obj.url || ''
    this.obj.data = this.obj.data || null
    this.obj.header = this.obj.header || null
    this.obj.success = this.obj.success || function (res) {
      console.log(res)
    }
    this.obj.error = this.obj.error || function (err) {
      console.log(err)
    }
    this.obj.before = this.obj.before || function () {}
    console.log(this.obj)
  }

  JinAjax.prototype.getXHR = function () { //兼容性检查
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else {
      var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
      for (var i = 0; i < versions.length; i++) {
        try {
          var version = versions[i] + ".XMLHTTP";
          return new ActiveXObject(version);
        } catch (e) {
          console.log('error ajax', e)
        }
      }
    }
  }


  JinAjax.prototype.setHeader = function (xhr) { //header设置
    for (var i in this.obj.header) {
      xhr.setRequestHeader(i, this.obj.header[i]);
    }
  }

  JinAjax.prototype.createXHR = function () {
    var xhr = this.getXHR()
    xhr.open(this.obj.methods, this.obj.url, this.obj.async)
    this.setHeader(xhr)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          var responseText = xhr.responseText;
          try {
            xhr.responseText && (responseText = JSON.parse(responseText));
            obj.success(responseText);
          } catch (e) {
            obj.error(xhr);
          }
        } else {
          obj.error(xhr);
        }
      }
    }
    xhr.send(obj.methods === "GET" ? null : obj.data);
  }


  JinAjax.prototype.init = function () {
    this.getParam()
    this.obj.before()
    this.createXHR()
  }



  window.JinAjax = JinAjax //注册全局对象
}()