/* eslint-disable */
'use strict';
import httpUrlConfig from './url.config';

(function() {
  // 可以在这里配置是否使用线上的环境
  window.API_USE = 1;
  // 我们封装的组件
  function install(Vue) {
    Vue.http.options.emulateJSON = true;
    Vue.http.options.emulateHTTP = true;
    // 配置整个应用的URL
    var URL = {};
    if (0 === window.API_USE) {
      URL = httpUrlConfig.test;
    }
    else if(1 == window.API_USE) {
      URL = httpUrlConfig.production;
    }
    else {
      URL = httpUrlConfig.production;
    }

    Vue.OneMallUrl = URL;

    Vue.OneMallHttp = function(vm) {

      var handle;
      // localStorage

      // 测试环境的url  手机上访问不到loclhost路径 模拟数据 可能要实时更改
      var testIP = location.hostname;
      var TEST_URL = 'http://' + testIP + ':8001';
      // 生产环境的url
      var PRODUCTION_URL = 'http://interface.lly800.com';
      // 测试环境的url
      var RELEASE_URL = 'http://release-interface.lly800.com';
      // 预发布的地址
      var PRE_RELEASE = 'http://pre-interface.lly800.com';
      // 当前请求的url
      var RUNNING_URL = '';

      if (0 === window.API_USE) {
        RUNNING_URL = TEST_URL;
      }
      else if(1 === window.API_USE) {
        RUNNING_URL = PRODUCTION_URL;
      }
      else if(4 === window.API_USE) {
        RUNNING_URL = PRE_RELEASE;
      }
      else {
        RUNNING_URL = RELEASE_URL;
      }

      // 全局的一个localStorage
      var httpStatus = {};
      var httpStatusJSONString = JSON.stringify(httpStatus);
      window.localStorage = window.localStorage || (function () {
          function LS() {}
          LS.prototype = {
            setItem: function (key, val) {
              this[key] = val;
            },
            getItem: function (key) {
              return this[key];
            },
            removeItem: function (key) {
              delete this[key];
            },
            clear: function () {
              var me = this;

              Object.keys(this).forEach(function (key) {
                delete me[key];
              });
            },
            get length () {
              return Object.keys(this).length;
            }
          };

          return new LS;
        })();
      //console.log(sessionStorage);
      localStorage.setItem('httpStatus', httpStatusJSONString);
      // 解决重复回调,拦截请求
      var _then = function () { return _then };
      _then.then = _then.catch = _then;

      // GET方法带有参数的
      /*
       * params: 请求的参数 ?a=123
       * subUrl: 是否是在原有的路由基础上拼接的路由
       * independentUrl: 一个完成的路由,即我们不再使用拼接的路由
       */
      function GET(params, subUrl, independentUrl, innerHandle) {

        if (handle) {
          handle = innerHandle;
        }

        var url;
        if (independentUrl) {
          url = independentUrl;
        } else if (subUrl) {
          url = RUNNING_URL + subUrl;
        } else {
          url = RUNNING_URL
        }
        // 进行请求
        // 判断是本地还是线上环境
        var option = {
          method: 'GET',
          url: url,
          params: params
        };
        if (0 === window.API_USE) {
          // TODO
        } else {
          var subOption = {
            credentials: true
          };
          Object.assign(option, subOption);
        }
        // 对请求项进行编码
        var storeId = encrypt(option);
        httpStatus = JSON.parse(localStorage['httpStatus']);
        if(undefined === httpStatus[storeId] || 0 == httpStatus[storeId]) {
          // 可以发送请求
          httpStatus[storeId] = 1;
          httpStatusJSONString = JSON.stringify(httpStatus);
          localStorage.setItem('httpStatus', httpStatusJSONString);

          return Vue.http(option)
            .then(successHandler.bind(null, storeId), errorHandler.bind(null, storeId));
        }
        else {
          return {then:_then};
        }
        //return Vue.http(option).then(successHandler.bind(null, storeId), errorHandler);
      }

      // POST方法
      /*
       * data: 传送给后台的数据
       * subUrl: 是否是在原有的路由基础上拼接的路由
       * independentUrl: 一个完成的路由,即我们不再使用拼接的路由
       */
      function POST(data, subUrl, independentUrl) {
        // 处理请求的路由
        var url;
        if (independentUrl) {
          url = independentUrl;
        } else if (subUrl) {
          url = RUNNING_URL + subUrl;
        } else {
          url = RUNNING_URL
        }
        // 请求的配置
        var option = {};
        if (0 === window.API_USE) {

        } else {
          var subOption = {
            credentials: true
          };
          Object.assign(option, subOption);
        }

        // 对请求项进行编码
        var storeId = encrypt(option);
        httpStatus = JSON.parse(localStorage.getItem('httpStatus'));
        if(undefined === httpStatus[storeId] || 0 == httpStatus[storeId]) {
          // 可以发送请求
          httpStatus[storeId] = 1;
          httpStatusJSONString = JSON.stringify(httpStatus);
          localStorage.setItem('httpStatus', httpStatusJSONString);
          return Vue.http.post(url, data, option)
            .then(successHandler.bind(null, storeId), errorHandler.bind(null, storeId));
        }
        else {
          return {then:_then};
        }
      }
      // 对请求进项编码
      function encrypt(obj) {
        var str = '';
        str = obj.method + obj.url + objToStr(obj.params);
        return encodeURIComponent(str);
      }

      // 对象转换为字符串
      function objToStr(obj) {
        var str = '';
        for(var key in obj) {
          str = str + key + '=' + obj[key];
        }
        return str;
      }

      // 处理成功情况
      function successHandler(storeId, res) {
        httpStatus = JSON.parse(localStorage['httpStatus']);
        httpStatus[storeId] = 0;
        httpStatusJSONString = JSON.stringify(httpStatus);

        localStorage.setItem('httpStatus', httpStatusJSONString);
        // return our data
        if (typeof res.data == "string") {
          try {
            res.data = JSON.parse(res.data);
            // 判断
            // console.log(res.data.code, 'code');
          } catch (e) {
            //console.log(res.data); //有可能是后端的错误页面信息，直接console出来以便查看
            res.data = {
              code: 10001,
              msg: "接口错误"
            };
          }
        }
        // 登录失败
        if (res.data.code == 20000) {
          //window.location.href = "/#/error";
          //window.location.href = "/#/?login=0";
          // 判断用户是否登录
          if(vm) {
            //console.log(123, vm);
            vm.$broadcast('forbidden');
            vm.$parent.$broadcast('forbidden');
          }
        }
        //  网站关闭
        else if(res.data.code == 30000 || res.data.code == 40000) {
          window.location.href = "/#/error-alt?msg=" + res.data.msg;
        }
        return res.data;
      }

      // 处理失败失败情况
      function errorHandler(storeId, res) {
        httpStatus = JSON.parse(localStorage['httpStatus']);
        httpStatus[storeId] = 0;
        httpStatusJSONString = JSON.stringify(httpStatus);
        localStorage.setItem('httpStatus', httpStatusJSONString);
        console.error('数据获取失败!');
        return res || {};
      }

      // 返回本应用中的需要用到的所有的HTTP方法
      return {
        GET: GET,
        POST: POST
      }
    }

    Vue.ClientUrl = URL;

    Vue.ClientHttp = Vue.OneMallHttp;
  }

  if (typeof exports == "object") {
    module.exports = install
  } else if (typeof define == "function" && define.amd) {
    define([], function() {
      return install
    })
  } else if (window.Vue) {
    Vue.use(install)
  }

})();
