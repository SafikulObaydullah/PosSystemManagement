function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
var getClientTimeZone = function () {
    var currentzone = new Date().getTimezoneOffset(), number = Math.abs(currentzone);
    return (currentzone < 0 ? "P " : "N ") + ("00" + Math.floor(number / 60)).slice(-2) + ":" + ("00" + (number % 60)).slice(-2);
}
var SignIn = function () {
    var requestData = {
        UserName: $("#inputEmail").val(),
        Password: $("#inputPassword").val(),
        ClientTimeZone: encodeURI(String(getClientTimeZone()))
    }
    var url = '/Login/CheckUser';
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(requestData),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data);
            if (data.result === true)
                window.location = "/dashboard";
            else {
                alert(data.message);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
var ForgotPassword = function () {
    var param = JSON.stringify({
        UserEmail: $("#txtUserEmail").val(),
    });
    var url = '/Login/SendVerificationEmail';
    $.ajax({
        url: url,
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data);
            if (data.issuccessfullysend == true) {
                $("#ForgotPasswordDiv").addClass("hidden");
                $("#ForgotPasswordMsgDiv").removeClass("hidden");
            }
            else {
                $(".lblError").text(data.message);
                $(".lblError").removeClass("hidden");
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
var PasswordEmptyCheck = function () {
    if ($("#Password").val() == "" || $("#Password").val() == "") {
        $(".lblEmptyPassword").removeClass("hidden");
        return false;
    }
    else {
        $(".lblEmptyPassword").addClass("hidden");
        return true;
    }
}
var PasswordMatchCheck = function () {
    if ($("#Password").val() == $("#ConfirmPassword").val()) {
        $(".lblConfirmPassword").addClass("hidden");
        return true;
    }
    else {
        $(".lblConfirmPassword").removeClass("hidden");
        return false;
    }
}
var ResetPassword = function () {
    var param = JSON.stringify({
        ResetPasswordToken: $("#ResetPasswordToken").val(),
        Password: $("#Password").val()
    });
    var url = '/Login/ResetPass';
    $.ajax({
        url: url,
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.result == true) {
                $("#ResetPasswordDiv").addClass("hidden");
                $("#ResetPasswordMsgDiv").removeClass("hidden");
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
$(document).ready(function () {
    $("#btn-sign-in").click(function () {
        SignIn();
    });
    $('.login-text').keydown(function (e) {
        if (e.keyCode === 13) {
            SignIn();
        }
    });
    $("#BtnSendVerification").click(function () {
        if ($("#txtUserEmail").val() != "") {
            $(".lblError").addClass("hidden");
            ForgotPassword();
        }
        else {
            $(".lblError").text("User Name/ Email cannot be empty.");
            $(".lblError").removeClass("hidden");
        }
    });
    $('.forgot-text').blur(function () {
        if ($("#txtUserEmail").val() != "") {
            $(".lblError").addClass("hidden");
        }
        else {
            $(".lblError").text("User Name/ Email cannot be empty.");
            $(".lblError").removeClass("hidden");
        }
    });
    $('.forgot-text').keydown(function (e) {
        if (e.keyCode === 13) {
            if ($("#txtUserEmail").val() != "") {
                $(".lblError").addClass("hidden");
                ForgotPassword();
            }
            else {
                $(".lblError").text("User Name/ Email cannot be empty.");
                $(".lblError").removeClass("hidden");
            }
        }
    });
    $("#ConfirmPassword").blur(function () {
        PasswordMatchCheck();
    });
    $("#btnReset").click(function () {
        if (PasswordEmptyCheck()) {
            if (PasswordMatchCheck()) {
                ResetPassword();
            }
        }
    });
});

