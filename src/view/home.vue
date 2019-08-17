<template>
  <div class="home">
    <banner-bar 
      :list='list'
      :looptime='looptime'
      :width='width'
      :height='height'
      :background='background'
      :color='color'
      :fontSize='fontSize'
      @next='next'
      @prev='prev'
      @change='changeBanner'
      @click="bannerClick"
    ></banner-bar>
    <!-- <notify-bar></notify-bar> -->
    <div class="touch" 
      @touchstart.capture='touchstart'
      @touchend.capture='touchend'
    >
      滑动demo touchstart touchend
    </div>
    <div class="touch" 
      v-swipeleft='{fn:left,param:"left"}'
      v-swiperight='{fn:right,param:"right"}'
    >
      滑动demo
      v-swipeleft
      v-swiperight
    </div>
    <router-link to='/vantTest/keyBoard'>links</router-link>
    <img src="../assets/img/img.jpg" alt="" @click="goNotice()">
    <div class="input-label">
      <div>银行卡号</div>
      <input type="text" @keydown="bankkey" v-model="bandNum" placeholder="请输入银行卡号">
    </div>
    <div class="input-label">
      <div>预留手机号</div>
      <input type="text" @keydown="phoneKey" v-model="phone" pattern="\d*" placeholder="请输入银行预留手机号">
    </div>
    <div class="input-label">
      <div>预留手机号</div>
      <input type="text" class="phone" @keydown="formatCardNumber(phone2)" v-model="phone2" pattern="\d*" placeholder="请输入银行预留手机号">
    </div>
    <router-view />
  </div>
</template>
<script>
import bannerBar from '@components/common/banner'
// import anotherPay from '@components/common/another-pay'
import notifyBar from '@view/home/notify'
// import '../util/vue-touch.js'
import '../util/other-touch.js'
export default {
  name:'Home',
  data(){
    return{
      looptime:4000,
      width:'100%',
      height:200,
      background:'red',
      color:'#fff',
      fontSize:'70px',
      list:[
        {
          id:1,
          text:'1',
          url:'http1',
          background:'red',
        },
        {
          id:2,
          text:'2',
          url:'http2',
          background:'blue',
        },
        {
          id:3,
          text:'3',
          url:'http3',
          background:'gray',
        },
        {
          id:4,
          text:'4',
          url:'http4',
          background:'yellow',
        }
      ],
      bandNum:'',
      phone:'',
      phone2:'',
      cardForm:{}
    }
  },
  components:{
    bannerBar,
    notifyBar,
    // anotherPay
  },
  created(){
   console.log(this.$router,'---')
  },
  methods:{
    prev(index,list){
      // console.log('prev',index)
    },
    next(index,list){
      // console.log('next',index)
    },
    changeBanner(index){
      // console.log('change',index)
    },
    bannerClick(index,item){
      // console.log('click',index,item)
    },
    left(s,e){
      console.log('00000')
      console.log(s)
    },
    right(s,e){
      console.log('00000')
      console.log(s)
    },
    touchstart(e){
      console.log(e.touches[0].clientX)
    },
    touchend(e){
      console.log(e.changedTouches[0].clientX)
    },
    goNotice(){
      this.$router.push('/home/notify')
    },
    bankkey(e){
      let phoneNum = this.bandNum.trim()
      console.log(phoneNum,'----')
      // if(e.keyCode === 8){
      //   this.bandNum = phoneNum
      //   return
      // }
      
      let len = phoneNum.length
      if(len === 4 || len === 9 || len === 14 || len === 19){
        phoneNum += ' '
        this.bandNum = phoneNum
      }
    },
    phoneKey(e){
      let phoneNum = this.phone.trim();
      if(e.keyCode === 9){
        this.phone = phoneNum
        return
      }
      let len = phoneNum.length
      if(len === 3 || len === 8){
        phoneNum += ' '
        this.phone = phoneNum
      }
    },
    setNum(data,index){
      data.forEach((ele,i) => {
        ele.acount = ele.acount.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ')
        this.$set(ele,'acount',ele.acount)
      })
    },
    // 格式化卡號顯示，每4位加-
    formatCardNumber (cardNum) {
      // 获取input的dom对象，这里因为用的是element ui的input，所以需要这样拿到
      const input = document.querySelector('.phone')
      // 获取当前光标的位置
      const cursorIndex = input.selectionStart
      // 字符串中光标之前-的个数
      const lineNumOfCursorLeft = (cardNum.slice(0, cursorIndex).match(/-/g) || []).length
      // 去掉所有-的字符串
      const noLine = cardNum.replace(/-/g, '')
      // 去除格式不对的字符并重新插入-的字符串
      const newCardNum = noLine.replace(/\D+/g, '').replace(/(\d{4})/g, '$1-').replace(/-$/, '')
      // 改后字符串中原光标之前-的个数
      const newLineNumOfCursorLeft = (newCardNum.slice(0, cursorIndex).match(/-/g) || []).length
      // 光标在改后字符串中应在的位置
      const newCursorIndex = cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft
      // 赋新值，nextTick保证-不能手动输入或删除，只能按照规则自动填入
      this.$nextTick(() => {
        this.cardForm = newCardNum
        // 修正光标位置，nextTick保证在渲染新值后定位光标
        this.$nextTick(() => {
          // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置
          input.selectionStart = newCursorIndex
          input.selectionEnd = newCursorIndex
        })
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .home{
    .touch{
      width: 100%;
      height: 150px;
      background: #f3f3f3;
      margin-top: 20px;
    }
    img{
      width: 100%;
      margin-top: 10px;
    }
    .input-label{
      padding: .5rem .3rem;
      input{
        width: 100%;
        height: 2.5rem;
        line-height: 1.5rem;
        border: none;
        border-bottom: 1px solid #ccc;
        outline:none
      }
    }
  }
</style>

