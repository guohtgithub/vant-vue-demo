<template>
  <div class="key-board">
    <van-button @touchstart.stop='show = true' type='primary'>vant button</van-button>
    <!-- 默认 -->
    <van-number-keyboard
      v-model="value"
      :show='!show'
      extra-key='.'
      close-button-text='完成'
      @blur="show = !show"
      @input="onInput"
      @delete='onDelete'
    />
    <!-- 自定义 -->
    <van-number-keyboard 
      v-model="valuedefault"
      :show="show"
      theme='custom'
      close-button-text='完成'
      @blur="show =!show"
      @input="onInput"
      @delete='onDelete'
    />
    <van-field 
      clearable=clearable
      label="默认输入"
      :value='value'
      placeholder="默认"
      @touchstart.native.stop='show = !show'
      @clear='onClear'
    />

    <van-field 
      readonly
      clickable
      :value='valuedefault'
      placeholder="自定义"
      @touchstart.native.stop='show = !show'
    />

  </div>
</template>
<script>
import {Toast} from 'vant'
export default {
  name:'keyBoard',
  data(){
    return{
      show:false,
      value:'',
      valuedefault:'',
      clearable:true
    }
  },
  methods:{
    onInput(value){
     Toast(value)
    },
    onDelete(){
      Toast('delete')
    },
    onClear(){
      this.value = ''
    }
  }
}
</script>
