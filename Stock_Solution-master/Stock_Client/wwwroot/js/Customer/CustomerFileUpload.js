var UserFileUploadjqXHRData;
//var ReloadFIlesTab = function () {
//    $("#FilesTab").load("/File/CustomerFiles/" + customerId);
//}
var SaveCustomerFile = function () {
    var url = domainurl + "/File/SaveCustomerFile/";
    var param = {
        File: $("#UploadedPath").val(),
        CustomerId: CustomerId,
        Description: $("#DescriptionUp").val()
    };
    $.ajax({
        type: "POST",
        ajaxStart: $(".loader-div").show(),
        url: url,
        data: param,
        dataType: "json",
        cache: false,
        success: function (data) {
            OpenSuccessMessageNew("Success!", "File Saved Successfully.", function () {
                CustomerFileLoad();
                //OpenFilesTab();
                $("#Right-To-Left-Modal-Body .close").click();
            });
            $(".customer-files-modal-head .close").click();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}
$(document).ready(function () {

    $("#SaveCustomerFiles").click(function () {
        if (CommonUiValidation() && $("#UploadedPath").val() != "") {
            SaveCustomerFile();
            $(".fileborder").removeClass('red-border');
        }
        if ($("#UploadedPath").val() == "") {
            $("#uploadfileerror").removeClass("hidden");
            $(".fileborder").addClass('red-border');
        }
    });

    //image file code
    if ($("#btnUploadExcImgFile").attr('src') != "/Icons/d-pro.jpg") {
        $('.deleteDoc').removeClass('hidden');
        $(".chooseFilebtn").addClass('hidden');
        $(".changeFilebtn").removeClass('hidden');
    }
    //var UserFileUploadjqXHRData;
    $("#btnUploadExcImgFile").click(function () {
        $("#btnUpload").click();
    });
    $(".change-picture-logo").click(function () {
        $("#btnUpload").click();
    });
    var SaveFile = function (fd) {
        var url = '/File/UploadExcFile';
        $.ajax({
            url: url,
            type: 'post',
            data: fd,
            dataType: 'json',
            contentType: false,
            processData: false,
            beforeSend: function () {
                $("#btnUploadExcImgFile").html("Loading..");
                $(".file-progress").show();
                $("#progress-bar").LineProgressbar({
                    percentage: 99,
                    fillBackgroundColor: '#17c671',
                    backgroundColor: '#e30615',
                    radius: '3px',
                    height: '20px',
                    width: '100%',
                    ShowProgressCount: true
                });
            },
            success: function (data) {
                $('#progress-bar').text('File Uploaded')
                $('#progress-bar').css('background-color', '#06e336')
                $('#progress-bar').css('font-size', '12px')
                console.log(data);
                $(".chooseFilebtn").addClass('hidden');
                $(".changeFilebtn").removeClass('hidden');
                $(".deleteDoc").removeClass('hidden');
                //$("#btnUploadExcImgFile").attr("src", data.filePath);
                $("#UploadedPath").val(data.filePath);
                console.log("sagarTest");
                var spfile = data.filePath.split('.');
                var index = spfile.length - 1;
                var spfile2 = data.filePath.split('/');
                var index2 = spfile2.length - 1;
                var DescriptionCheck = $("#DescriptionUp").val();
                if (DescriptionCheck == null || DescriptionCheck == "") {                 
                    $("#DescriptionUp").val(spfile2[index2]);
                }
                //if (spfile[1] == "png" || spfile[1] == "jpg" || spfile[1] == "jpeg") {
                //    $(".Upload_Doc").addClass('hidden');

                //    $(".LoadPreviewDocument").removeClass('hidden');
                //    $("#Preview_Doc").attr('src', data.result.FullFilePath);
                //}
                //$(".fileborder").removeClass('red-border');
                //$("#uploadfileerror").addClass("hidden");

           
                if (spfile[index] == "png" || spfile[index] == "PNG" || spfile[index] == "jpg" || spfile[index] == "JPG" || spfile[index] == "jpeg" || spfile[index] == "JPEG") {
                    //$(".Upload_Doc").addClass('hidden');
                    //$(".LoadPreviewDocument").removeClass('hidden');
                    //$("#Preview_Doc").attr('src', data.result.FullFilePath);
                    $("#btnUploadExcImgFile").attr('src', data.filePath)
                    $(".chooseFilebtn").addClass("hidden");
                    $(".changeFilebtn").removeClass("hidden");
                    $(".deleteDoc").removeClass("hidden");
                    //$("#UploadCustomerFileBtn").addClass('custom-file');
                    //$("#UploadCustomerFileBtn").removeClass('otherfileposition');
                    //$(".fileborder").addClass('border_none');
                }
                else if (spfile[index] == "pdf") {
                    $(".chooseFilebtn").addClass("hidden");
                    $(".changeFilebtn").removeClass("hidden");
                    $(".deleteDoc").removeClass("hidden");
                    $("#btnUploadExcImgFile").attr('src', domainurl + '/Icons/pdf.png');
                    //$("#UploadCustomerFileBtn").addClass('otherfileposition');
                    //$("#UploadCustomerFileBtn").removeClass('custom-file');
                    //$(".fileborder").removeClass('border_none');
                }
                else if (spfile[index] == "doc" || spfile[index] == "docx") {
                    $(".chooseFilebtn").addClass("hidden");
                    $(".changeFilebtn").removeClass("hidden");
                    $(".deleteDoc").removeClass("hidden");
                    $("#btnUploadExcImgFile").attr('src', '/Icons/docx.png');
                    //$("#UploadCustomerFileBtn").addClass('otherfileposition');
                    //$("#UploadCustomerFileBtn").removeClass('custom-file');
                    //$(".fileborder").removeClass('border_none');
                }
                else if (spfile[index] == "mp4" || spfile[index] == "mov") {
                    $(".chooseFilebtn").addClass("hidden");
                    $(".changeFilebtn").removeClass("hidden");
                    $(".deleteDoc").removeClass("hidden");
                    $("#btnUploadExcImgFile").attr('src', '/Icons/mp4.png');
                    //$("#UploadCustomerFileBtn").addClass('otherfileposition');
                    //$("#UploadCustomerFileBtn").removeClass('custom-file');
                //    $(".fileborder").removeClass('border_none');
                }
                else {
                    $(".chooseFilebtn").addClass("hidden");
                    $(".changeFilebtn").removeClass("hidden");
                    $(".deleteDoc").removeClass("hidden");
                    $("#btnUploadExcImgFile").attr('src', '/Icons/docx.png');
                    //$("#UploadCustomerFileBtn").addClass('otherfileposition');
                    //$("#UploadCustomerFileBtn").removeClass('custom-file');
                    //$(".fileborder").removeClass('border_none');
                }
            },
            error: function (exr) {
                if (typeof exr.statusText != 'undefined') {
                    console.log('Function Status : ' + exr.statusText);
                }
            }
        });
    }
    $('#btnUpload').change(function () {
        var fd = new FormData();
        var files = $('#btnUpload')[0].files;
        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);
        }
        console.log("1")
        SaveFile(fd);
    });
    var DeleteUploadedFile = function () {
        var path = $("#UploadedPath").val();
        $.ajax({
            url: "/File/DeleteUploadedFile?path=" + path,
            type: 'post',
            success: function (data) {
                if (data.isDeleted == true) {
                    $.notify(data.message, "info");
                } else {
                    $.notify(data.message, "error");
                }
            },
            error: function (exr) {
                if (typeof exr.statusText != 'undefined') {
                    console.log('Ajax status : ' + exr.statusText);
                }
            }
        });
    }
    $('.deleteDoc').click(function () {
        $("#btnUploadExcImgFile").attr("src", "/Icons/d-pro.jpg");
        DeleteUploadedFile();
        $("#UploadedPath").val("/Icons/d-pro.jpg");
        $('.deleteDoc').addClass('hidden');
        $(".chooseFilebtn").removeClass('hidden');
        $(".changeFilebtn").addClass('hidden');
        $('#progress-bar').hide();
    });
    //end image file code
});