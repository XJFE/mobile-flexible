'use strict';

import * as types from '../mutation-types';

const state = {
  showFlag: null
};

const mutations = {

  // 修改app头部是否显示
  [types.UPDATE_HEADER_FLAG] (state, bFlag) {
    state.showFlag = bFlag;
  }

};

export default {
  state,
  mutations
}
