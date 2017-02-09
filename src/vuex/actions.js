'use strict';
import * as types from './mutation-types'
// 测试vuex
export const showDemo = function ({dispatch, state}, num) {
  dispatch(types.DEMO, num);
};
// 购买商品
export const buyGoodsUpdateTaoBi = function ({dispatch, state}, params) {
  dispatch(types.BUY_GOODS, params);
};
//充值 淘金币
export const updateTaobi = function ({ dispatch, state }, num) {
  dispatch(types.UPDATE_TAOBI, num);
};

//收货地址列表
export const setAddressList = function ({ dispatch, state }, list) {
  dispatch(types.SET_ADDRESS_LIST, list);
};

// 关于现实ICP备案
export const showReview = function({dispatch, state}, isShow) {
  dispatch(types.UPDATE_REVIEW_STATUS, isShow);
};

// 关于礼物的显示
export const showRewardReview = function({dispatch, state}, isShow) {
  dispatch(types.UPDATE_REWARD_STATUS, isShow);
};

/*****************************修改用户信息*****************************/
// 获取用户信息
export const getUserInfo = function ({ dispatch, state }, callback) {
  // if(this.user.username == ''){
    Vue.ClientHttp().GET({}, Vue.ClientUrl.user_info)
      .then((res) => {
        if (res.code == 10000) {
          dispatch(types.UPDATE_USERINFO, res.result);
        }
        if(typeof callback == 'function'){
          callback();
        }
      });
  // }
};

// 修改用户信息
export const updateUserInfo = function ({ dispatch, state }, oUser) {
  dispatch(types.UPDATE_USERINFO, oUser);
};

// 修改用户头像路径
export const updateUserInfoImg = function ({ dispatch, state }, newImgUrl) {
  dispatch(types.UPDATE_USERIMG, newImgUrl);
};

/***************************淘游、一元购共通***************************/
// 是否显示app头部
export const getHeaderFlag = function ({ dispatch, state }) {
  if (this.headerFlag === null) {
    Vue.OneMallHttp().GET({
      nologin: 1
    }, Vue.OneMallUrl.get_header_flag)
      .then(({code, result} = res) => {
        if(code === 10000){
          dispatch(types.UPDATE_HEADER_FLAG, result.headFlag);
        }
      });
  }
};

// 登陆/注册/修改密码弹框控制
export const updateDialogState = function ({ dispatch, state }, oState) {
  dispatch(types.UPDATE_DIALOG_SHOW, oState);
};
