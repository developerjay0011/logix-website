$(document).ready(function () {
    $("#frmChangePassword").validate({
        errorElement: 'span',
        errorClass: 'Fild-Error',
        rules: {
            OPassword: {
                required: true
            },
            NPassword: {
                required: true
            },
            CPassword: {
                required: true,
                equalTo: "#NPassword"
            },

        },
        messages: {
            OPassword: {
                required: "Please enter old password"
            },
            NPassword: {
                required: "Please enter new password"
            },
            CPassword: {
                required: "Please enter new password again",
                equalTo: "Password not matched"
            },
        },
        highlight: function (element) {
            $(element).parent().addClass("Fild-box-Error");
        },
        unhighlight: function (element) {
            $(element).parent().removeClass("Fild-box-Error");
        },
        submitHandler: function (form) {
            ChangePassword();
        }
    });
});

function ChangePassword() {

    var obj = {
        OldPassword: $("#OPassword").val(),
        NewPassword: $("#NPassword").val(),
    }
    $.ajax({
        url: "/Admin/Home/ChangePassword",
        type: "POST",
        data: obj,
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