<template>
	<div class="renzheng">
		<div class="rz-notice" v-bind:style="{ display: isno}">
			<p>名片用来鉴别是相关人员，温馨提示：<span @click="hiddenwords">X</span></p>
		</div>
		<van-tabs v-model="active" swipeable>
			<van-tab v-for="(item,index) in navArr" :title="item.name" class="v-tab" :key="index">
				<div v-if="index==0">
					<div class="color-black" style="text-align: center;margin-top: 0.4rem;">请上传本人名片照片</div>
					<div class="rz-picter">
						<img :src="avatar" class="img-avatar">
						<input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
					</div>

					<div class="cuxian"></div>

					<div class="my-content-list">
						<div class="color-black"><span style="margin-right: 0.6rem;">真实姓名:</span><input v-model="yoursname" placeholder="请输入您的真实姓名" /></div>
					</div>
					<div class="my-content-list">
						<div class="color-black"><span style="margin-right: 0.6rem;">手机号码:</span><input type="number" max="11" v-model="yoursphone" placeholder="请输入您的手机号码" /></div>
					</div>
					<div class="yzbtn" @click="submitBtn">
						立即认证
					</div>
				</div>
				<div v-if="index==1">

					<div class="color-black" style="text-align: center;margin-top: 0.4rem;">请上传本人身份证照片</div>
					<div class="rz-picter">
						<img src="../assets/img/showImg1.jpg" />

						<p>上传人像页</p>
					</div>
					<div class="rz-picter">
						<img src="../assets/img/showImg1.jpg" />
						<p>上传国辉页</p>
					</div>
					<div class="cuxian"></div>
					<div class="my-content-list">
						<div class="color-black"><span style="margin-right: 0.6rem;">真实姓名:</span><input placeholder="请输入您的真实姓名" /></div>
					</div>
					<div class="my-content-list">
						<div class="color-black"><span style="margin-right: 0.6rem;">手机号码:</span><input type="number" placeholder="请输入您的手机号码" /></div>
					</div>
					<div class="yzbtn">
						立即认证
					</div>
				</div>
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>

	export default {
		name: 'renzheng',
		data() {
			return {
				yoursname: '',
				yoursphone: '',
				avatar: require('../assets/img/showImg1.jpg'),
				isno: 'block',
				active: 0,
				navArr: [{
						name: "身份认证"
					},
					{
						name: "实名认证"
					}
				],

			}
		},
		methods: {
			hiddenwords() {
				this.isno = 'none'
			},
			submitBtn() {

				if(this.yoursname == '') {
					Toast("请填写你的真实姓名");
					return;
				}
				if(this.yoursphone == '' || this.yoursphone == null) {
					Toast("请填写你的手机号码");
					return;
				}

				if(document.getElementById('uppic').value.length == '') {
					Toast('请上传图片');
					return;
				}
			},
			changeImage(e) {
				var file = e.target.files[0]
				var reader = new FileReader()
				var that = this
				reader.readAsDataURL(file)
				reader.onload = function(e) {
					that.avatar = this.result
				}
			},

		},
		mounted: function() {

		}

	}
</script>

<style>
	.rz-notice {
		padding: 0.2rem 0.3rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background: #F0F5FB;
		color: #28D9EF;
	}
	
	.rz-picter {
		height: 15rem;
		width: 100%;
		margin: 0.3rem auto;
		border: 0.01rem solid #ededed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    position: relative;
    overflow: hidden;
	}
  .rz-picter p{
    margin-bottom: 30px;
  }
	
	.uppic {
		height: 15rem;
		width: 100%;
		margin: 0 auto;
		opacity: 0;
		z-index: 99999;
    position: absolute;
    top: 0;
    left: 0;
	}
	.img-avatar {
		position: absolute;
    top: 0;
    left: 0;
    right: 0;
	}
	/*立即验证*/
	
	.yzbtn {
		width: 90%;
		height: 2.8rem;
		background: #FF6600;
		border-radius: 0.06rem;
		margin: 30px auto;
		text-align: center;
		line-height: 2.8rem;
		color: #FFFFFF
	}
	
	
	/*修改原有tab样式*/
	
	.van-tab {
		color: #A3A3A3!important;
	}
	
	.van-tab--active {
		color: #000!important;
	}
	
	.van-tabs__line {
		background-color: #FF6600!important;
		width: 2.5rem!important;
		text-align: center!important;
		align-items: center;
	}
	
	.van-toast {
		background-color: #FF6600;
		color: #FFFFFF
	}
	
	.my-content-list {
		padding: 0.3rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 0.01rem solid #EDEDED;
	}
  .color-black{
    height: 2rem;
    line-height: 2rem;
  }
  input{
    border: none;
    outline: none;
  }
  img{
    width: 100%;
  }
</style>