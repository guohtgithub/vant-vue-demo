<template>
  <div class="test-vue">
    <!-- tab -->
    <tab 
      :tabList='tabList'
      :tabIndex="tabIndex"
      @changeTab='changeTab'
    >
      <div class="tab-sele">
        {{info}}
      </div>
    </tab>
    <!-- 密码输入框 -->
    <van-password-input
     class="psd"
     :value='value'
     info='密码为6位数字'
     @focus="showKeyboard= true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show='showKeyboard'
      @input="onInput"
      @delete='onDelete'
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import Tab from './tab'
export default {
  name:'testVue',
  components:{
    Tab,
  },
  data(){
    return{
      tabIndex:0,
      tabList:[
        {
          index:0,
          name:'徐州'
        },{
          index:1,
          name:'深圳'
        }
      ],
      info:'徐州',
      value:'',
      showKeyboard:true
    }
  },
  methods:{
    changeTab(tab){
      this.info = tab.name
      // console.log(tab)
    },
    onInput(key){
      this.value = (this.value + key).slice(0,6)
    },
    onDelete(){
      this.value = this.value.slice(0,this.value.length-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .test-vue{
    .psd{
      margin-top: 30px;
    }
  }
</style>
