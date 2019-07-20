<template>
	<div class="container">
		<div class="search-header">
			<u-input @value="getValue"></u-input>
	 		<u-button size='normal' value="搜索" @click2="search"></u-button>
			
		</div>
	 	<div class="item-list" v-for="(item, index) in songlist" :key="index" @tap="player(item.data)">
	 		<div class="item-left">
	 			<!-- <img :src="item.data.albumid | filterSrc" alt=""> -->
	 		</div>
	 		<div class="item-right">
	 			<p>{{item.data.songname}}</p>
	 			<!-- <p>{{item.singer[0].name}}</p> -->
	 		</div>

	 	</div>
	 	<u-button value="提交"></u-button>
	 	 

	</div>
</template>
<script>
// import { XButton } from 'vux'
import uButton from '@/components/ui/u-button';
import uInput from '@/components/ui/u-input';

export default {
	data(){
		return{
			songlist: [],
			playUrl: '',
			value: ''
			
		}
	},
	components: {
		uButton,
		uInput
	},
	filters: {
		filterSrc(res){
			console.log(res, 999)
			// return `http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${res.albumid}_0.jpg`
			return 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_8217_0.jpg'

		}
	},
	computed: {
		// src: {
			// console.log(res, 7777)
			// return  `http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${item.data.albumid}_0.jpg`
			// get(res){
			// 	console.log(res, '螺丝孔')
			// },
			// set(){

			// }
		// }
		
	},
	beforeMount(){
		
	},
	mounted(){
		// this.$jquery.toast("取消操作", "cancel");
		// console.log(App.alert())
	   	 // console.log()
	   	 this.$app.http({url: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923"}).then(res => {
	   	 	console.log(res, 77)
				let {songlist} = res.data;
	   	 	if(res.status == 200){
				console.log(songlist,11)

	   	 		this.songlist = songlist;
	   	 	}
	   	 })
		// 
	},
	methods: {
		getValue(res){
			console.log(res, 'llslsl')
			this.value = res;
		},
		search(){
			
			let url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=${this.value}`
			this.$app.http({url}).then(res => {
	   	 	// console.log(res, 77)
				 
	   	 	if(res.status == 200){
				let matchs = res.data.match(/^[(][.*]*[)]$/);
				console.log(matchs)
				if(matchs){
					// let needData = JSON.parse(matchs)
				}
				 
	   	 		// this.songlist = songlist;
	   	 	}
	   	 })
		},
		src(){
			// return  `http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${res.albumid}_0.jpg`
			return 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_8217_0.jpg'
		},
		 getToken(e){
			 return new Promise((resolve, reject) => {
				let url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=${e.songmid}&filename=C400${e.songmid}.m4a&guid=126548448`
				this.$app.http({url}).then(ok => {
					console.log('token', ok)
					let {vkey} = ok.data.data.items[0];
					if(ok.status == 200){
						 
						resolve([vkey, e])
					}
				})
			 })
			 
		 },
		 player(res){
			 this.getToken(res).then(r => {
				console.log('vkey', r)
				let url = `http://ws.stream.qqmusic.qq.com/C400${r[1].songmid}.m4a?fromtag=0&guid=126548448&vkey=${r[0]}`;
				console.log(url, 'kkk')
				const innerAudioContext = wx.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = url;
				innerAudioContext.onPlay(() => {
				console.log('开始播放')
				})
				innerAudioContext.onError((res) => {
				console.log(res.errMsg)
				console.log(res.errCode)
				})
				 
				 
			 })
		 }

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
	 .search-header{
		 width: 100%;
		 height: 100rpx;
		 display: flex;
		 
	 }
}

</style>
