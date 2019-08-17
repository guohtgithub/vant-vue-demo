<template>
  <div class="banner" :style="intStyle">
    <div class="box">
      <ul>
        <li v-for="(item,index) in list" 
         :key="index"
         :style="{background:item.background}"
         :class="index===current? 'active': ''"
         @click="bannerClick(index,item)">{{item.url}}</li>
      </ul>
      <div class="status">
        <span v-for="(item,index) in list" 
          :key="index"
          :class="index === current ? 'active':''"
          @click="changeBanner(index)"
          @mouseleave="startLoop">{{index+1}}</span>
      </div>
      <div class="btn">
        <span class="prev" @click="prev"
          @mouseenter="stopLoop"
          @mouseleave="startLoop">{{left}}</span>
        <span class="next" @click="prev"
          @mouseenter="stopLoop"
          @mouseleave="startLoop">></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'banner',
  data(){
    return{
      current:0,
      timerid:null,
      intStyle:{},
      left:'<'
    }
  },
  props:[
    'list',
    'looptime',
    'height',
    'background',
    'color',
    'fontSize'
  ],
  methods:{
    getArticle(){
      this.$emit('getArticle',this.article)
    },
    changeBanner(index){
      this.$emit('change',this.current)
      this.stopLoop()
      this.current = index
      setTimeout(() => {
        this.startLoop()
      },1000)
    },
    bannerClick(index,item){
      this.$emit('click',index,item)
    },
    prev(){
      if(this.current > 0){
        this.$emit('prev',this.current,this.list)
        this.current--
      }else{
        this.$emit('prev',this.current,this.list)
        this.current = 3
      }
    },
    next(){
      if(this.current < 3){
        this.$emit('prev',this.current,this.list)
        this.current ++ 
      }else{
        this.$emit('prev',this.current,this.list)
        this.current = 0
      }
    },
    startLoop(){
      this.init(4000)
    },
    stopLoop(){
      clearTimeout(this.timerid)
    },
    init(time){
      this.timerid = setInterval(() => {
        this.next()
      },time)
      this.intStyle = {
        width:this.width,
        height:this.height + 'px',
        background:this.background,
        color:this.color
      }
    }
  },
  created(){
    this.init(4000)
  }
}
</script>
<style lang="scss" scoped>
  .banner{
    width: 100%;
    overflow: hidden;
    .box{
      position: relative;
      height: 100%;
      ul{
        height: 100%;
        margin: 0;
        li{
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: 40px;
          color: #fff;
          text-align: center;
          background: red;
          opacity: 0;
          transition: all 1.5s
        }
        .active{
          opacity: 1;
          transition: all 1.5s;
        }
      }
      .status{
        position: absolute;
        bottom:0;
        width: 100%;
        height: 20px;
        text-align: center;
        span{
          display: inline-block;
          height: 10px;
          width: 10px;
          margin:0 5px;
          background: #ccc;
          border-radius:50%;
          color: rgba(51, 51, 51, 0);
          cursor: pointer; 
        }
        span.active{
          color:rgba(255, 255, 255, 0);
          background: blue;
        }
      }
      .btn{
        position: absolute;
        top:50%;
        width: 100%;
        transform: translateY(-50%);
        span{
          display: block;
          height: 40px;
          width: 20px;
          color: #fff;
          line-height: 40px;
          text-align: center;
          // background: rgba(0,0,0,.7);
          cursor:pointer;
        }
        span.prev{
          float: left;
          margin-left: 10px;
        }
        span.next{
          float:right;
          margin-right: 10px;
        }
      }
    }
  }
</style>

