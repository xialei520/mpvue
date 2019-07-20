
const App= getApp();
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly

let obj = {
	alert(str){
		console.log(str)
	},
	http(opts){
		const opt = {
			url: ''
		}
		opts = Object.assign(opt, opts);

		return new Promise((resolve, reject) => {
			fly.get(opts.url, opts).then((d)=>{
		      //输出请求数据
		      // console.log(d.data)
		      //输出响应头
		      // console.log(d.header)
		      resolve(d)
		    }).catch(err=>{
		      // console.log(err.status,err.message)
		      resolve(d)
		    })
		})
		
	}
}
Object.assign(App, obj)