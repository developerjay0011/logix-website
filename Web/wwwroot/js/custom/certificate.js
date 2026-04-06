$(document).ready(function () {
    $('#Certificate-table').DataTable({
        destroy: true,
        screenX: true,
        Sort: false,
        processing: true, // for show progress bar
        serverSide: false, // for process server side
        filter: true, // this is for disable filter (search box)
        orderMulti: true, // for disable multiple column at once
        responsive: true,
        ordering: false,
        order:[],
        lengthChange: true,
        paging: true,
        Paginate: true,
        pagingType: "full_numbers",
        pageLength: 25
    });

    $("#frmCertificate").validate({
        errorElement: 'span',
        errorClass: 'Fild-Error',
        rules: {
            Title: {
                required: true
            },
            Document: {
                required: function () {
                    return parseInt($("#CertificateId").val()) > 0 ? false : true;
                }
            },
            
        },
        messages: {
            Title: {
                required: "Please enter title"
            },
            Document: {
                required: "Please select image"
            }
        },
        highlight: function (element) {
            $(element).parent().addClass("Fild-box-Error");
        },
        unhighlight: function (element) {
            $(element).parent().removeClass("Fild-box-Error");
        },
        submitHandler: function (form) {
            SaveCertificate();
        }
    });

});

function SaveCertificate() {

    var dt = new FormData();
    var files1 = $("#Document").get(0).files;
    if (files1.length > 0) {
        dt.append("ImagePath", files1[0]);
    }
    dt.append("CertificateId", $("#CertificateId").val());
    dt.append("Title", $("#Title").val());

    $.ajax({
        url: "/Admin/Certificate/SaveCertificate",
        type: "POST",
        data: dt,
        processData: false,
        contentType: false,
        success: function (data) {
            if (!data.success) {
                toastr.warning(data.message, 'Warning');
            } else {
                toastr.success(data.message, 'Success');
                setTimeout(function () {
                    window.location.href = '/admin/certificate';
                }, 1000);
            }
        },
        error: function (errormessage) {
            //StopLoading();
            toastr.error(errormessage.responseText.toString(), 'error');
        }
    });
}


function DeleteDataModel(id) {
    $("#DeletedId").val(id);
    $("#Delete").modal('show');
}

function DeleteCertificateData() {
    $.ajax({
        url: "/Admin/Certificate/DeleteCertificate",
        type: "POST",
        data: { Id: $("#DeletedId").val() },
        success: function (data) {
            if (!data.success) {
                toastr.warning(data.message, 'Warning');
            } else {
                toastr.success(data.message, 'Success');
                $("#Delete").modal('hide');
                window.location.reload()
            }
        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText.toString(), 'error');
        }
    });
}