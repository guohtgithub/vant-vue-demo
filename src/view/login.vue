<template>
  <div class="login">
    login page
    <upload :options=options @receiveUploadMsg='receiveUploadMsg'></upload>
    
    <div class="add">
      <label for="updatafile">
        <input type="file" id='updatafile'  
          style="display:none" accept="image/*"
          @change="uploadFile($event)"/>
      </label>
      <div class="icon-add" ref="imgqrCode" alt=""></div>
    </div>
    <br>
    <div class="add">
      <label for="updatafile2">
        <input type="file" id='updatafile2'  
          style="display:none" accept="image/*"
          @change="uploadFile2($event,'updatafile2')"/>
      </label>
      <img class="icon-add" :src="imgqrCode2" alt="" />
    </div>
    <br>
    <button @click="getBaseImg('icon-add')">获取base64</button>
  </div>
</template>
<script>
import {uploadfilePromise,getFileURL} from '../util/util'
export default {
  name:"Login",
  data(){
    return{
      options:{
        'showPogress':true,
        'imagePreview':true,
        'url':'str',
        'fileUploadName':'ajax-upload',
        'limitSize':1
      },
      imgqrCode:null,
      baseImg:null,
      imgqrCode2:null,
      qrCode:null
    }
  },
  mounted(){
    this.imgqrCode = this.$refs.imgqrCode
  },
  methods:{
    receiveUploadMsg(msg){
      console.log(msg)
    },
    uploadFile(event) { // 上传文件处理
      this.imgqrCode.innerHTML = ''
      let isImg = (event.target.files[0].type).indexOf('image/') > -1
      if(isImg){
        let img = document.createElement('img')
        this.imgqrCode.appendChild(img)
        let reader = new FileReader()
        reader.onload = function(event){
          img.src = event.target.result
          img.width = '200'
        }
        reader.readAsDataURL(event.target.files[0])
      }else{
        alert('为文件选择一个默认的logo')
      }
    },
    getBaseImg(id){
      let dom = document.querySelector(`.${id}`)
      if(dom.getElementsByTagName('img').length>0){
        this.baseImg = dom.getElementsByTagName('img')[0].src
      }
    },
    uploadFile2(ev,idFile) { // 上传文件处理
      var that = this;
      var filesId = document.getElementById(idFile);
      var url = getFileURL(filesId.files[0]); 
      if(url) {
        uploadfilePromise(filesId.files[0]).then(res =>{
          this.qrCode = res.split('base64,').pop()
        });
          
        this.imgqrCode2 = url;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .login{
    .add{
      display: inline-block;
      text-align: center;
      cursor: pointer;
      outline: none;
      padding-top: 0.1rem;
      position: relative;
      label{
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .icon-add{
        font-size: 0.8rem;
        width: 80px;
        height: 80px;
        color: #61688a;
        line-height: 80px;
        text-align: center;
        transition: .2s;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        background: rgba(48,51,68,1);
      }
    }
  }
</style>

