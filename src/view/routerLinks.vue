<template>
  <div class="router-links">
    <p v-for="(item,index) in routerData" :key="index">
      
      <van-button type='primary' class="router-link" v-show="item.name" @click="gotoPath(item.path)">{{item.name}}</van-button>
      <van-button type='primary'  
        v-for="(paths,index) in item.children" 
        v-show="item.children && paths.path != ''"
        :key="index" 
        @click="gotoPath(`${item.path}/${paths.path}`)">{{paths.name}}</van-button>
    </p>
  </div>
</template>
<script>
export default {
  name:'routerLinks',
  data(){
    return{
      routerData:{}
    }
  },
  created(){
    this.routerData = this.$router.options.routes
    console.log(this.routerData,'route--')
  },
  methods:{
    gotoPath(url){
      if(url != '/' || url != '/routerLinks')
        this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
  .router-links{
    .router-link{
      width: 80px;
      padding: 0 ;
    }
  }
</style>
