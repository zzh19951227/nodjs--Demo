var express = require('express');
var db = require('../dbmysql.js');
const Server=require('../mgdb.js');
var server=new Server();
var router = express.Router();
//获取菜单
router.post('/getMenu',function(req,res,next){
	server.findall("menu",function(bool,result){
		if(bool){			
			res.send(result);
		}
		else{
			console.log("失败！")
		}
	});	
	
})
//获取用户名
router.post('/getUserName',function(req,res,next){
	res.send(req.session.username);
})
//注销
router.post('/logout',function(req,res,next){
	req.session.username=null;
	res.send("1");
})
module.exports = router;