function submit() {
    var name = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        url: "/loginCheck",
        type:"post",
        dataType:"json",
        data:{
            "name":name,
            "password":password
        },
        success: function(data){
            if(data == 1){
                alert("success");
                window.location.href="/index"
            }
        }});

}
