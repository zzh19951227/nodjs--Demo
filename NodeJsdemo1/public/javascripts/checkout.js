/*
 * 重置
 */
function reset() {
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var verifynum = document.getElementById("verifynum");
	username.value = "";
	password.value = "";
	verifynum.value = "";
}
/*
 * 验证码生成
 */
var code;
function createCode() {
	code = "";
	var codeLength = 4;
	var selectLetter = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8',
			'9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
			'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
			'z');
	for (var i = 0; i < codeLength; i++) {
		var index = Math.floor(Math.random() * 36);
		code += selectLetter[index];
	}
	// 显示样式
	document.getElementById("code").style.letterSpacing = "4px";// 设置字体间距
	document.getElementById("code").style.fontFamily = "Arial";// 设置字体
	document.getElementById("code").style.color = "#079";// 设置字体颜色
	document.getElementById("code").innerHTML = code; // 显示验证码
}
/*
 * 传输帐号密码方法
 */
function login() {
	var username = $("#username").val();
	var password = $("#password").val();
	var val1 = document.getElementById("verifynum").value;
	var val2 = code;
	if (username == "" || password == "") {
		alert("账号或密码不能为空！");
	} else if (val1 == "") {
		alert("验证码不能为空！");
	} else if (val1 != val2) {
		alert("验证码不正确！");
	} else {
		$.ajax({
			url : "/checkout",
			type : "post",
			data : {
				"username" : username,
				"password" : password
			},
			success : function(data) {
				
					if (data == 1) {
						window.location.href = "home/hello";
						alert("登陆成功！");
					} else {
						window.location.href = "login";
						alert("账号不对或密码不正确！");
					}
							
			},
			error : function() {
				alert("错误！");
			},
		});
	}
}
$(document).keydown(function(e) {
	if (e.keyCode == "13") {
		login();
	}
})
/*
 * 获取用户名
 */
function getUserName() {
	$.ajax({
		url : "/employeeHome/getUserName",
		type : "post",
		success : function(data) {
			document.getElementById("username").innerHTML = data;
		}
	});
}
/*
 * 注销
 */
function clearSession() {
	var truthBeTold = window.confirm("是否注销？");
	if (truthBeTold) {
		$.ajax({
			url : "/employeeHome/logout",
			type : "post",
			success : function(data) {
				alert("注销成功！");
				window.parent.location.replace("/login");

			}
		});
	}
}
/*
 * 生成菜单
 */
function createMenu() {
	$
			.ajax({
				type : "post",
				url : "/employeeHome/getMenu",
				dataType : "json",
				async : false,
				success : function(data) {
					var html="";
					var html2="";
					var html3="";
					for(var i=0;i<Math.ceil(data.length/6);i++){						
						if(i==0){
							html="<li data-target='#myCarousel' data-slide-to='"+i+"' class='active' style='background-color:lightgray'></li>";
							html2="<div class='item active' style='height:250px'><ul class='mainmenu' id='ul"+i+"'></ul></div>";
						}
						else{
							html="<li data-target='#myCarousel' data-slide-to='"+i+"' style='background-color:lightgray'></li>";
							html2="<div class='item' style='height:250px'><ul class='mainmenu' id='ul"+i+"'></ul></div>";
						}
						$("#carousel-indicators").append(html);
						$("#carousel-inner").append(html2);
					}
					for(var j=0;j<data.length;j++){
						$("#ul"+Math.floor(j/6)).append("<li><a href='"+data[j].menuurl+"'><b><span class='"+data[j].menuicon+" img'></span></b><span class='span'>"+data[j].menuname+"</span></a></li>");
						
					}
					
				}
			});
}
$(function () {
	$carousels=$("#myCarousel");// 轮播图
	var startX=0,endX=0;//手指开始和结束的位置 
	var offset=100;//最小滑动阀值 //滑动事件
	$carousels.on('touchstart',function(e){//手指开始的坐标
		endX=startX=e.touches[0].clientX; 
	});
	$carousels.on('touchmove',function(e){//手指结束的坐标
		endX=e.touches[0].clientX; 
	});
	$carousels.on('touchend',function(e){
		var distance=Math.abs(startX-endX);
		if(distance>offset){
			 $(this).carousel(startX>endX ? 'next':'prev'); 
		} 
	}); 
});

									 
