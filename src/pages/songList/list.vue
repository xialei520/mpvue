<template>
	<div class="container">
		<div class="search-header">
			<u-input ref="inputBlur" @value="getValue"></u-input>
	 		<u-button size='small' value="搜索" @click2="search"></u-button>
			
		</div>
	 	<div class="item-list" :class="{'list-background':ind === index}" v-for="(item, index) in songlist" :key="index" @tap="ind = index; player(item)">
	 		<div class="item-left">
	 			<img src="http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_8217_0.jpg" alt="">
	 		</div>
	 		<div class="item-right">
	 			<p>{{item.songname}}</p>
	 			<p>{{item.singer[0].name}}</p>
	 		</div>

	 	</div>
	 	<!-- <u-button value="提交"></u-button> -->
	 	 

	</div>
</template>
<script>
// import { XButton } from 'vux'
import uButton from '@/components/ui/u-button';
import uInput from '@/components/ui/u-input';
const innerAudioContext = wx.createInnerAudioContext()
export default {
	data(){
		return{
			songlist: [],
			playUrl: '',
			value: '',
			ind: ''
			
		}
	},
	components: {
		uButton,
		uInput
	},
	filters: {
		filterSrc(){
			// console.log(res, 999)
			// return `http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${res.albumid}_0.jpg`
			return 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_8217_0.jpg'
		}
	},
	computed: {
		src(){
			return 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_8217_0.jpg'
			 
		}
		
	},
	beforeMount(){
		
	},
	mounted(){
		// this.$jquery.toast("取消操作", "cancel");
		// console.log(App.alert())
	   	 // console.log()
	   	//  this.$app.http({url: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923"}).then(res => {
	   	//  	console.log(res, 77)
		// 		let {songlist} = res.data;
	   	//  	if(res.status == 200){
		// 		console.log(songlist,11)

	   	//  		this.songlist = songlist;
	   	//  	}
	   	//  })
		// 
	},
	methods: {
		getValue(res){
			console.log(res, 'llslsl')
			this.value = res;
			this.search()
		},
		search(){
			this.$refs.inputBlur.blur()
			let url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=${this.value}`
			this.$app.http({url}).then(res => {
	   	 	// console.log(res, 77)
				 
	   	 	if(res.status == 200){
				let data = res.data.substring(9, res.data.length-1)
				console.log(JSON.parse(data).data.song.list)
				 
	   	 		this.songlist = JSON.parse(data).data.song.list;
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
			// innerAudioContext.destroy()
			innerAudioContext.pause()
			

			this.getToken(res).then(r => {

				console.log('vkey', r)
				let url = `http://ws.stream.qqmusic.qq.com/C400${r[1].songmid}.m4a?fromtag=0&guid=126548448&vkey=${r[0]}`;
				console.log(url, 'kkk')
				// const innerAudioContext = wx.createInnerAudioContext()

				// innerAudioContext.stop()
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
		//  border: 1px solid red;
		 margin-top: 20rpx;
		 align-items: center;
		 
	 }
	 .list-background{
		 background: #1AAD19;
	 }
}

</style>
