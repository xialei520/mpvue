<template>
	
	<div class="container">
		<div class="imgContainer">
			<img v-if="isShow" class="img" :src="userInfo.avatarUrl" alt="">
			<!-- <Button v-else class="getInfo" openType="getUserInfo" @getuserinfo="getUserInfo">点击获取用户信息</Button> -->
			<u-button userInfo="true" value="点击获取用户信息"></u-button>
			
		</div>
		<p class="title" @tap.stop="goList">hello  mpvue</p>
		<p class="btn" @tap.stop="goDetail">开启小程序之旅</p>
	</div>
</template>
<script>

export default {
	data(){
		return{
			userInfo: {},
			isShow: false
		}
	},
	beforeMount(){
		
	},
	mounted(){
		 console.log('mounted')
		 this.getMessage();
		 console.log(this.$app.alert('啦啦啦'))
	},
	methods: {
		getUserInfo(data){
			console.log(data)
			if(data.mp.detail.rawData){
				this.getMessage()
			}else{

			}
		},
		getMessage(){
			wx.getUserInfo({
				success: (data) => {
					this.isShow = true;
					console.log(data, 123)
					this.userInfo = data.userInfo;
				},
				fail: (data) => {
					console.log('获取失败')
					this.isShow = false;

				}
			})
		},
		goDetail(){
			wx.navigateTo({
				url: "/pages/list/main"
			})
		},
		goList(){
			wx.navigateTo({
				url: "/pages/songList/main"
			})
		}

	}
}
</script>
<style>
page{
	background: #8ed145;
}
.imgContainer{

}
.container{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.img{
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
}
.getInfo{
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	font-size: 25rpx;
	text-align: center;
	line-height: 200rpx;
}
</style>
