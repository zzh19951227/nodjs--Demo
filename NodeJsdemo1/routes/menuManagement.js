var express = require('express');
var db = require('../dbmysql.js');
const Server = require('../mgdb.js');
var server = new Server();
var router = express.Router();

//模糊查询菜单信息
router.post('/getAllMenu', function(req, res, next) {
	server.findByPage('menu', {
		menuname : {
			$regex : req.body.menuName,
			$options : 'i'
		},
		delflg : 0
	},req.body.skip, function(bool, data) {
		console.log(data);
		res.send(data);
	})
});


//查询单条菜单信息
router.post('/getMenuInfo',function(req,res,next){
	server.find("menu", {
		"menuname" : req.body.menuname
	}, function(bool, result) {
		res.send(result);
	});
});

//修改菜单信息
router.post('/updateMenuInfo',function(req,res,next){
	server.update("menu", {
		"menuname" : req.body.mName,
		"delflg":0
	},
	{
		"menuname":req.body.menuname,		
	},
	function(bool) {
		if(bool==1){
			res.send("1");
		}
		else{
			res.send("0");
		}
	});
});

//增加菜单
router.post('/insertMenuInfo',function(req,res,next){
	server.find('menu', {
		menuname : req.body.menuName,
		delflg : 0
	}, function(bool, data) {
		if (data.length == 0) {			
				server.insert("menu", [ {
					"menuname" : req.body.menuName,
					"menuurl" : req.body.menuUrl,
					"menuicon" : "glyphicon glyphicon-folder-close",
					"delflg" : 0,
					
				} ], function(bool) {
					if (bool) {
						res.send("1");
					} else {
						res.send("0");
					}
				});
		} else {
			res.send("0");
		}
	})
});
//删除菜单
router.post('/deleteMenu', function(req, res, next) {
	server.update("menu", {
		"menuname" : req.body.menuname
	},
	{
		delflg:1
	},
	function(bool) {
		if(bool==1){
			res.send("1");
		}
		else{
			res.send("0");
		}
	});
});

module.exports = router;