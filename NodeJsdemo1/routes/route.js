var express = require('express');

var router = express.Router();

router.get('/hello',function(req,res,next){
	res.render('welcome',{title:'Express'})
})
router.get('/header',function(req,res,next){
	res.render('header',{title:'Express'})
})
router.get('/menu',function(req,res,next){
	res.render('menu',{title:'Express'})
})
router.get('/content',function(req,res,next){
	res.render('content',{title:'Express'})
})
router.get('/footer',function(req,res,next){
	res.render('footer',{title:'Express'})
})
router.get('/employeeManagement',function(req,res,next){
	res.render('employeeManagement',{title:'Express'})
})

router.get('/menuManagement',function(req,res,next){
	res.render('menuManagement',{title:'Express'})
})
module.exports = router;