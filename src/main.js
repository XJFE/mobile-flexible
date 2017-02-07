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
    // 统计代码 统计页面访问量
    if(window._hmt) {
      var pre_url = '/#';
      window._hmt.push(['_trackPageview', pre_url + transition.to.path]);
    }
    document.title = '一元购';
});

// 获取全局ROUTER
window.ROUTER = router;
// 全局变量
window.default = {};
Vue.set(window.default, 'REWARD_STATUS', false)

