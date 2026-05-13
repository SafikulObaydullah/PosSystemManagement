var TakeBreak = function () {
    ShowConfirmMessage('Are you sure? It has been a long time since you made it!!', function () {
        $.ajax({
            type: 'post',
            url: '/Ticket/TakeBreak',
            success: function (data) {
                OpenSuccessMessageNew('Congrats!', 'Have a relax!!!');
                setTimeout(function () {
                    window.location.reload()
                }, 1000)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    })
}
var GoToMeeting = function () {
    if ($('#meeting_message').val() != '') {
        $.ajax({
            type: 'post',
            url: '/Ticket/GoToMeeting?message=' + $('#meeting_message').val(),
            success: function (data) {
                OpenSuccessMessageNew('Congrats!', 'Have a relax!!!');
                setTimeout(function () {
                    window.location.reload()
                }, 1000)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    } else {
        $('#meeting_message').addClass('required')
        ShowErrorMessage('Please specify a brief description!!!')
    }

}
var LoadWorkLog = function () {
    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
        + '&UserGuid=' + $('#EmployeeId').val();
    $('.report_container_tbody').load('/my-work-log' + parm)
    $('.report_container_tbody').show(500)
}
//var LoadManagement = function () {
//    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
//        + '&UserGuid=' + $('#EmployeeId').val();
//    $('.report_container_tbody').load('/my-management' + parm)
//    $('.report_container_tbody').show(500)
//}
//var LoadDocument = function () {
//    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
//        + '&UserGuid=' + $('#EmployeeId').val();
//    $('.report_container_tbody').load('/my-document' + parm)
//    $('.report_container_tbody').show(500)
//}
//var LoadUserPermission = function () {
//    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
//        + '&UserGuid=' + $('#EmployeeId').val();
//    $('.report_container_tbody').load('/my-user-permission' + parm)
//    $('.report_container_tbody').show(500)
//}
//var LoadUserAssets = function () {
//    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
//        + '&UserGuid=' + $('#EmployeeId').val();
//    $('.report_container_tbody').load('/my-user-assets' + parm)
//    $('.report_container_tbody').show(500)
//}
//var LoadUserSales = function () {
//    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
//        + '&UserGuid=' + $('#EmployeeId').val();
//    $('.report_container_tbody').load('/my-user-sales' + parm)
//    $('.report_container_tbody').show(500)
//}
//var LoadUserLoan = function () {
//    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
//        + '&UserGuid=' + $('#EmployeeId').val();
//    $('.report_container_tbody').load('/my-user-loan' + parm)
//    $('.report_container_tbody').show(500)
//}
//var LoadUserCommission = function () {
//    var parm = '?StartDate=' + $('#ReviewFilterStartDate').val() + '&EndDate=' + $('#ReviewFilterEndDate').val()
//        + '&UserGuid=' + $('#EmployeeId').val();
//    $('.report_container_tbody').load('/my-user-commission' + parm)
//    $('.report_container_tbody').show(500)
//}
var SaveProfilePicturePro = function (fd) {
    POSModal.Show();
    var url = "";
    url = '/Employee/UpdateImage';
    $.ajax({
        url: url,
        type: 'post',
        data: fd,
        headers: { Id: $('#EmployeeId').val(), FolderName: "Employee" },
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            POSModal.Hide();
            if (data.success === true) {
                $("#employeepicture_pro").val(data.result)
                $(".profile_pic_8").attr("src", data.result);

            }
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });
}
var UpdateEmployeeProfile = function () {
    if (window.location.hash === '' || window.location.hash === '#detail') {
        console.log("details  btn work");
        SaveEmployeeProfile();
    }
    else if (window.location.hash === '#WorkPlace') {
        console.log("WorkPlace  btn work");
        SaveHRprofile();
    }
    else if (window.location.hash === '#Facility') {
        console.log("Facility  btn work");
        SaveCompensationBenefittInfo();
    }
    else if (window.location.hash === '#salary') {
        console.log("salary  btn work");
        SaveSalaryInfoInEmpProfTbl();
    }
    else if (window.location.hash === '#Permission') {
        console.log("Permission  btn work");
        SaveUserPermissionIndividual();
    }
    console.log(window.location.href);
}



var SaveCompensationBenefittInfo = function () {
    if (CommonUiValidation()) {
        var url = "/Employee/SaveEmployeeFacility";
        var param = {
            Id: $("#Id").val(),

            ProvidentFundStatus: $("#ProvidentFundStatus").val(),
            GratuityFundStatus: $("#GratuityFundStatus").val(),
            WorkersParticipationFundStatus: $("#WorkersParticipationFundStatus").val(),
            WorkersWelfareFundStatus: $("#WorkersWelfareFundStatus").val(),
            LifeInsuranceStatus: $("#LifeInsuranceStatus").val(),
            GroupInsuranceStatus: $("#GroupInsuranceStatus").val(),
            SalesBonusStatus: $("#SalesBonusStatus").val(),
            PerformanceBonusStatus: $("#PerformanceBonusStatus").val(),
            TransportStatus: $("#TransportStatus").val(),
            CanteenStatus: $("#CanteenStatus").val(),
            WeekendCompensationStatus: $("#WeekendCompensationStatus").val(),
            CompensationLeaveStatus: $("#CompensationLeaveStatus").val(),
            OvertimeStatus: $("#OvertimeStatus").val(),
            LaptopStatus: $("#LaptopStatus").val(),
        };
        console.log(param);
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data.success) {
                    POSModal.Hide();
                    OpenSuccessMessageNew("Success!", "Saved Successfully!")
                    
                } else {
                    OpenErrorMessageNew("Failed!", data.message)
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }
}
var SaveSalaryInfoInEmpProfTbl = function () {
    POSModal.Show();
    var url = "/Employee/SaveEmployeeSalary";
    
    var param = {
        Id: $("#Id").val(),
        GrossSalary: $("#GrossSalary").val(),
        BasicSalary: $("#BasicSalary").val(),
        HouseRent: $("#HouseRent").val(),
        TransportAllowance: $("#TransportAllowance").val(),
        MedicalAllowance: $("#MedicalAllowance").val(),
        FoodAllowance: $("#FoodAllowance").val(),
        BonusAllowance: $("#BonusAllowance").val(),
        OthersAllowance: $("#OthersAllowance").val(),
       
    };
    console.log('status:' + $("#Status").val());
    $.ajax({
        type: 'post',
        url: url,
        data: param,
        success: function (data) {
            POSModal.Hide();
            console.log(data);
            if (data.result) {
                OpenSuccessMessageNew("Success!", "Saved Successfully")
            } else {
                OpenErrorMessageNew("Failed!", data.message)
            }
        },
        error: function (request, error) {
            POSModal.Hide();
            console.log("Server Error")
        }
    });
}
var SaveUserPermissionIndividual = function () { 
        POSModal.Show();
    var url = "/Employee/SaveUserPermissionIndividual";
        var param = {
            id: $("#EmployeeId").val(),
            permissiongroupid: $("#PermissionGroupId").val()
        };
        console.log('status:' + $("#Status").val());
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                POSModal.Hide();
                console.log(data);
                if (data.result) {
                    OpenSuccessMessageNew("Success!", "Saved Successfully")
                } else {
                    OpenErrorMessageNew("Failed!", data.message)
                }
            },
            error: function (request, error) {
                POSModal.Hide();
                console.log("Server Error")
            }
        });

    
}



var SaveEmployeeProfile = function () {
    if (CommonUiValidation() /*&& EmployeeProNIDNumberValidation()*/) {
        POSModal.Show();
       
        var param = {
            Id: $("#Id").val(),
            EmployeeName: $("#EmployeeName").val(),
            FatherName: $("#FatherName").val(),
            MotherName: $("#MotherName").val(),
            Designation: $("#Designation").val(),
            AssignedCounter: $("#AssignedCounter").val(),
            UserName: $("#RegNo").val(),
            RegNo: $("#RegNo").val(),
            OldIdNo: $("#OldIdNo").val(),
            Password: $("#Password").val(),
            PhoneNumber: $("#PhoneNumber").val(),
            PermissionGroupId: $("#PermissionGroupId").val(),
            ProfilePicture: $("#employeepicture_pro").val(),
            Sale: $("#SaleTransactionType").val(),
            HasStopTimerPermission: $("#HasStopTimerPermission").is(':checked'),
            HasLimitedAccess: $("#HasLimitedAccess").is(':checked'),
            Email: $("#Email").val(),
            NID: $("#NID").val(),
            PresentCountry: $("#PresentCountry").val(),
            PresentDistrict: $("#PresentDistrict").val(),
            PresentCity: $("#CityDropdown").val(),
            PresentZip: $("#PresentZip").val(),
            PresentStreet: $("#PresentStreet").val(),
            ParmanentDistrict: $("#ParmanentDistrict").val(),
            ParmanentCity: $("#ParmanentCityDropdown").val(),
            ParmanentZip: $("#ParmanentZip").val(),
            ParmanentStreet: $("#ParmanentStreet").val(),
            ParmanantCountry: $("#CountryParmanant").val(),
            BirthId: $("#BirthId").val(),
            BranchId: $("#BranchId").val(),
            JoiningDate: $("#JoiningDate").val(),
            IsActive: $("#IsActive").is(':checked'),
            IsSupervisor: $("#IsSupervisor").is(':checked'),
            Sex: $("#Sex").val(),
            Religion: $("#Religion").val(),
            Nationality: $("#Nationality").val(),
            PassportNo: $("#PassportNo").val(),
            DrivingLicense: $("#DrivingLicense").val(),
            TinNumber: $("#tinnumber").val(),
            OfficialNumber: $("#OfficialNumber").val(),
            OfficialEmail: $("#OfficialEmail").val(),
            BloodGroup: $("#BloodGroup").val(),
            FunctionalRoleDesign: $("#FunctionalRoleDesign").val(),
            ServiceConfirmDueDate: $("#ServiceConfirmDueDate").val(),
            ServiceLengthSinceJoin: $("#ServiceLengthSinceJoin").val(),
            TransferTo: $("#TransferTo").val(),
            TransferFrom: $("#TransferFrom").val(),
            TransferEffective: $("#TransferEffective").val(),
            PalceOfPosting: $("#PalceOfPosting").val(),
            CountryOfPosting: $("#CountryOfPosting").val(),
            LastPromotion: $("#LastPromotion").val(),
            DurationFromLastPromotion: $("#DurationFromLastPromotion").val(),
            DurationServiceConfirmDueDate: $("#DurationServiceConfirmDueDate").val(),
            IncrementAmount: $("#IncrementAmount").val(),
            IncrementEffectiveDate: $("#IncrementEffectiveDate").val(),
            DisciplinaryRecord: $("#DisciplinaryRecord").val(),
            EmployeeTransitionReport: $("#EmployeeTransitionReport").val(),
            LastEducation: $("#LastEducation").val(),
            FatherName: $("#FatherName").val(),
            FatherOccupation: $("#FatherOccupation").val(),
            MotherName: $("#MotherName").val(),
            MotherOccupation: $("#MotherOccupation").val(),
            MaritalStatus: $("#MaritalStatus").val(),
            SpouseName: $("#SpouseName").val(),
            SpouseOccupation: $("#SpouseOccupation").val(),
            EducationYear: $("#EducationYear").val(),
            Status: $("#Status").val(),
            RFID: $("#RFID").val(),
            BirthId: $("#BirthId").val(),
            DisabilityStatus: $("#DisabilityStatus").val(),
            DateOfBirth: $("#DateOfBirth").val(),
            TaxStatus: $("#TaxStatus").val(),
            HrCompanyId: $('#HrCompanyId').length > 0 ? $('#HrCompanyId').val() : 0

        };
        console.log(param);
        var url = "/Employee/SaveNewEmployeeProfile";
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                POSModal.Hide();
                if (data.success) {
                    OpenSuccessMessageNew("Success!", "Saved Successfully")
                } else {
                    OpenErrorMessageNew("Failed!", data.message)
                }
            },
            error: function (request, error) {
                POSModal.Hide();
                console.log("Server Error")
            }
        });

    }
}
var UpdateEmployeeProfileSubmit = function () {
    if (CommonUiValidation() /*&& EmployeeProNIDNumberValidation()*/) {
        POSModal.Show();
        var url = "/Employee/SaveNewEmployeeProfile";
        debugger;
        var param = {
            Id: $("#Id").val(),
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
            Designation: $("#Designation").val(),
            AssignedCounter: $("#AssignedCounter").val(),
            UserName: $("#RegNo").val(),
            RegNo: $("#RegNo").val(),
            OldIdNo: $("#OldIdNo").val(),
            Password: $("#Password").val(),
            PhoneNumber: $("#PhoneNumber").val(),
            PermissionGroupId: $("#PermissionGroupId").val(),
            ProfilePicture: $("#employeepicture_pro").val(),
            Sale: $("#SaleTransactionType").val(),
            HasStopTimerPermission: $("#HasStopTimerPermission").is(':checked'),
            HasLimitedAccess: $("#HasLimitedAccess").is(':checked'),
            Email: $("#Email").val(),
            NID: $("#NID").val(),
            PresentCountry: $("#PresentCountry").val(),
            PresentDistrict: $("#PresentDistrict").val(),
            PresentCity: $("#CityDropdown").val(),
            PresentZip: $("#PresentZip").val(),
            PresentStreet: $("#PresentStreet").val(),
            ParmanentDistrict: $("#ParmanentDistrict").val(),
            ParmanantCountry: $("#CountryParmanant").val(),
            ParmanentCity: $("#ParmanentCityDropdown").val(),
            ParmanentZip: $("#ParmanentZip").val(),
            ParmanentStreet: $("#ParmanentStreet").val(),
            BranchId: $("#BranchId").val(),
            JoiningDate: $("#JoiningDate").val(),
            IsActive: $("#IsActive").is(':checked'),
            IsSupervisor: $("#IsSupervisor").is(':checked'),
            Sex: $("#Sex").val(),
            Religion: $("#Religion").val(),
            Nationality: $("#Nationality").val(),
            PassportNo: $("#PassportNo").val(),
            DrivingLicense: $("#DrivingLicense").val(),
            TinNumber: $("#tinnumber").val(),
            OfficialNumber: $("#OfficialNumber").val(),
            OfficialEmail: $("#OfficialEmail").val(),
            BloodGroup: $("#BloodGroup").val(),
            FunctionalRoleDesign: $("#FunctionalRoleDesign").val(),
            ServiceConfirmDueDate: $("#ServiceConfirmDueDate").val(),
            ServiceLengthSinceJoin: $("#ServiceLengthSinceJoin").val(),
            TransferTo: $("#TransferTo").val(),
            TransferFrom: $("#TransferFrom").val(),
            TransferEffective: $("#TransferEffective").val(),
            PalceOfPosting: $("#PalceOfPosting").val(),
            CountryOfPosting: $("#CountryOfPosting").val(),
            LastPromotion: $("#LastPromotion").val(),
            DurationFromLastPromotion: $("#DurationFromLastPromotion").val(),
            DurationServiceConfirmDueDate: $("#DurationServiceConfirmDueDate").val(),
            SixMounthCompletionDate: $("#SixMounthCompletionDate").val(),
            OneYearCompletionDate: $("#OneYearCompletionDate").val(),
            FiveYearCompletionDate: $("#FiveYearCompletionDate").val(),
            TenYearCompletionDate: $("#TenYearCompletionDate").val(),
            FifteenYearCompletionDate: $("#FifteenYearCompletionDate").val(),
            LastIncrementDate: $("#LastIncrementDate").val(),
            IncrementAmount: $("#IncrementAmount").val(),
            IncrementEffectiveDate: $("#IncrementEffectiveDate").val(),
            DisciplinaryRecord: $("#DisciplinaryRecord").val(),
            EmployeeTransitionReport: $("#EmployeeTransitionReport").val(),
            LastEducation: $("#LastEducation").val(),
            FatherName: $("#FatherName").val(),
            FatherOccupation: $("#FatherOccupation").val(),
            MotherName: $("#MotherName").val(),
            MotherOccupation: $("#MotherOccupation").val(),
            MaritalStatus: $("#MaritalStatus").val(),
            SpouseName: $("#SpouseName").val(),
            SpouseOccupation: $("#SpouseOccupation").val(),
            EducationYear: $("#EducationYear").val(),
            Status: $("#Status").val(),
            HrCompanyId: $('#HrCompanyId').length > 0 ? $('#HrCompanyId').val() : 0,
            IsSubmit: $("#btnSubmitButton").length > 0 ? true : false
        };
        OpenConfirmationMessageNew("Warning", "Are you sure, you want to update profile and you can't change anything?", function () {
            $.ajax({
                type: 'post',
                url: url,
                data: param,
                success: function (data) {
                    POSModal.Hide();
                    if (data.success) {
                        OpenSuccessMessageNew("Success!", "Saved Successfully")
                    } else {
                        OpenErrorMessageNew("Failed!", data.message)
                    }
                },
                error: function (request, error) {
                    POSModal.Hide();
                    console.log("Server Error")
                }
            });
        }, function () {
            console.log('no');
            window.location.reload();
        })

    }
}

