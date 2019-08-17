<template>
  <div class="notify">
    广告位
    <button @click="getChildrenFunction">点击触发子组件的toast</button>
    <div class="input" @click="inputNum">
      <input type="text" v-model="panelVal" disabled>
    </div>
    <test-panel ref="panel" class="not-panel" @getNumber='getNumber' v-show="showPanel"></test-panel>
    <test-toast ref="toast"></test-toast>
    <pay :id="'1'" @getPwd='getPwd'></pay>
    <another-pay></another-pay>
  </div>
</template>
<script>
import Pay from '@components/common/pay'
import anotherPay from '@components/common/another-pay'
import {Trim} from '../../util/util'
export default {
  name:'Notify',
  data(){
    return{
      testArr:[1,2,3],
      panelVal:'',
      showPanel:false
    }
  },
  components:{
    Pay,
    anotherPay
  },
  created(){
    console.log(this.$msg,'plugin')
    console.log(this.$myMethod(this.testArr),'method')
    this.$nextTick(()=>{
      console.log(this.$refs.panel.$el,'panel')
    })
  },
  methods:{
    getChildrenFunction(){
      this.$nextTick(()=>{
        this.$refs.toast.toastPlugin('guoht,dkkkskj,28',2500)
      })
    },
    getNumber(val){
      if(Trim(val,'g').length < 10){
        this.panelVal = Trim(val,'g')
      }else{
        this.inputNum()
      }
    },
    inputNum(){
      this.showPanel = !this.showPanel
    },
    getPwd(msg){
      console.log(msg,'pay')
      // this.msg = msg
    }
  }
}
</script>
<style scoped >
  .not-panel{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>

