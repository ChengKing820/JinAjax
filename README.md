# JinAjax

原生JS封装AJAX方法，支持IE6



# 使用方法
1.HTML中引入index.js  文件名可随意修改

2.script标签中代码如下

```
var obj = {
      methods: 'GET',  //请求方法 默认为GET
      url: './test.json',   //请求地址
      header: {     //自定义header
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {    //非GET请求数据参数
        url: '123'
      },
      async: true,   //是否为异步请求，true为异步，false为同步
      success: function (res) {   //成功回调
        console.log(res)
      },
      error: function (e) {   //错误回调
        console.log(e)
      },
      before: function () {   //请求发起前调用钩子
        console.log('aaa')
      }
    }
    var ajax = new JinAjax(obj)  //初始化JinAjax对象，传入obj参数
```


#本地调试
1.将nginx服务配置到JinAjax文件夹下
2.访问nginx服务，默认请求test.json
