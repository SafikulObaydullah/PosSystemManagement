
var SaveCustomer = function () {
    if (CommonUiValidation()) {
        var url = "/Customer/SaveCustomer";
        var param = {
            Id: $('#Id').val(),
            CustomerId: $('#CustomerId').val(),
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            NID: $('#NID').val(),
            Type: $('#Type').val(),
            BusinessName: $('#BusinessName').val(),
            DateofBirth: $('#DateofBirth').val(),//not done
            PrimaryPhone: $('#PrimaryPhone').val(),
            SecondaryPhone: $('#SecondaryPhone').val(),
            CellNo: $('#CellNo').val(),
            Fax: $('#Fax').val(),
            EmailAddress: $('#EmailAddress').val(),
            CallingTime: $('#CallingTime').val(), //not done 
            Street: $('#Street').val(),
            City: $('#City').val(),
            District: $('#District').val(),
            ZipCode: $('#ZipCode').val(),
            Country: $('#Country').val(), 
            LeadSource: $('#LeadSource').val(),
            InstallDate: $('#InstallDate').val(),//not done 
            Soldby: $('#Soldby').val(),  
            Status: $('#Status').val(),
            PaymentMethod: $('#PaymentMethod').val(), 
            StreetPrevious: $('#StreetPrevious').val(),
            CityPrevious: $('#CityPrevious').val(),
            DistrictPrevious: $('#DistrictPrevious').val(),
            ZipCodePrevious: $('#ZipCodePrevious').val(),
            CountryPrevious: $('#CountryPrevious').val(),  
            ProfileImage: $("#employeepicture_pro").val(),
            DefaultCurrency: $('#Currency').val(),
            SalesLocation: $('#SalesLocation').val(),
            BestTimeToCall: $('#BestTimeToCall').val(),
            ReferringCustomer: $('#ReferringCustomer').val(),
            Note: $('#Note').val(),
        };
        console.log('customer save.' +   $('#Note').val());
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data) {
                    CloseTopToBottomModal()
                    OpenSuccessMessageNew("Success!", "Customer added successfully!")
                    if ($("#Id").val() > 0) {
                        window.location.reload()
                    } else {
                        $('#CustomerCRM').click()
                    }
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }

}
var SaveProfilePictureCustomer = function (fd) {
    POSModal.Show();
    var url = "";
    url = '/Customer/UpdateCustomerImage';
    $.ajax({
        url: url,
        type: 'post',
        data: fd,
        headers: { Id: $('#CustomerId').val(), FolderName: "Customer" },
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            POSModal.Hide();
            if (data.success === true) {
                $("#employeepicture_pro").val(data.result)
                $(".profile_pic_8").attr("src", '/'+ data.result);

            }
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });
}
$("#remove_pro_logo_pro").click(function () {
    var id = $(this).attr('data-id');
    $(".profile_pic_8").attr("src", '');
    $("#productpicture").val('')
    $.ajax({
        url: '/Employee/DeleteEmployeeProfile?Id=' + id,
        type: 'post',
        success: function (data) {
            if (data.success) {

            }
        }
    })
})
var SaveAddCustomerValidation = function () {
    var result = true;
    if ($("#FirstName").val() == "") {
        $("#FirstName").attr("style", "border-color:red;");
        result = false;
    }
    //if ($("#PhoneNumber").val() == "") {
    //    $("#PhoneNumber").attr("style", "border-color:red;");
    //    result = false;
    //}
    if ($("#PrimaryPhone").val() == "" || $("#PrimaryPhone").val() == undefined || $("#PrimaryPhone").val() == null) {
        $("#PrimaryPhone").attr("style", "border-color:red;");
        result = false;
    }
    //else {
    //    var pattern = "^(?:\\+88|88)?(01[3-9]\\d{8})$";
    //    /* var pattern = "^(?:\\+67|67)?(5[0-9]\\d{10})$";*/ //for PNG
    //    var StrMobile = $("#PrimaryPhone").val();
    //    if (StrMobile.match(pattern)) {
    //        $("#PrimaryPhone").attr("style", "border-color:none;");
    //    }
    //    else {
    //        $("#PrimaryPhone").attr("style", "border-color:red;");
    //        result = false;
    //    }
    //}
    return result;
}
//var DeleteProductUnit = function (id) {
//    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
//        $.ajax({
//            type: 'POST',
//            url: "/Product/DeleteProductUnit",
//            data: { id: id },
//            dataType: "json",
//            success: function (data) {
//                OpenSuccessMessageNew("Success!", data.message, "");
//                MerchantAccountList.CurrentPage = 1;
//                MerchantAccountList.TotalCount = -1;
//                MerchantAccountList.LoadMerchantAccountList();
//            }
//        });
//    });
//}
var handleCountryChange = function () {
    var selectedValue = $("#Country").val();
    if (selectedValue !== '-1') {
        $.ajax({
            url: "/Employee/FindingDistrictThroughCountry",
            type: 'post',
            data: { Country: selectedValue.replace(/\s+/g, " ") },
            success: function (data) {
                if (data.result && data.country === selectedValue) {
                    var district = $("#District");
                    district.empty();
                    district.append('<option value="-1">District</option>');
                    $.each(data.model, function (index, item) {
                        district.append('<option value="' + item.value + '">' + item.text + '</option>');
                    });
                } else {
                    $("#District").empty().append('<option value="-1">District</option>');
                }
            }
        });
    } else {
        $("#District").empty().append('<option value="-1">District</option>');
    }
}
var handleDistrictChange = function () {
    var selectedValue = $("#District").val();
    if (selectedValue !== '-1') {
        $.ajax({
            url: "/Employee/FindingCityThroughDistrict",
            type: 'post',
            data: { District: selectedValue.replace(/\s+/g, " ") },
            success: function (data) {
                if (data.result && data.district === selectedValue) {
                    var city = $("#City");
                    city.empty();
                    city.append('<option value="-1">City</option>');
                    $.each(data.model, function (index, item) {
                        city.append('<option value="' + item.value + '">' + item.text + '</option>');
                    });
                } else {
                    $("#City").empty().append('<option value="-1">City</option>');
                }
            }
        });
    } else {
        $("#City").empty().append('<option value="-1">City</option>');
    }
}
var handleCountryPreviousChange = function () {
    var selectedValue = $("#CountryPrevious").val();
    if (selectedValue !== '-1') {
        $.ajax({
            url: "/Employee/FindingDistrictThroughCountryPrevious",
            type: 'post',
            data: { Country: selectedValue.replace(/\s+/g, " ") },
            success: function (data) {
                if (data.result && data.country === selectedValue) {
                    var districtPrevious = $("#DistrictPrevious");
                    districtPrevious.empty();
                    districtPrevious.append('<option value="-1">District</option>');
                    $.each(data.model, function (index, item) {
                        districtPrevious.append('<option value="' + item.value + '">' + item.text + '</option>');
                    });
                } else {
                    $("#DistrictPrevious").empty().append('<option value="-1">District</option>');
                }
            }
        });
    } else {
        $("#DistrictPrevious").empty().append('<option value="-1">District</option>');
    }
}
var handleDistrictPreviousChange = function () {
    var selectedValue = $("#DistrictPrevious").val();
    if (selectedValue !== '-1') {
        $.ajax({
            url: "/Employee/FindingCityThroughDistrictPrevious",
            type: 'post',
            data: { District: selectedValue.replace(/\s+/g, " ") },
            success: function (data) {
                if (data.result && data.district === selectedValue) {
                    var cityPrevious = $("#CityPrevious");
                    cityPrevious.empty();
                    cityPrevious.append('<option value="-1">City</option>');
                    $.each(data.model, function (index, item) {
                        cityPrevious.append('<option value="' + item.value + '">' + item.text + '</option>');
                    });
                } else {
                    $("#CityPrevious").empty().append('<option value="-1">City</option>');
                }
            }
        });
    } else {
        $("#CityPrevious").empty().append('<option value="-1">City</option>');
    }
}
$(document).ready(function () {
    POSModal.Hide();
    $("#savecustomer").click(function () { 
        SaveCustomer();
    })
    //$("#ReferringCustomer").select2({
    //    ajax: {
    //        url: "/Employee/SearchEmployee",
    //        dataType: "json",
    //        data: function (n) {
    //            return { search: n.term, title: "Executive", page: n.page || 15 };
    //        },
    //        processResults: function (n, t) {
    //            t.page = t.page || 15;
    //            var i = JSON.parse(n.data);
    //            return { results: i.List, pagination: { more: t.page * 15 < n.total_count } };
    //        },
    //        delay: 250,
    //        cache: !0,
    //        placeholder: "Search for an employee",
    //        minimumInputLength: 1,
    //        templateResult: formatRepo,
    //        templateSelection: formatRepoSelection,
    //    },
    //});

    $(".load_look_list").height(window.innerHeight - 285)
    $(".calendar-pi").click(function (er) {
        var itemsselected = $(er.target).parent().parent().parent();
        var inputselected = $(itemsselected).find('.calendar-pt');
        $(inputselected).trigger('click');
    });
    $('#uploadprofilelogo_pro').change(function (event) {
        var fd = new FormData();
        const files = event.target.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                fd.append('File', files[i]);
                event.target.value = "";
            }
            OpenConfirmationMessageNew("Warning", "Are you sure?", function () {
                SaveProfilePictureCustomer(fd);
            })
        }
    });
    $("#add_pro_logo_pro").click(function () {
        $("#uploadprofilelogo_pro").click()
    })
    $("#Country").change(function () {
        handleCountryChange();
    });
    $("#District").change(function () {
        handleDistrictChange();
    });
    $("#CountryPrevious").change(function () {
        handleCountryPreviousChange();
    });
    $("#DistrictPrevious").change(function () {
        handleDistrictPreviousChange();
    });
});
//DateofBirth = new Pikaday({
//    field: document.getElementById('DateofBirth'),
//    format: 'MM-DD-YYYY',
//    trigger: $('#DateofBirth')[0] //, firstDay: 1
//});







