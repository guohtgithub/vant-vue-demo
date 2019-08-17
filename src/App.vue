<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <count-down></count-down> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data(){
    return {
      include:[]
    }
  },
  watch:{
    $route(to,from){
      if(to.meta.keepAlive){
        !this.include.includes(to.name) && this.include.push(to.name)
      }

      if(from.meta.keepAlive && to.meta.deepth < from.meta.deepth){
        let index = this.include.indexOf(from.name)
        index !== -1 && this.include.splice(index,1)
      }
    }
  }
}
</script>

<style>

</style>
