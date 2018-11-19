var express = require('express');

var db = require('../dbmysql.js');
const Server=require('../mgdb.js');
var server=new Server();
var router = express.Router();
	
//server.insert("employee",[{"username":"lhh","password":"123","age":22,"gender":"男","isemployee":"在职","delflg":0,"department":{"id":2,"departmentname":"第二事业部"}}],function(bool){		
//	
//});


/* GET home page. */
router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Express' });
});

//验证登录
router.post('/checkout', function(req, res, next) {
	server.find("employee",{"username":req.body.username,"password":req.body.password},function(bool,result){		
		if(result.length==1){
			req.session.username=result[0].username;
			res.send("1");
		}
		else{
			res.send("0");
		}
	});		
	
});

module.exports = router;
