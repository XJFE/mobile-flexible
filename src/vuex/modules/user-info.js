'use strict';

import * as types from '../mutation-types';

const state = {
  'userId': '',
  'username': '',
  'avatar': '/static/images/tao-you/personal-center/default-head.png',
  'bindPhone': '',
  'taoBi': 0,
  'taoDou': 0,
  'isCanUpdateName': 0,
  'isShowSoreExchange': 0
};

const mutations = {

  // 修改用户信息
  [types.UPDATE_USERINFO] (state, oUser) {
    Object.assign(state, oUser);
  },
  [types.UPDATE_USERIMG] (state, newImgUrl) {
    state.avatar=newImgUrl
  }

};

export default {
  state,
  mutations
}
