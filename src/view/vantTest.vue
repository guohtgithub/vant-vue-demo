<template>
  <div class="vant-test">
    <!-- <van-button type='primary'>tab</van-button> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name:'vantTest',
  data(){
    return{
      routerData:{}
    }
  },
  created(){
    // console.log(this.$router)
  }
}
</script>

<style lang="scss" scoped>
  
</style>
