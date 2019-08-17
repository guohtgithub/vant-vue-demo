<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>显示普通全局变量：<br>{{msgValue}}</p>
    <p>显示普通全局变量：<br>{{url}}</p>
    <ul class="item">
      <li v-for="(item,index) in Arr" 
        :key="index"
        :class="{'hoverbg':index==hoverIndex}"
        @mouseover='hoverIndex = index'
        @mouseout='hoverIndex = -1' >
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      msgValue:process.env.VUE_APP_MSG,
      url:process.env.VUE_APP_URL,
      Arr:['A','B','C','D'],
      hoverIndex:-1
    }
  }
}
</script>
<style scoped>
  .hello{
    text-align: left;
    padding: 0 30px;
  }
  .hello p{
    font-size:30px;
    color: red; 
  }
  .item{
    width: 100%;
    height: 60px;
    padding:0;
  }
  .item li{
    width: 25%;
    height: 100%;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    float: left;
    list-style: none;
  }
  .hoverbg{
    background: #ccc;
    color:#fff;
  }
  .clickbg{
    background: red;
    color: #fff;
  }
</style>
