$(document).ready(function () {
	$("#frmLogin").validate({
		errorElement: 'span',
		errorClass: 'Fild-Error',
		rules: {
			Email: {
				required: true,
				email: true
			},
			Password: {
				required: true,
			}
		},
		messages: {
			Email: {
				required: 'Email is required.',
				email: 'Email must be valid.'
			},
			Password: {
				required: 'Password is required.'
			}
		},
		highlight: function (element) {
			$(element).parent().addClass("Fild-box-Error");
		},
		unhighlight: function (element) {
			$(element).parent().removeClass("Fild-box-Error");
		}
	});

	$("#btnLogin").on('click', function () {
		var valid = $("#frmLogin").valid();
		if (valid) {
			$.ajax({
				url: "/Admin/Home/Login",
				type: "POST",
				data: { email: $("#Email").val(), password: $("#Password").val() },
				success: function (data) {
					if (!data.success) {
						toastr.warning(data.message, 'Warning');
					} else {
						toastr.success(data.message, 'Success');
						setTimeout(function () {
							window.location.href = '/admin/home';
						}, 1000);
					}
				},
				error: function (errormessage) {
					//StopLoading();
					toastr.error(errormessage.responseText.toString(), 'error');
				}
			});
		}
	});
});