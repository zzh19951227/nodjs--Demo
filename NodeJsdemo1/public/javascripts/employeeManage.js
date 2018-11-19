var flag = 0;
var skip = 0;
var page=0;
$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var scrollHeight = $(document).height();
	var windowHeight = $(this).height();
	if (scrollTop + windowHeight == scrollHeight) {
		findEmployee();
		
	}
})
/*
 * 修改密码
 */
function changePassword() {
	var date = new Date();
	var moveIn = date.getTime();
	if ($("#newpassword").val() == "" || $("#checkpassword").val() == ""
			|| $("#oldpassword").val() == "") {
		alert("输入框不能为空！");
	} else if ($("#newpassword").val() == $("#checkpassword").val()) {
		$.ajax({
			type : "post",
			url : "/employeeManagement/changePassword",
			data : {
				"oldpassword" : $("#oldpassword").val(),
				"newpassword" : $("#newpassword").val(),
				"updateDate" : moveIn,
			},
			success : function(data) {
				if (data == "1") {
					alert("修改成功！");
					closeModel2();
					window.parent.location.replace("/login");
				} else {
					alert("旧密码不正确！");
				}
			}
		});
	} else {
		alert("确认密码与新密码不同！");
	}
}

function cl(){
	$(".tr").remove();
	skip=0;
	page=0;
}

/*
 * 模糊查询用户信息
 * 
 */
function findEmployee() {

	$
			.ajax({
				type : "post",
				url : "/employeeManagement/getAllEmployee",
				data : {
					"userName" : $("#username").val(),
					"skip":skip
				},
				traditional : true,
				success : function(data) {
					var str = "";
					if(data.length!=0){
						$("#more").remove();
						skip=skip*page+12;										
						for (var i = 0; i < data.length; i++) {
							str += "<tr class='tr'><td data-toggle='modal' data-target='#userinfo' onclick=showInfo('"
									+ data[i].username
									+ "')>"
									+ (page*12+i + 1)
									+ "</td><td>"
									+ data[i].username
									+ "</td><td>"
									+ data[i].isemployee
									+ "</td><td>"
									+ data[i].department.departmentname
									+ "</td><td><span class='glyphicon glyphicon-wrench' data-toggle='modal' data-target='#updateuser' onclick=\"show('"
									+ data[i].username
									+ "')\"></span>&nbsp;&nbsp;<span class='glyphicon glyphicon-minus' style='color:red' onclick=deleteemployee('"
									+ data[i].username + "')></span></tr>";
						}
						page=page+1;
						$("#employeeinfo tbody").append(str);
						$("#info").append("<div class='text-center' id='more'><a onclick='findEmployee()' ><span id='sp'>点击加载更多...</span></a></div>");
						if(data.length<12){
							$("#sp").html("已全部加载");
						}
					}else{
						$("#sp").html("已全部加载");
					}
					
				},
				error : function() {
					alert("输入的页数不符合要求！");
				}

			});
}

/*
 * 查看用户信息详细
 */
function showInfo(name) {
	$.ajax({
		type : "post",
		url : "/employeeManagement/showEmployee",
		data : {
			"username" : name,
		},
		success : function(data) {
			$("#showname").html(data[0].username);
			$("#showage").html(data[0].age);
			$("#showgender").html(data[0].gender);
			$("#showdepartment").html(data[0].department.departmentname);
			$("#showisemployee").html(data[0].isemployee);
		}
	});
}

/*
 * 显示要修改员工的信息
 */
function show(name) {
	$.ajax({
		type : "post",
		url : "/employeeManagement/showEmployee",
		data : {
			"username" : name,
		},
		success : function(data) {
			$("#hidname").val(data[0].username);
			$("#updatename").val(data[0].username);
			$("#updateage").val(data[0].age);
			var xradio = document.getElementsByName("updatesex");
			for (var i = 0; i < xradio.length; i++) {
				if (xradio[i].value == data[0].gender) {
					xradio[i].checked = true;
					break;
				}
			}
			$("#updatedepartment").val(data[0].department.id);
			$("#updateisemployee").val(data[0].isemployee);

		}
	});
}

function checkNum(number) {
	var re = /^\d+$/;
	if (re.test(number)) {
		return false;
	}
	return true;
}
/*
 * 新建用户信息
 */
function addEmployee() {
	if ($("#name").val() == "") {
		alert("用户名不能为空！");
	} else if (checkNum(Number($("#age").val()))) {
		alert("年龄非正常输入！");
	} else {
		$.ajax({
			type : "post",
			url : "/employeeManagement/insertEmployee",
			dataType : "json",
			data : {
				"userName" : $("#name").val(),
				"password" : $("#password").val(),
				"gender" : $("input:radio[name='sex']:checked").val(),
				"age" : Number($("#age").val()),
				"departmentId" : Number($("#depart").val()),
			},
			success : function(data) {
				if (data == "1") {
					alert("新增成功！");
					if (flag == 1) {
						cl();
						findEmployee();
					}
				} else {
					alert("新增失败！");
				}
			}
		});
	}

}
/*
 * 修改人员信息
 */
function updateEmployee() {
	if ($("#updatename").val() == "") {
		alert("用户名不能为空！");
	} else if (checkNum(Number($("#updateage").val()))) {
		alert("年龄非正常输入！");
	} else {
		$.ajax({
			type : "post",
			url : "/employeeManagement/updateEmployee",
			dataType : "json",
			data : {
				"uName" : $("#hidname").val(),
				"userName" : $("#updatename").val(),
				"gender" : $("input:radio[name='updatesex']:checked").val(),
				"age" : Number($("#updateage").val()),
				"departmentId" : Number($("#updatedepartment").val()),
				"isEmployee" : $("#updateisemployee").val(),
			},
			success : function(data) {
				if (data == "1") {
					alert("修改成功！");
					cl();
					findEmployee();
				} else {
					alert("修改失败！");
				}
			}
		});
	}
}
/*
 * 删除用户
 */
function deleteemployee(name) {
	var truthBeTold = window.confirm("是否删除？");
	if (truthBeTold) {
		$.ajax({
			type : "post",
			url : "/employeeManagement/deleteEmployee",
			dataType : "json",
			data : {
				"username" : name,
			},
			success : function(data) {
				if (data == "1") {
					alert("删除成功！");
					cl();
					findEmployee();
				} else {
					alert("删除失败！");
				}
			}
		});
	}
}

/*
 * 获取用户名
 */
$(function() {
	$.ajax({
		url : "/employeeHome/getUserName",
		type : "post",
		success : function(data) {
			$("#uname").html(data);
		}
	});
})


