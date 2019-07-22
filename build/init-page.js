const readline = require('readline');
const program = require('commander');
const path = require("path");
const copyFile = require('copy-template-dir');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

program.option('-p, --path <string>', 'input path').parse(process.argv);

const paths = program.path;

const srcPath = path.join(process.cwd(), 'template');
const desPath = path.join(process.cwd(), `src/pages/${paths}`)
//path.join(process.cwd()) 命令执行所在的文件夹路径
//path.join(__dirname) 该文件所在的文件夹路径

console.log(srcPath, desPath)

rl.question('传入参数',(answer) => {
	copyFile(srcPath, desPath, {title: answer}, (err, results) => {
		if(!err){
			console.log('create success! ');
			return;
		}
	})
  rl.close()
})