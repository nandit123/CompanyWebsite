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

function printPdf() {
    var doc = new jsPDF();
    // You can use html:
    doc.autoTable({
        html: '#dataTable',
        didDrawCell: data => {
            if (data.section === 'body' && data.column.index === 4) {
               var base64Img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOCSURBVO3BS6rkWgIEQY+D9r9l7xo86BgJhDJvfQiz+Asz/znMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUi5eS8JNU3khCU7mThKbSktBUWhJ+ksobh5lymCmHmXLxYSqflIQ7SWgqd1TuJOEJlSdUPikJn3SYKYeZcpgpF1+WhCdU3khCU2lJuKNyJwl3VJ5IwhMq33SYKYeZcpgpF/8YlZaEpnInCU2lqfzLDjPlMFMOM+XiL6fSktBUvikJTeVvdpgph5lymCkXX6byOyWhqTyRhKbySSp/ksNMOcyUw0y5+LAk/KQkNJWWhDtJaCotCZ+UhD/ZYaYcZsphpsRf+Isl4Q2V+b/DTDnMlMNMuXgpCU3lk5LQVO6oPJGEJ1TuJOGOyp0kPKHySYeZcpgph5ly8WVJuKPSktBUWhLuJKGpPKHSktCS0FTuqLQk/MkOM+UwUw4z5eLDktBU7iShqbQkNJWWhKbSkvBNSWgqn6TSktCS0FTeOMyUw0w5zJSLl1RaEu4koam0JDSVloQnVO4k4QmVO0m4o3InCXdUWhI+6TBTDjPlMFMuXkrCnSQ0lZaEO0loKk8k4Q2VloQ7Ki0JT6j8ToeZcpgph5ly8WEqT6g8kYQ3VJ5IwhsqLQlN5YkkNJVPOsyUw0w5zJSLP0wS7qjcScKdJNxReSMJTeWJJDSVO0loKm8cZsphphxmysWXJeENlZaEpvKGyhsqT6i0JDSVloSm0pLwSYeZcpgph5ly8WUqLQlN5U4SmkpLwh2VloQnVFoSWhJ+J5VPOsyUw0w5zJSLl1SeUHlC5QmVloSm0pJwR+UJlSeS8Cc5zJTDTDnMlPgLLyThJ6m8kYSm8kYSmkpLQlNpSbijcicJTeWNw0w5zJTDTLn4MJVPSsInqbQk3FFpSXhC5QmVO0n4psNMOcyUw0y5+LIkPKHyRhLuqNxRaUl4IglvJOF3OsyUw0w5zJSLf5zKHZWfpHInCU2lJeGbDjPlMFMOM+XiH5eEJ1SaSktCU3kiCU2lqbQkNJWWhE86zJTDTDnMlIsvU/mTqdxJQlNpSWgqLQl3ktBUmspPOsyUw0w5zJSLD0vCT0pCU3kjCZ+k8kQSmspPOsyUw0w5zJT4CzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/ATsFhRq9EiSwAAAAAElFTkSuQmCC";
               doc.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10);
            }
         }
    });
    // doc.autoTable({
    //     didDrawCell: data => {
    //        if (data.section === 'body' && data.column.index === 4) {
    //           var base64Img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOCSURBVO3BS6rkWgIEQY+D9r9l7xo86BgJhDJvfQiz+Asz/znMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUi5eS8JNU3khCU7mThKbSktBUWhJ+ksobh5lymCmHmXLxYSqflIQ7SWgqd1TuJOEJlSdUPikJn3SYKYeZcpgpF1+WhCdU3khCU2lJuKNyJwl3VJ5IwhMq33SYKYeZcpgpF/8YlZaEpnInCU2lqfzLDjPlMFMOM+XiL6fSktBUvikJTeVvdpgph5lymCkXX6byOyWhqTyRhKbySSp/ksNMOcyUw0y5+LAk/KQkNJWWhDtJaCotCZ+UhD/ZYaYcZsphpsRf+Isl4Q2V+b/DTDnMlMNMuXgpCU3lk5LQVO6oPJGEJ1TuJOGOyp0kPKHySYeZcpgph5ly8WVJuKPSktBUWhLuJKGpPKHSktCS0FTuqLQk/MkOM+UwUw4z5eLDktBU7iShqbQkNJWWhKbSkvBNSWgqn6TSktCS0FTeOMyUw0w5zJSLl1RaEu4koam0JDSVloQnVO4k4QmVO0m4o3InCXdUWhI+6TBTDjPlMFMuXkrCnSQ0lZaEO0loKk8k4Q2VloQ7Ki0JT6j8ToeZcpgph5ly8WEqT6g8kYQ3VJ5IwhsqLQlN5YkkNJVPOsyUw0w5zJSLP0wS7qjcScKdJNxReSMJTeWJJDSVO0loKm8cZsphphxmysWXJeENlZaEpvKGyhsqT6i0JDSVloSm0pLwSYeZcpgph5ly8WUqLQlN5U4SmkpLwh2VloQnVFoSWhJ+J5VPOsyUw0w5zJSLl1SeUHlC5QmVloSm0pJwR+UJlSeS8Cc5zJTDTDnMlPgLLyThJ6m8kYSm8kYSmkpLQlNpSbijcicJTeWNw0w5zJTDTLn4MJVPSsInqbQk3FFpSXhC5QmVO0n4psNMOcyUw0y5+LIkPKHyRhLuqNxRaUl4IglvJOF3OsyUw0w5zJSLf5zKHZWfpHInCU2lJeGbDjPlMFMOM+XiH5eEJ1SaSktCU3kiCU2lqbQkNJWWhE86zJTDTDnMlIsvU/mTqdxJQlNpSWgqLQl3ktBUmspPOsyUw0w5zJSLD0vCT0pCU3kjCZ+k8kQSmspPOsyUw0w5zJT4CzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/ATsFhRq9EiSwAAAAAElFTkSuQmCC";
    //           doc.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10);
    //        }
    //     }
    // });
    doc.save('table.pdf');
}