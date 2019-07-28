<template>
	
	<div class="container">
		<div class="imgContainer">
			<img v-if="isShow" class="img" :src="userInfo.avatarUrl" alt="">
			<Button v-else class="getInfo" openType="getUserInfo" @getuserinfo="getUserInfo">点击获取用户信息</Button>
			<!-- <u-button v-else class="getInfo" userInfo="true" value="点击获取用户信息"></u-button> -->
			
		</div>
		<!-- <p class="title" @tap.stop="goList">hello  mpvue</p> -->
		<!-- <p class="btn" @tap.stop="goDetail">开启小程序之旅</p> -->
		<div class="btn-area">
			<u-button size="large" @click2="goList"  value="音乐搜索"></u-button>
		 
			<u-button size="large" @click2="goDetail"  value="image show"></u-button>
			<u-button size="large" @click2="login"  value="登陆"></u-button>
			<u-button size="large" @click2="test"  value="test"></u-button>
			
		</div>
		


	</div>
</template>
<script>
import uButton from '@/components/ui/u-button';

export default {
	data(){
		return{
			userInfo: {},
			isShow: false
		}
	},
	components: {
		uButton
	},
	beforeMount(){
		
	},
	mounted(){
		 console.log('mounted')
		 this.getMessage();
		this.checkSession();
		 console.log(this.$window.alert('啦啦啦'))
	},
	methods: {
		//检测登陆是否过期
		
		checkSession(){
			let _this = this;
			wx.checkSession({
				success () {
					//session_key 未过期，并且在本生命周期一直有效
				},
				fail () {
					// session_key 已经失效，需要重新执行登录流程
					_this.login() //重新登录
				}
			})
		},
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
		},
		login(){
			console.log('123')
			let _this = this;
			wx.login({
				success (res) {
					if (res.code) {
						//发起网络请求
						console.log(res, 99)
						_this.$window.http({
							url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx39268561e231bae4&secret=2c09270fa7ae70347256d15911004c47&js_code=${res.code}&grant_type=authorization_code`
						}).then(r => {
							console.log(r, '看看看')
							let {openid, session_key} = r.data;
							//分发action修改状态
							_this.$store.dispatch('getLogin', {openid, session_key});
							var login = _this.$store.getters.getLogin;
							console.log(login , '====')
							wx.showToast({
								title: '成功',
								icon: 'success',
								duration: 2000
							})
						})
					 
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			})
		},
		test(){
			this.$window.http({
				url: 'http://www.loveinmymind.xyz:8080/test'
			}).then(r => {
				console.log('api CESHI', r)
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
	margin-top: 100rpx;
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
.btn-area{
	width: 100%;
	height: 400rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-top: 200rpx;
}
</style>
