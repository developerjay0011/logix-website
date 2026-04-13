$(document).ready(function () {
    $('#Job-table').DataTable({
        destroy: true,
        screenX: true,
        Sort: false,
        processing: true, // for show progress bar
        serverSide: false, // for process server side
        filter: true, // this is for disable filter (search box)
        orderMulti: true, // for disable multiple column at once
        responsive: true,
        ordering: false,
        order: [],
        lengthChange: true,
        paging: true,
        Paginate: true,
        pagingType: "full_numbers",
        pageLength: 25
    });

    $("#frmVacancy").validate({
        errorElement: 'span',
        errorClass: 'Fild-Error',
        rules: {
            Title: {
                required: true
            },
            AreaInterest: {
                required: true
            },
            PrimaryWl: {
                required: true
            },
            AlternativeWl: {
                required: true
            },
            Requisitions: {
                required: true
            },

        },
        messages: {
            Title: {
                required: "Please enter title"
            },
            AreaInterest: {
                required: "Please enter area interest"
            },
            PrimaryWl: {
                required: "Please enter primary w.l."
            },
            AlternativeWl: {
                required: "Please enter alternative w.l."
            },
            Requisitions: {
                required: "Please enter requisitions"
            },
        },
        highlight: function (element) {
            $(element).parent().addClass("Fild-box-Error");
        },
        unhighlight: function (element) {
            $(element).parent().removeClass("Fild-box-Error");
        },
        submitHandler: function (form) {
            SaveVacancy();
        }
    });

});

function SaveVacancy() {

    var dt = new FormData();
    dt.append("JobId", $("#JobId").val());
    dt.append("Title", $("#Title").val());
    dt.append("AreaInterest", $("#AreaInterest").val());
    dt.append("PrimaryWl", $("#PrimaryWl").val());
    dt.append("AlternativeWl", $("#AlternativeWl").val());
    dt.append("Requisitions", $("#Requisitions").val());

    $.ajax({
        url: "/Admin/Vacancy/SaveVacancy",
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
                    window.location.href = '/admin/vacancy';
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

function DeleteData() {
    $.ajax({
        url: "/Admin/Vacancy/DeleteVacancy",
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
function ActiveIactive(id) {
    $.ajax({
        url: "/Admin/Vacancy/ActiveVacancy",
        type: "POST",
        data: { Id: id },
        success: function (data) {
            if (!data.success) {
                toastr.warning(data.message, 'Warning');
            } else {
                toastr.success(data.message, 'Success');
                window.location.reload()
            }
        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText.toString(), 'error');
        }
    });
}