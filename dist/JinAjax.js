+ function () {
  'use strict'
  var JinAjax = function (obj) {
    this.obj = obj
    this.init()

  }

  JinAjax.prototype.getParam = function () { 
    this.obj = this.obj || {}
    this.obj.methods = this.obj.methods || 'GET'
    this.obj.methods = this.obj.methods.toUpperCase()
    this.obj.url = this.obj.url || ''
    this.obj.data = this.obj.data || null
    this.obj.header = this.obj.header || null
    this.obj.timeout = this.obj.timeout || 10000
    this.obj.type = this.obj.type || 'json'
    this.obj.jsonp = this.obj.jsonp || 'callback'
    this.obj.success = this.obj.success || function (res) {
      console.log(res)
    }
    this.obj.error = this.obj.error || function (err) {
      console.log(err)
    }
    this.obj.before = this.obj.before || function () {}

    this.flag = ''
    this.timeoutBool = false 
  }

  JinAjax.prototype.getXHR = function () {
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

  JinAjax.prototype.timeOutSet = function (xhr,dom) { 
    var _this = this
    var timeId = setTimeout(function () {
      _this.obj.error('request timeout more than ' + _this.obj.timeout + 'ms')
      _this.timeoutBool = true
      if (_this.obj.type === 'jsonp') {
        document.body.removeChild(dom);
      } else {
        xhr.abort()
      }
    }, _this.obj.timeout)
    this.flag = timeId
  }


  JinAjax.prototype.setHeader = function (xhr) {
    for (var i in this.obj.header) {
      xhr.setRequestHeader(i, this.obj.header[i]);
    }
  }

  JinAjax.prototype.createXHR = function () {
    var _this = this
    var xhr = this.getXHR()
    xhr.open(this.obj.methods, this.obj.url, this.obj.async)
    this.timeOutSet(xhr, 0)
    this.setHeader(xhr)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (_this.timeoutBool) {
          return;
        }
        clearTimeout(_this.flag)
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

  JinAjax.prototype.setJsonp = function () {  
    var _this = this
    var script = document.createElement('script')
    window.callback = function (data) {
      document.body.removeChild(script)
      clearTimeout(_this.flag)
      try {
        data 
      } catch (e) {
        _this.obj.error(e)
      }
      _this.obj.success(data);
    }
    script.src = this.obj.url + (this.obj.url.indexOf("?") > -1 ? "" : "?") + _this.obj.jsonp +"=callback"
    script.type = "text/javascript";
    document.body.appendChild(script);
    this.timeOutSet(0, script);
  }


  JinAjax.prototype.init = function () {
    this.getParam()
    this.obj.before()
    if (this.obj.type === 'jsonp') {
      this.setJsonp()
    } else {
      this.createXHR()
    }

  }



  window.JinAjax = JinAjax 
}()