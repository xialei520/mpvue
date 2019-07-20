<template>
	<div class="container">
	 	<div class="item-list" v-for="(item, index) in imgList" :key="index">
	 		<div class="item-left">
	 			<img :src="item.url" alt="">
	 		</div>
	 		<div class="item-right">
	 			<p>{{item.type}}</p>
	 			<p>{{item.desc}}</p>
	 		</div>

	 	</div>
	 	<u-button value="提交"></u-button>
	 	 

	</div>
</template>
<script>
// import { XButton } from 'vux'
import uButton from '@/components/ui/u-button';
export default {
	data(){
		return{
			imgList: []
		}
	},
	components: {
	   // XButton
	   uButton
	},
	beforeMount(){
		
	},
	mounted(){
		// this.$jquery.toast("取消操作", "cancel");
		// console.log(App.alert())
	   	 // console.log()
	   	 this.$app.http({url: "https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1"}).then(res => {
	   	 	console.log(res, 77)
	   	 	let {error, results} = res.data;
	   	 	if(!error){
	   	 		this.imgList = results;
	   	 	}
	   	 })
		// 
	},
	methods: {
		 

	}
}
</script>
<style lang="less">
.container{
	padding-bottom: 20rpx;
	 .item-list{
	 	width: 100%;
	 	height: 200rpx;
	 	margin-bottom: 20rpx;
	 	display: flex;
	 	.item-left{
	 		width: 200rpx;
	 		height: 200rpx;
	 		margin-left: 20rpx;
	 		img{
	 			width: 100%;
	 			height: 100%;
	 		}
	 	}
	 	.item-right{
	 		display: flex;
	 		flex-direction: column;
	 		justify-content: center;
			p{
				padding-left: 100rpx;
			}
	 	}
	 }
}

</style>
