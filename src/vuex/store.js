/**
 * Created by litian on 16/8/23.
 */
'use strict';
//import Vue from 'vue'
import Vuex from 'vuex'
import personal from './modules/personal'
import pay from './modules/pay'
import demo from './modules/demo'
import component from './modules/component'
import UserInfo from './modules/user-info';
import Header from './modules/header';
import Dialog from './modules/user-action';

//Vue.use(Vuex);

export default new Vuex.Store({
  // 组合各个模块
  modules: {
    personal,
    demo,
    pay,
    component,
    UserInfo,
    Header,
    Dialog
  },
  strict: true
})
