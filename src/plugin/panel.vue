<template>
  <div class="panel">
    <div class="number-panel">
      <p class="number-show" v-show="checkNumber.length>0">{{checkNumber}}</p>
      <p class="number-show" v-show="!checkNumber"> </p>
      <ul>
        <li v-for="index in 9" 
          :key="index"
          @click="clickThisNumber($event)">
          {{index}}
        </li>
        <li class="write">0</li>
        <li @click="clickThisNumber($event)">0</li>
        <li class="write">0</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name:'test-panel',
    data(){
      return{
        checkNumber:''
      }
    },
    methods:{
      clickThisNumber(e){
        if(this.checkNumber.length < 10){
          this.checkNumber = this.checkNumber.concat(e.currentTarget.innerText)
          this.$emit('getNumber',this.checkNumber)
        }
      }
    }
  }
</script>
<style scoped>
  .number-show{
    height: 48px;
  }
  .number-panel ul li{
    display: inline-block;
    width: 33.22222%;
    height: 80px;
    line-height: 80px;
    background: #ddd;
    text-align: center;
    border-bottom: 1px solid #fff;
  }
  li:nth-child(n){
    border-right: 1px solid #fff;
  }
  li:nth-child(3n){
    border-right: none;
  }
  .write{
    opacity: 0;
  }
  li:nth-child(11){
    border-bottom:none !important; 
  }
</style>


