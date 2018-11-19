var express = require('express');
;
const Server = require('../mgdb.js');
var server = new Server();
var db = require('../dbmysql.js');
var router = express.Router();

// 查询员工信息
router.post('/getAllEmployee', function(req, res, next) {
	server.findByPage('employee', {
		username : {
			$regex : req.body.userName,
			$options : 'i'
		},
		delflg : 0
	},req.body.skip, function(bool, data) {
		console.log(data);
		res.send(data);
	})
});

// 修改密码
router.post('/changePassword', function(req, res, next) {
	console.log(req.session.username);
	console.log(req.body.oldpassword);
	server.find("employee", {
		"username" : req.session.username,
		"password" : req.body.oldpassword
	}, function(bool, result) {

		if (result.length == 1) {
			server.update("employee", {
				"username" : req.session.username
			}, {
				"password" : req.body.newpassword
			}, function(result) {
				if (result == 1) {
					res.send("1");
				} else {
					res.send("0");
				}
			});
		} else {
			res.send("0");
		}
	});
});


// 插入新员工信息
router.post('/insertEmployee', function(req, res, next) {
	server.find('employee', {
		username : req.body.userName,
		delflg : 0
	}, function(bool, data) {
		if (data.length == 0) {
			if (req.body.departmentId == 1) {
				server.insert("employee", [ {
					"username" : req.body.userName,
					"password" : req.body.password,
					"age" : req.body.age,
					"gender" : req.body.gender,
					"isemployee" : "在职",
					"delflg" : 0,
					"department" : {
						"id" : 1,
						"departmentname" : "第一事业部"
					}
				} ], function(bool) {
					if (bool) {
						res.send("1");
					} else {
						res.send("0");
					}
				});
			} else if (req.body.departmentId == 2) {
				server.insert("employee", [ {
					"username" : req.body.userName,
					"password" : req.body.password,
					"age" : req.body.age,
					"gender" : req.body.gender,
					"isemployee" : "在职",
					"delflg" : 0,
					"department" : {
						"id" : 2,
						"departmentname" : "第二事业部"
					}
				} ], function(bool) {
					if (bool) {
						res.send("1");
					} else {
						res.send("0");
					}
				});
			}
		} else {
			res.send("0");
		}
	})

});

// 查询单条用户信息
router.post('/showEmployee', function(req, res, next) {
	server.find("employee", {
		"username" : req.body.username
	}, function(bool, result) {
		res.send(result);
	});

});
// 修改员工信息
router.post('/updateEmployee', function(req, res, next) {
	if (req.body.departmentId == 1) {
		server.update("employee", {
			"username" : req.body.uName,
			"delflg" : 0
		}, {
			"gender" : req.body.gender,
			"age" : req.body.age,
			"isemployee" : req.body.isEmployee,
			"department" : {
				"id" : 1,
				"departmentname" : "第一事业部"
			}
		}, function(bool) {
			if (bool == 1) {
				res.send("1");
			} else {
				res.send("0");
			}
		});
	} else {
		server.update("employee", {
			"username" : req.body.uName,
			"delflg" : 0
		}, {
			"gender" : req.body.gender,
			"age" : req.body.age,
			"isemployee" : req.body.isEmployee,
			"department" : {
				"id" : 2,
				"departmentname" : "第二事业部"
			}
		}, function(bool) {
			if (bool == 1) {
				res.send("1");
			} else {
				res.send("0");
			}
		});
	}

});
// 删除用户
router.post('/deleteEmployee', function(req, res, next) {
	server.update("employee", {
		"username" : req.body.username
	}, {
		delflg : 1
	}, function(bool) {
		if (bool == 1) {
			res.send("1");
		} else {
			res.send("0");
		}
	});
});

module.exports = router;
