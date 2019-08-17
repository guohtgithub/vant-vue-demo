<template>
  <div>
    <div class="upload-img">
      <h1>选择图片</h1>
      <ul class="load-list">
        <li  v-for="(item,index) in imgArr" :key="index">
          <div class="load-container">
            <img :src="item">
            <span @click="delImg(index)"><i class="iconfont">&#xe674;</i></span>
          </div>
        </li>
        <li class="img-upload" v-if="allowAddImg">
          <div class="only-add">
            <div class="load-add" @click="upload()">
              <i class="iconfont">&#xe690;</i>
              <input type="file" accept="image/*" multiple="multiple" style="display: none" @change="changeImg($event)"
                     ref="uploadImages">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "uploadimg",
    data() {
      return {
        imgArr: [],        // 存放临时图片的数组
        allowAddImg: true,   // 上传达到限制后隐藏上传按钮
        imgData: '',        
        imgSrc: ''
      }
    },
    methods: {
      upload () {
          // 调起input选择框
        this.$refs.uploadImages.click()
      },
      changeImg(e) {
        var _this = this;
        var imgLimit = 1024;
        var files = e.target.files;
        var image = new Image();
        if (files.length > 0) {
          var dd = 0;
          var timer = setInterval(function () {
            if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
              return false;
            }

            if (files.item(dd).size > imgLimit * 102400) {
              //to do sth
            } else {
              image.src = window.URL.createObjectURL(files.item(dd));
              image.onload = function () {
                // 默认按比例压缩
                var w = image.width,
                  h = image.height,
                  scale = w / h;
                w = 200;
                h = w / scale;
                // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
                var quality = 0.7;
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(image, 0, 0, w, h);
                var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                var base64 = canvas.toDataURL("image/" + ext, quality);
                // 回调函数返回base64的值
                if (_this.imgArr.length <= 4) {
                  _this.imgArr.push('');
                  _this.imgArr.splice(-1, 1, base64);//替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                  if (_this.imgArr.length >= 5) {
                    _this.allowAddImg = false;
                  }
                }
              }
            }

            if (dd < files.length - 1) {
              dd++;
            } else {
              clearInterval(timer);
            }
          }, 1000)

        }
      },
      // 删除图片
      delImg (n) {
        this.imgArr.splice(n,1);
        if(this.imgArr.length<5){
          this.allowAddImg = true;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .upload-img{
    margin-top:50px;
    h1{
      padding-left: 20px;
    } 
    .load-list{
      display: flex;
      flex-flow: row wrap;
      padding: 0 15px;
      li{
        height: 100px;
        flex: 0 0 33.3%;
        margin-top: 15px;
        position: relative;
        display: flex;
        align-items: center;
        span{
          display: block;
          width: 20px;
          height: 20px;
          background: gray;
          border-radius: 50%;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          position: absolute;
          right: 2px;
          top: 2px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .img-upload{
        flex: 0 0 31%;
        margin-right: auto;
        margin-top: 15px;
        .load-add{
          width: 50%;
          height: 60%;
          background: #fff;
          border-radius: 50px;
          margin: 15px auto 0;
          text-align: center;
          line-height: 60px;
          font-size: 20px;
        }
      }
      .load-container,.only-add{
        width: 90%;
        height: 90%;
        margin: auto;
        background:#f7f7f7;
      }
    }
  }
</style>
