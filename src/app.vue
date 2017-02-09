<style lang="scss" scoped>
  .selector {
    margin: 0 auto;
    width: 150px; /*px*/
    height: 64px; /*px*/
    font-size: 28px; /*px*/
    border: 1px solid #ddd; /*no*/
    background-color: red;
  }
</style>

<template>
    <section>
        <router-view></router-view>
        <!-- demo -->
        <h1>Hello , World!</h1>
        <div class="selector">1</div>
        <login></login>
        <register></register>
        <set-pwd></set-pwd>
    </section>
</template>

<script>
    'use strict';
    import Vue from 'vue';
    import store from './vuex/store'
    import Login from './components/account/login.commponent';
    import Register from './components/account/register.commponent';
    import SetPwd from './components/account/setPwd.commponent';
    export default {
        components: {
          Login,
          Register,
          SetPwd
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
