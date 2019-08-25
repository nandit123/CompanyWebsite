$("#registerSuccess").hide();

$("#registerForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/registerForm",
        data: dataString
    }).always(function(data){
        setTimeout(function () {
            $('#registerForm')[0].reset();
            $("#registerSuccess").show();
            if (data == "Data added") {
                $("#registerSuccess").text('Registeration Success, Check your email for Verification Link!')
            } else if (data == "alreadyAdded") {
                $("#registerSuccess").text('Registeration Failed, Email already in use.')
            } else {
                $("#registerSuccess").text('Registeration Failed.')
            }
        }, 1000);
    });
});

$("#loginForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $("#loginMessage").text('')
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/loginForm",
        data: dataString
    }).always(function(data){
	data = JSON.parse(data);
        if (data.status == "found") {
                dataString = data;
                $.ajax({
                    type: "POST",
                    url: "http://www.buytrue.in/sessionStart",
                    data: dataString
                }).always(function(data){
                    window.location.href = "dashboard";
                });
        } else if (data.status == "foundButNotVerified") {
            $("#loginMessage").text('Please verify your account.')
        } else if (data.status == "foundButNotPaid") {
            $("#loginMessage").text('Please pay the account fee.')
        } else {
            $("#loginMessage").text('Login failed, Incorrect Details.')
        }
    });
});

$("#addProductForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $("#addProductMessage").text('');
    dataString = dataString + '&companyId=' + $('#companyId').text();
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/addProductForm",
        data: dataString
    }).always(function(data){
        if (data == "added") {
                window.location.href = "products";
        } else {
            $("#addProductMessage").text('Product title already in use.')
        }
    });
});

$("#updateProductForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $("#updateProductMessage").text('');
    dataString = dataString + '&companyId=' + $('#companyId').text() + '&productTitle=' + $('#productTitle').text();
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/updateProductForm",
        data: dataString
    }).always(function(data){
        data = JSON.parse(data);
        if (data.status == "added") {
                var dataString = "title=" + data.title + "&picture=" + data.picture + "&description=" + data.description;
                window.location.href = "currentProduct?" + dataString;
        } else {
            $("#updateProductMessage").text('Product title already in use.')
        }
    });
});

$("#deleteProductForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $("#deleteProductMessage").text('');
    dataString = 'companyId=' + $('#companyId').text() + '&productTitle=' + $('#productTitle').text();
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/deleteProductForm",
        data: dataString
    }).always(function(data){
        window.location.href = "products";
    });
});

$("#addCodesForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    dataString = dataString + '&companyId=' + $('#companyId').text() + '&productTitle=' + $('#productTitle').text();
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/addCodesForm",
        data: dataString
    }).always(function(data){
        if (data == "added") {
            window.location.href = 'currentProduct?title=' + $('#productTitle').text();
        } else {
        }
    });
});

$(".productsTable tr").click(function() {
    var cells = $(this).closest("tr").children("td");
    var cell1 = cells.eq(0).text();

    var dataString = "title=" + cell1;
    if (cell1 != '') {
        window.location.href = "currentProduct?" + dataString;
    }
});

$("#updateSettingsForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/updateSettingsForm",
        data: dataString
    }).always(function(data){
            data = JSON.parse(data);
            if (data.status == "updated") {
                window.location.href = "settings";
            } else {
                window.location.href = "settings";
            }
    });
});

$("#verifyAccountForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/verifyAccountForm",
        data: dataString
    }).always(function(data){
        setTimeout(function () {
            $('#verifyAccountForm')[0].reset();
            if (data == "emailSent") {
                $("#emailSentSuccess").text('Check your email for Verification Link!')
            } else {
                $("#emailSentSuccess").text('Email cant be sent.')
            }
        }, 1000);
    });
});

$("#forgotPasswordEmailForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/forgotPasswordEmailForm",
        data: dataString
    }).always(function(data){
        setTimeout(function () {
            $('#forgotPasswordEmailForm')[0].reset();
            if (data == "emailSent") {
                $("#passwordEmailSentSuccess").text('Check your email for Password Change Link!')
            } else {
                $("#passwordEmailSentSuccess").text('Email cant be sent.')
            }
        }, 1000);
    });
});

$("#resetPasswordForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $.ajax({
        type: "POST",
        url: "http://www.buytrue.in/resetPasswordForm",
        data: dataString + '&passwordResetCode=' + $('#passwordResetCode').text()
    }).always(function(data){
        setTimeout(function () {
            $('#resetPasswordForm')[0].reset();
            if (data == "passwordChanged") {
                window.location.href = "login";
            } else {
                $("#newPasswordSuccess").text('Password reset error.')
            }
        }, 1000);
    });
});
