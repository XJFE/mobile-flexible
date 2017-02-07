<style scoped>

</style>

<template>
    <section>
        <router-view></router-view>
        <!-- demo -->
        <h1>Hello , World!</h1>
    </section>
</template>

<script>
    'use strict';
    import Vue from 'vue';
    import store from './vuex/store'
    export default {
        components: {
        },
        store,
        ready() {
          // 实时监测当前用户是否获取了礼物
          this.$watch('$root.$route.path', function(newValue) {
//            this.$broadcast('router-change', newValue);
            this.getRewardStatus();
          },{immediate: true});
        },
        data() {
          return {
            rewardShow: false,
            rewardData: {
              number: '',
              name: ''
            }
          }
        },
        methods: {
          close() {
            // TODO
          },
          action() {
            // TODO
            this.$router.go({
              name: 'personal'
            });
          },
          // 获取当前用户是否可以获取奖品的状态
          getRewardStatus() {
            // TODO
            let query = {};
            Vue.OneMallHttp().GET(query, Vue.OneMallUrl.common_user_luck_info)
              .then((res) => {
                if(10000 === res.code) {
                  this.rewardShow = true;
                  this.rewardData = res.result;
                }
              })
          }
        }
    }
</script>
