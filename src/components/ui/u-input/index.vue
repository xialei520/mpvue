<template>
	<div class="btn-area">
		<mp-input ref="input"  confirmType="done"  type="text" :placeholder="placeholder" v-model="inputValue" @focus="inputFocus" @blur="inputBlur" @input="input"></mp-input>

		
	</div>
</template>
<script type="text/javascript">
import mpInput from 'mpvue-weui/src/input';

export default {
	data(){
		return{
            inputValue: ''
		}
	},
	props: {
		placeholder: {
			type: String,
			default: '请输入关键词'
		}
	},
	components: {
		mpInput
	},
	methods: {
		confirm(res){
            console.log(res)
        },
        input(){
            
            this.$emit('value', this.inputValue)
			 
		},
		inputFocus(){
			this.placeholder= ''
		},
		inputBlur(){

		},
		blur(){
			this.$refs.input.blur();
		}
	}
}
</script>
<style lang="less">
.weui-input{
	border: 3rpx solid #1AAD19 ;
	height: 90rpx;
	width: 500rpx;

}
</style>

<style lang="less" scoped>
.btn-area{
	
	margin-left: 40rpx;
	margin-right: 20rpx;
	// margin-top: 20rpx;
	margin-bottom: 20rpx;
	// overflow: hidden;

}

</style>