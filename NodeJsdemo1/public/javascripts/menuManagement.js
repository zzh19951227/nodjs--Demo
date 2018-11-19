/*
 * 显示菜单信息
 */
var skip = 0;
var page=0;
$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var scrollHeight = $(document).height();
	var windowHeight = $(this).height();
	if (scrollTop + windowHeight == scrollHeight) {
		findmenu();
	}
})
var flag = 0;
function cl(){
	$(".tr").remove();
	skip=0;
	page=0;
}
function findmenu() {

		$
		.ajax({
			type : "post",
			url : "/menuManagement/getAllMenu",
			data : {
				"menuName" : $("#menuname").val(),
				"skip":skip
			},
			traditional : true,
			success : function(data) {				
				var str = "";
				if(data.length!=0){
					$("#more").remove();
					skip=skip*page+12;
					for (var i = 0; i < data.length; i++) {
						str += "<tr class='tr'><td>"
								+ (page*12+i + 1)
								+ "</td><td>"
								+ data[i].menuname
								+ "</td><td>"
								+ data[i].menuurl
								+ "</td><td><span class='glyphicon glyphicon-wrench' data-toggle='modal' data-target='#updatemenu' onclick=\"show('"+data[i].menuname+"')\"></span>&nbsp;&nbsp;<span class='glyphicon glyphicon-minus' style='color:red' onclick=deletemenu('"+data[i].menuname+"')></span></tr>";
					}
					page=page+1;
					$("#menuinfo tbody").append(str);
					$("#info").append("<div class='text-center' id='more'><a onclick='findEmployee()' ><span id='sp'>点击加载更多...</span></a></div>");
					if(data.length<12){
						$("#sp").html("已全部加载")
					}
					flag = 1;
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
 * 新建菜单
 */
function addMenu() {	
	if ($("#menuName").val() == "") {
		alert("菜单名不能为空！");
	} else {
		$.ajax({
			type : "post",
			url : "/menuManagement/insertMenuInfo",
			dataType : "json",
			data : {
				"menuName" : $("#menuName").val(),
				"menuUrl" : $("#menuurl").val(),								
			},
			success : function(data) {
				if (data == "1") {
					alert("新增成功！");
					if(flag==1){
						cl();
						findmenu();
					}
				} else {
					alert("新增失败！");
				}
			}
		});
	}

}

/*
 * 修改菜单信息
 */
function updateMenu() {
	if ($("#updatename").val() == "") {
		alert("用户名不能为空！");
	} else {
		$.ajax({
			type : "post",
			url : "/menuManagement/updateMenuInfo",
			dataType : "json",
			data : {
				"mName":$("#hidname").val(),
				"menuname":$("#updatename").val(),								
			},
			success : function(data) {
				if (data == "1") {
					alert("修改成功！");
					cl();
					findmenu();
				} else {
					alert("修改失败！");
				}
			}
		});
	}
}

/*
 * 显示要修改菜单的信息
 */
function show(name) {
	$.ajax({
		type : "post",
		url : "/menuManagement/getMenuInfo",
		data : {
			"menuname" : name,
		},
		success : function(data) {
			$("#hidname").val(data[0].menuname);
			$("#updatename").val(data[0].menuname);
			$("#updateurl").val(data[0].menuurl);		
		}
	});
}

/*
 * 删除菜单
 */
function deletemenu(name) {
	var truthBeTold = window.confirm("是否删除？");
	if (truthBeTold) {
		$.ajax({
			type : "post",
			url : "/menuManagement/deleteMenu",
			dataType : "json",
			data : {
				"menuname" : name,
			},
			success : function(data) {
				if (data == "1") {
					alert("删除成功！");
					cl();
					findmenu();
				} else {
					alert("删除失败！");
				}
			}
		});
	}
}



