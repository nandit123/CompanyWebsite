$("#registerSuccess").hide();

$("#registerForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/companyUser/register",
        data: dataString
    }).always(function(data){
        setTimeout(function () {
            $('#registerForm')[0].reset();
            $("#registerSuccess").show();
            console.log(data);
            if (data.responseText == "Data added") {
                $("#registerSuccess").text('Registeration Success, Now login.')
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
        url: "http://localhost:3333/companyUser/login",
        data: dataString
    }).always(function(data){
        // console.log(data);
        if (data.status == "found") {
                // window.location.href = "dashboard";
                // console.log('email is: ', data.email);
                console.log('output data is: ', data);
                dataString = data;
                console.log('dataString is: ', dataString);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/sessionStart",
                    data: dataString
                }).always(function(data){
                    console.log('data going to dashboard is: ', data);
                    window.location.href = "dashboard";
                });
        } else {
            $("#loginMessage").text('Login failed.')
        }
    });
});
