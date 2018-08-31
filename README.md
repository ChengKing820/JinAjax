# JinAjax

原生JS封装AJAX方法，支持IE6


# 目录结构

-dist  产物文件夹
--JinAjax.js  --简洁版产物，无注释
--JinAjax.min.js  --混淆压缩后产物
-index.html 本地调试用html文档
-plugin.js 本地调试用JS文件，含注释
-test.json 本地调试用返回参数文件


# 使用方法
1.HTML中引入plugin.js  文件名可随意修改

2.script标签中代码如下

```
var obj = {
      methods: 'GET',  //请求方法 默认为GET
      url: './test.json',   //请求地址
      header: {     //自定义header
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      timeout: 5000 //超时时间设置，默认值10000，单位为毫秒
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


# 本地调试
1.将nginx服务配置到JinAjax文件夹下
2.访问nginx服务，默认请求test.json
