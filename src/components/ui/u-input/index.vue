<template>
	<div class="btn-area">
		<mp-input confirmType="done"  type="text" placeholder="数据双向绑定" v-model="inputValue" @focus="inputFocus" @input="input"></mp-input>

		
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
</style>