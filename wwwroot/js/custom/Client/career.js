var code;
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false,
    backdrop: 'static'
})
$(document).ready(function () {
    
    $(".ApplyNow").on('click', function () {
        $("#frmCareer").trigger('reset');
        $("#JobId").val($(this).attr('data-id'))
        createCaptcha();       
        myModal.show();
    });

    $("#frmCareer").validate({
        errorElement: 'span',
        errorClass: 'Fild-Error',
        rules: {
            Title: {
                required: true
            },
            FirstName: {
                required: true
            },
            LastName: {
                required: true
            },
            Email: {
                required: true,
                email:true
            },
            Mobile: {
                required: true,
                maxlength: 10
            },            
            Resume: {
                required: true
            },
            cpatchaTextBox: {
                required: true
            },
        },
        messages: {
            Title: {
                required: "Please select title"
            },
            FirstName: {
                required: "Please enter first name"
            },
            LastName: {
                required: "Please enter last name"
            },
            Email: {
                required: "Please enter email",
                email: "Please enter valid email"
            },
            Mobile: {
                required: "Please enter mobile",
                maxlength: "Please enter valid mobile"
            },
            Resume: {
                required: "Please add resume"
            },
            cpatchaTextBox: {
                required: "Please enter captcha"
            },
        },
        highlight: function (element) {
            $(element).parent().addClass("Fild-box-Error");
        },
        unhighlight: function (element) {
            $(element).parent().removeClass("Fild-box-Error");
        },
        submitHandler: function (form) {
            SaveCareer();
        }
    });
    $('#cpatchaTextBox').on('input', function () {
        $("#invalid-Captcha").hide();
    });
});


function createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 200;
    canv.height = 100;
    var ctx = canv.getContext("2d");
    ctx.font = "50px Georgia";
    ctx.strokeText(captcha.join(""), 0, 60);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
    if (document.getElementById("cpatchaTextBox").value == code) {
        return true;
    } else {
        createCaptcha();
        $("#invalid-Captcha").show();
        return false;
    }
}

function SaveCareer() {
    var captcha = validateCaptcha();
    if (captcha) {
        $("#btnSubmit").html('<span class="spinner-border"></span>');
        var dt = new FormData();
        var files1 = $("#Resume").get(0).files;
        if (files1.length > 0) {
            dt.append("Resume", files1[0]);
        }
        dt.append("ApplyFor", $("#JobId").val());
        dt.append("Title", $("#Title").val());
        dt.append("FirstName", $("#FirstName").val());
        dt.append("LastName", $("#LastName").val());
        dt.append("Email", $("#Email").val());
        dt.append("ContactNo", $("#Mobile").val());

        $.ajax({
            url: "/Career/SaveCareer",
            type: "POST",
            data: dt,
            processData: false,
            contentType: false,
            success: function (data) {
                if (!data.success) {
                    toastr.warning(data.message, 'Warning');
                } else {
                    $("#btnSubmit").html('Submit');
                    toastr.success(data.message, 'Success');
                    myModal.hide();
                }
            },
            error: function (errormessage) {
                //StopLoading();
                toastr.error(errormessage.responseText.toString(), 'error');
            }
        });
    }
}