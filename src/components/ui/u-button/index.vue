<template>
	<div class="btn-area">
		<mp-button v-if="!userInfo" :disabled="disabled" :type="type" :size="size" btnClass="mb15" @click="tap">{{value}}</mp-button>
		<mp-button v-else :disabled="disabled" :type="type" :size="size" btnClass="getInfo" openType="getUserInfo" @getuserinfo="getuserinfo">{{value}}</mp-button>

		
	</div>
</template>
<script type="text/javascript">
import mpButton from 'mpvue-weui/src/button';

export default {
	data(){
		return{

		}
	},
	props: {
		type: {
			type: String,
			default: 'primary'
		},
		value: {
			type: String,
			default: '确定'
		},
		size: {
			type: String,
			default: 'large'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		userInfo: {
			type: Boolean,
			default: false
		}
	},
	components: {
		mpButton
	},
	methods: {
		getuserinfo(res){
			console.log(res)
		},
		tap(){
			this.$emit('click2')
		}
	}
}
</script>
<style lang="less" scoped>
.btn-area{
	width: 90%;
	margin: 0 auto;

}
.mb15{
	width: 80%;

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