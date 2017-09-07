/**
 * 使用ajax方式进行登录
 */
window.onload = function() {
	function encrypt(val) {
		//第一次加密
		var MD5 = md5(val)
		//二次加密传给服务端
		var SHA1 = hex_sha1(MD5 + "YTW" + val)
		return SHA1
	}
	/*toast*/
	function toast(msg, time) {
		$(".mui-toast-message").text(msg);
		$(".mui-toast-container").fadeIn();
		setTimeout(function() {
			$(".mui-toast-container").fadeOut();
		}, time);
	};
	$(".Yonghudenglu_Div3").on("touchend", function() {
		loginAjax();
	})

	function loginAjax() {
		
		var phone = $('#phone').val().trim();
		var password = $('#password').val().trim();
		//这里获取用户选择的选项的value值，不用去空格，不是获取的option
		var type = $('#person').val().trim();
		console.log(type)
		var key = encrypt(phone);
		var passwordMd5 = md5(password);
		//验证手机号正则
		var reg = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/;

		if(phone.length == 0) {
			toast("请输入！", 2000)
		} else {
			if(!reg.test(phone)) {
				//手机号有误
				toast("此手机号码还未注册此类型账号", 2000)
			} else {
				if(password.length == 0) {
					toast("您输入的密码不正确", 2000)
				} else {
					//手机号和密码都符合需求
					$.ajax({
						type: "post",
						url: "http://www.yingtongwang.net/index.php/ytwapi/public/login",
						async: true,
						dataType: 'json',
						data: {
							phone: phone,
							password: passwordMd5,
							type: type, //这里是传入参数，0 or 1 or 2
							key: key
						},
						success: function(res) {
							if(res.success && type==0) {

							window.location.href = "WoDeShouYe.html";

							}else if(res.success && type==1)
							{
								window.location.href = "MuYingShouYe.html";
							}else if(res.success && type==2)
							{
								window.location.href = "ShangJiaGeRen.html";
							}
							
							else{
								//有问题
								toast(res.message, 2000)
							};

						},
						error: function(err) {

						}
					});
				}
			}
		};

	}

}