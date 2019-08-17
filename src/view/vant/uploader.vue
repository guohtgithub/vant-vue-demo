<template>
  <div class="uploader">
    <van-uploader 
      :after-read='afterRead'
      v-model="fileList"
    >
      <slot>上传图片</slot>
    </van-uploader>
  </div>
</template>
<script>
export default {
  name:'Uploader',
  data(){
    return{
      fileList:[]
    }
  },
  methods:{
    afterRead(file){
      console.log(file,'uploader')
    }
  }
}
</script>
