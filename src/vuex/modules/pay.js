'use strict';

import {BUY_GOODS} from '../mutation-types';

const state = {
  taoBi: 0
};

const mutations = {
  //淘币
  [BUY_GOODS] (state, num) {
    state.taoBi = num
  }
};



export default {
  state,
  mutations
}
