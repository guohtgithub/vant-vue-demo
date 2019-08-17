<template>
  <div class="tab">
    <div class="tabs-tab"
      v-for="tab in tabList"
      :key="tab.index"
      :class="[index == tab.index ? 'tabs-active':'']"
      @click="changeTab(tab)"
     >
     {{tab.name}}
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:'tab',
  props:{
    tabList:Array,
    tabIndex:Number
  },
  data(){
    return{
      index:null
    }
  },
  created(){
    this.index = this.tabIndex
  },
  methods:{
    changeTab(tab){
      this.index = tab.index
      this.$emit('changeTab',tab)
    }
  }
}
</script>
<style lang="scss" scoped>
  .tab{
    font-size: 14px;
    color:#444;
    .tabs-tab{
      min-width: 110px;
      padding:5px 0;
      position: relative;
      display: inline-block;
      text-align: center;
      cursor: pointer;
    }
    .tabs-active{
      background: #444;
      color: #fff;
    }
    .tabs-content{
      margin-top: 20px;
      padding:0 20px 30px;
      border: 1px solid #f0f0f0;
    }
  }
</style>
