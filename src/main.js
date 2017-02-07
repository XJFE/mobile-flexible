/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import App from './app'
import RouteConf from './router/router'
import HttpConf from './http'
import * as filter from './filters/substr';
import candyCarousel from './directives/candy-carousel';

// 是否需要调试

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueTouch)
// 确保之前使用过VueResource
Vue.use(HttpConf)
//Vue.use(Vuex);

// 使用自定义过滤器
for(let p in filter){
  Vue.filter(p, filter[p]);
}
// 使用仿照微信的图片轮播
Vue.directive('candy-carousel', candyCarousel);

//toast组件样式
import 'vue-toast-mobile/lib/index.css';

var router = new VueRouter({
    hashbang: false
})

// 设置一个全局变量

// 路由部分
router.map(RouteConf.route)

// 启动整个应用
router.start(App, '#app')

//router.redirect({
//  '/': '/tao-you'
//});

router.beforeEach(function(transition) {
  if(!window.mID) {
    //console.log(transition.from.query);
    var query = transition.from.query || {};
    if(query.hasOwnProperty('mID')) {
      window.mID = query.mID;
    }
  }
  transition.next();
});

router.afterEach(function (transition) {
  // 一元夺宝页面
  var flag1 = (transition.to.path.indexOf('/tao-you') !== 0);
  var flag2 = (transition.to.path === '/');
  //console.log(flag1 , flag2, transition.to.path);
  if (flag1) {
    if($ && $('.antui--taoyou').length !== 0) {
      $('.antui--taoyou').remove();
    }
    if($ && $('.antui-layout').length === 0) {
      $('<link class="antui-layout" rel="stylesheet" href="/static/css/layout.css">').insertBefore($('#antui-mark-layout'));
      $('.tao-you-meta').remove();
      $('<meta class="tao-you-meta" name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1, user-scalable=no">').insertBefore($('#antui-mark-layout'));
    }
    // 统计代码 统计页面访问量
    if(window._hmt) {
      var pre_url = '/#';
      window._hmt.push(['_trackPageview', pre_url + transition.to.path]);
    }
    document.title = '一元购';
  }
  // 淘友助手页面
  else {
    var resourceBaseUrl = 'https://as.alipayobjects.com/g/h5-lib/antui/9.9.0-2/rem/';
    var componentsName = ['widget/message.css','widget/page-result.css',
                          'widget/popmenu.css', 'widget/process.css', 'widget/card.css',
                          'widget/article.css', 'widget/search.css',
                          'widget/toast.css'];
    var baseStyleUrl = 'antui.css';
    var componentsUrl = '??' + componentsName.join(',');
    var scriptUrl = 'antui.js';

    if($ && $('.tao-you-meta').length !== 0) {
      $('.tao-you-meta').remove();
    }

    if($ && $('.antui-layout').length !== 0) {
      $('.antui-layout').remove();
    }

    if ($ && $('.antui--taoyou').length == 0) {
      //$('<link class="antui--taoyou" rel="stylesheet" type="text/css" href="' + resourceBaseUrl + baseStyleUrl + '" media="all">').insertBefore($('#antui-mark'));
      $('<link class="antui--taoyou" rel="stylesheet" type="text/css" href="/static/css/antui/antui.css" media="all">').insertBefore($('#antui-mark'));
      $('<link class="antui--taoyou" rel="stylesheet" type="text/css" href="' + resourceBaseUrl + componentsUrl + '" media="all">').insertBefore($('#antui-mark'));
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '/static/lib/adaptation/changeHtmlFontSize.js';
      var antuiScript = document.createElement('script');
      antuiScript.type = 'text/javascript';
      antuiScript.src = resourceBaseUrl + scriptUrl;
      //$('body').append(script);
      $('body').append(antuiScript);
    }

    document.title = '淘游助手';
  }
});

// 获取全局ROUTER
window.ROUTER = router;
// 全局变量
window.default = {};
Vue.set(window.default, 'REWARD_STATUS', false)
//window.default = {
//  REWARD_STATUS: false
//};
