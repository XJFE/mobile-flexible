/**
 * Created by dreamapple
 */
'use strict';

import {UPDATE_REVIEW_STATUS} from '../mutation-types';
import {UPDATE_REWARD_STATUS} from '../mutation-types';

const state = {
  show: false,
  rewardShow: true
};

const mutations = {
  //淘币
  [UPDATE_REVIEW_STATUS] (state, status) {
    state.show = status;
  },
  // 礼物状态
  [UPDATE_REWARD_STATUS] (state, status) {
    state.rewardShow = status;
  }
};



export default {
  state,
  mutations
}
