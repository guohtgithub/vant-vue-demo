<template>
  <div class='am-payPwd' :id="`ids_${id}`">
    <input type="password"
      readonly
      onfocus="this.removeAttribute('readonly');"
      maxlength="1"
      autocomplete="new-password"
      @input="changeInput"
      @click="changePwd"
      v-model="pwdList[i]"
      @keyup="keyUp($event)"
      @keydown="oldPwdList = pwdList.length"
      class="shortInput"
      v-for="(v, i) in 6" :key="i">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pwdList: [],
        oldPwdList: [],
        isDelete: false,
        ipt: ''
      }
    },
    props: {
      id: String, // 当一个页面有多个密码输入框时，用id来区分
      default: '1'
    },
    mounted () {
      this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
    },
    methods:{
      keyUp (ev) {
        let index = this.pwdList.length
        if (!index) return
        if (ev.keyCode === 8) {
          this.isDelete = true
          if (this.oldPwdList === this.pwdList.length) {
            if (index === this.pwdList.length) {
              this.pwdList.pop()
            }
            index--
          } else {
            index > 0 && index--
          }
          this.ipt[index].focus()
        } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
          this.isDelete = false
          this.pwdList.pop()
          this.pwdList.push(ev.key)
          this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
        }
        if(this.pwdList.length<6){
          console.log('-----')
        }else{
          this.$emit('getPwd', this.pwdList.join(''))
          setTimeout(()=>{
            this.$router.push('/home')
          },2500)
        }
      },
      changePwd () {
        let index = this.pwdList.length
        index === 6 && index--
        this.ipt[index].focus()
      },
      changeInput () {
        let index = this.pwdList.length
        let val = this.pwdList[index - 1]
        if (!/[0-9]/.test(val)) {
          this.pwdList.pop()
          return
        }
        if (!val) {
          this.pwdList.pop()
          index--
          if (index > 0) this.ipt[index - 1].focus()
        } else {
          if (index < 6) this.ipt[index].focus()
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .am-payPwd {
    display: inline-block;
    border-radius: 5px;
    position: relative;
    width: 96%;
    margin: 60px 2% 0;
    display: flex;
    overflow: hidden;
    .shortInput {
      width: 16.5%;
      text-align: center;
      font-size: 60px;
      height: 50px;
      color: #333;
      outline: #ff0067;
      border: 1px solid #ccc;
      border-right: none;
      &:last-child{
        border-right: 1px solid #ccc;
      }
    }
  }
</style>