var TabPopStateCheck = false;
var windowHashChange = function () {
    /*This one is ued for loading tab from url*/
    if ($("[tabname='" + top.location.hash + "']").length > 0) {
        console.log($("[tabname='" + top.location.hash + "']"));
        TabPopStateCheck = true;
        $("[tabname='" + top.location.hash + "']").click();
    }
}
var DownloadEmployeeProfile = function (idd) {
    OpenConfirmationMessageNew('Warning!', 'Are you sure?', function () {
        var parm = $('#Id').val();
        window.location.href = '/Mgmt/PrintEmployee?Id=' + parm;
    })
}
function validatePhoneNumber(input) {
    var phoneNumber = input.value;
    if (phoneNumber.length > 11) {
        input.value = phoneNumber.slice(0, 11);
    }
    if (phoneNumber.length !== 11) {
        input.setCustomValidity("Phone number must be exactly 11 digits.");
    } else {
        input.setCustomValidity("");
    }
}
//var EmployeeProPhoneNumberValidation = function () {
//    var result = true;
//    if ($("#PhoneNumber").val() == "" || $("#PhoneNumber").val() == undefined || $("#PhoneNumber").val() == null) {
//        $("#PhoneNumber").attr("style", "border-color:red;");
//        result = false;
//    }
//    else {
//        var pattern = "^(?:\\+88|88)?(01[3-9]\\d{8})$";
//        var StrMobile = $("#PhoneNumber").val();
//        if (StrMobile.match(pattern)) {
//            $("#PhoneNumber").attr("style", "border-color:none;");
//        }
//        else {
//            $("#PhoneNumber").attr("style", "border-color:red;");
//            result = false;
//        }
//    }
//    return result;
//}
//var EmployeeProNIDNumberValidation = function () {
//    var result = true;
//    if ($("#NID").val() == "" || $("#NID").val() == undefined || $("#NID").val() == null) {
//        $("#NID").attr("style", "border-color:red;");
//        result = false;
//    }
//    else {
//        var pattern = "^(\\d{10}|\\d{13})$" ; // Corrected regular expression pattern
//        var StrMobile = $("#NID").val();
//        if (StrMobile.match(pattern)) {
//            $("#NID").attr("style", "border-color:none;");
//        }
//        else {
//            $("#NID").attr("style", "border-color:red;");
//            result = false;
//        }
//    }
//    return result;
//}
var handleCountryChange = function () {
    var selectedValue = $("#PresentCountry").val();
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
var handleCountryPermanantChange = function () {
    var selectedValue = $("#CountryParmanant").val();
    if (selectedValue !== '-1') {
        $.ajax({
            url: "/Employee/FindingDistrictThroughCountryPrevious",
            type: 'post',
            data: { Country: selectedValue.replace(/\s+/g, " ") },
            success: function (data) {
                if (data.result && data.country === selectedValue) {
                    var district = $("#ParmanentDistrict");
                    district.empty();
                    district.append('<option value="-1">District</option>');
                    $.each(data.model, function (index, item) {
                        district.append('<option value="' + item.value + '">' + item.text + '</option>');
                    });
                } else {
                    $("#ParmanentDistrict").empty().append('<option value="-1">District</option>');
                }
            }
        });
    } else {
        $("#ParmanentDistrict").empty().append('<option value="-1">District</option>');
    }
}
var handleDistrictChange = function () {
    var selectedValue = $("#PresentDistrict").val();
    if (selectedValue !== '-1') {
        $.ajax({
            url: "/Employee/FindingCityThroughDistrict",
            type: 'post',
            data: { District: selectedValue.replace(/\s+/g, " ") },
            success: function (data) {
                if (data.result && data.district === selectedValue) {
                    var cityDropdown = $("#CityDropdown");
                    cityDropdown.empty();
                    cityDropdown.append('<option value="-1">City</option>');
                    $.each(data.model, function (index, item) {
                        cityDropdown.append('<option value="' + item.value + '">' + item.text + '</option>');
                    });
                } else {
                    $("#CityDropdown").empty().append('<option value="-1">City</option>');
                }
            }
        });
    } else {
        $("#CityDropdown").empty().append('<option value="-1">City</option>');
    }
}
var handlePERDistrictChange = function () {
    var selectedValue = $("#ParmanentDistrict").val();
    if (selectedValue !== '-1') {
        $.ajax({
            url: "/Employee/FindingCityThroughDistrictforpermanent",
            type: 'post',
            data: { District: selectedValue.replace(/\s+/g, " ") },
            success: function (data) {
                if (data.result && data.district === selectedValue) {
                    var cityDropdown = $("#ParmanentCityDropdown");
                    cityDropdown.empty();
                    cityDropdown.append('<option value="-1">City</option>');
                    $.each(data.model, function (index, item) {
                        cityDropdown.append('<option value="' + item.value + '">' + item.text + '</option>');
                    });
                } else {
                    $("#ParmanentCityDropdown").empty().append('<option value="-1">City</option>');
                }
            }
        });
    } else {
        $("#ParmanentCityDropdown").empty().append('<option value="-1">City</option>');
    }
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

$(document).ready(function () {
    $(".employee_profile_scroll").height(window.innerHeight - 220);
    console.log('EmployeeProScript')
    DateOfBirth = new Pikaday({
        field: document.getElementById('DateOfBirth'),
        format: 'MM-DD-YYYY',
        trigger: $('#DateOfBirth')[0] //, firstDay: 1
    });
   
    $("#PresentDistrict").change(function () {
        handleDistrictChange();
    });
    $("#ParmanentDistrict").change(function () {
        handlePERDistrictChange();
    });
    //$("#Country").change(function () {
    //    handleCountryChange();
    //});
    $("#CountryParmanant").change(function () {
        handleCountryPermanantChange();
    });
    $("#PresentCountry").change(function () {
        handleCountryPermanantChange();
    });

    $('#DateRangeRev').val('1').change();
    $('#uploadprofilelogo_pro').change(function (event) {
        var fd = new FormData();
        const files = event.target.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                fd.append('File', files[i]);
                event.target.value = "";
            }
            OpenConfirmationMessageNew("Warning", "Are you sure?", function () {
                SaveProfilePicturePro(fd);
            })
        }
    });
   
    $('#PermissionGroupId').change(function (event) {
        $("#Designation").val($.trim($('#PermissionGroupId option:selected').text()))
    });
    $("#add_pro_logo_pro").click(function () {
        $("#uploadprofilelogo_pro").click()
    })
    JoiningDate = new Pikaday({
        field: document.getElementById('JoiningDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#JoiningDate')[0], firstDay: 1
    });

    ServiceLengthSinceJoin = new Pikaday({
        field: document.getElementById('ServiceLengthSinceJoin'),
        format: 'DateFormat',
        trigger: $('#ServiceLengthSinceJoin')[0], firstDay: 1
    });
    LastPromotion = new Pikaday({
        field: document.getElementById('LastPromotion'),
        format: 'MM-DD-YYYY',
        trigger: $('#LastPromotion')[0], firstDay: 1
    });
    DurationFromLastPromotion = new Pikaday({
        field: document.getElementById('DurationFromLastPromotion'),
        format: 'MM-DD-YYYY',
        trigger: $('#DurationFromLastPromotion')[0], firstDay: 1
    });
    DurationServiceConfirmDueDate = new Pikaday({
        field: document.getElementById('DurationServiceConfirmDueDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#DurationServiceConfirmDueDate')[0], firstDay: 1
    });
    SixMounthCompletionDate = new Pikaday({
        field: document.getElementById('SixMounthCompletionDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#SixMounthCompletionDate')[0], firstDay: 1
    });
    OneYearCompletionDate = new Pikaday({
        field: document.getElementById('OneYearCompletionDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#OneYearCompletionDate')[0], firstDay: 1
    });
    FiveYearCompletionDate = new Pikaday({
        field: document.getElementById('FiveYearCompletionDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#FiveYearCompletionDate')[0], firstDay: 1
    });
    TenYearCompletionDate = new Pikaday({
        field: document.getElementById('TenYearCompletionDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#TenYearCompletionDate')[0], firstDay: 1
    });
    FifteenYearCompletionDate = new Pikaday({
        field: document.getElementById('FifteenYearCompletionDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#FifteenYearCompletionDate')[0], firstDay: 1
    });
    LastIncrementDate = new Pikaday({
        field: document.getElementById('LastIncrementDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#LastIncrementDate')[0], firstDay: 1
    });
    IncrementEffectiveDate = new Pikaday({
        field: document.getElementById('IncrementEffectiveDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#IncrementEffectiveDate')[0], firstDay: 1
    });
    $("#add_pass_btn").click(function () {
        $(".add_pass_con_block").show(500);
    });
    $("#pass_con_close").click(function () {
        $(".add_pass_con_block").hide(500);
    });
    $('.nav-item a').click(function (e) {
        if (!TabPopStateCheck) {
            window.history.pushState({ urlPath: window.location.pathname }, "", $(e.target).attr('tabname'));
        }
        TabPopStateCheck = false;
    });

    if (top.location.hash != '') {
        windowHashChange();
    }
    else {
        $("#pro_tab").click();
    }
})
$(window).on('hashchange', function (e) {
    windowHashChange();
});
$(window).resize(function () {
    $(".employee_profile_scroll").height(window.innerHeight - 220);
});

