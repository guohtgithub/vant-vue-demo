<template>
  <div>
    <div class="toast" ref="toastPosition" :class="{active:toastHidden}">
      <div class="toast-warpper">
        {{text}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'test-toast',
  data(){
    return{
      text:'',
      toastHidden:false
    }
  },
  created(){

  },
  components:{

  },
  methods:{
    toastPlugin (msg,time){
      this.text = msg
      this.toastHidden = true
      setTimeout(() => {
        this.toastHidden = false
      },time)
    }
  }
}
</script>
<style scoped>
  .toast{
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%,50%);
    width: 200px;
    min-height: 25px;
    text-align: center;
    background: rgba(0,0,0,.7);
    border-radius: 5px;
    color: #fff;
    transition: all 0.5s;
    z-index: -1;
    opacity: 0;
    word-break: break-all;
    padding: 10px 30px;
  }
  .toast.active {
    opacity: 1;
    z-index: 11;
  }
</style>

