import { getAjax, postAjax, url } from './api-ajax.js'

$(document).ready(function () {
	$("#btn-sign-in").click(function () {
		var username = $("#user").val() //lấy giá trị của thẻ input có id là user
		var password = $("#pass").val()

		console.log(username, password)//ghi ra console

		if (!username || !password) {
			swal("Failed","Username and password are required!", "warning");
			return;
		}

		postAjax(url + "/signin", { username: username, password: password })
			.done(function (msg) {
				// Khi gọi API thì kết quả sẽ trả ở đây
				var token = msg.data
				if (token != null && token != "") {
					swal("Success", "Login successfully!", "success")
						.then(() => {
							//lưu token vào bộ nhớ của browser
							localStorage.setItem("token", token)
							//chuyển qua trang index.html
							window.location.href = "index.html"
							//append: nối chuỗi
						});
				}
			})
			.fail(function () {
				swal("Failed!","Incorrect username or password!", "warning");
			});

	})

	$("#btn-sign-up").click(function () {
		var repeatPassword = $("#repeat-pass").val()
		var username = $("#signup-user").val()
		var password = $("#signup-pass").val()
		var email = $("#email").val()

		if (!username || !password) {
			swal("Error!","Username and password are required!", "warning");
			return;
		}
		if (!email) {
			swal("Error!","Email are required!", "warning");
			return;
		}

		console.log(repeatPassword);
		if (password != repeatPassword) {
			swal("Error!","Password are not the same!")
			return;
		}

		console.log(username, password)//ghi ra console

		postAjax(url + "/signup", { username: username, password: password, email: email })
			.done(function (msg) {
				// Khi gọi API thì kết quả sẽ trả ở đây
				swal("Success!","Sign up success!","success")

				// Thực thi đăng nhập ngay sau khi đăng ký thành công
				postAjax(url + "/signin", { username: username, password: password })
					.done(function (msg) {
						window.location.href = "index.html"
					})
					.fail(function (jqXHR, textStatus) {
						swal("Error!","Login failed: " + jqXHR.responseJSON.message,"error")
					});

			})
			.fail(function (jqXHR, textStatus) {
				swal("Error!","Signup failed: " + jqXHR.responseJSON.message,"error")
			});

	})
})
