/**
 * Created by litian on 16/8/23.
 */
'use strict';

import {UPDATE_TAOBI,SET_ADDRESS_LIST} from '../mutation-types';

const state = {
    taobi: 0,
    address_list: new Map()
};

const mutations = {
    //淘币
    [UPDATE_TAOBI] (state, num) {
        state.taobi = num
    },
    //收货地址
    [SET_ADDRESS_LIST] (state,list){
        list.map((item)=>{
           state.address_list.set(item.id,item);
        });
    }
};



export default {
    state,
    mutations
}
