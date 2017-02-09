<template>
  asd
  <br>
  <input type="button" name="" value="登陆" @click.stop="showLogin">
</template>

<style lang="scss" scoped>

</style>

<script>
  'use strict';
  export default {
      methods: {
        showLogin(){
          this.$parent.$broadcast('forbidden');
        }
      }
  };
</script>
