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
            } else if (data.responseText == "alreadyAdded") {
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
            $("#loginMessage").text('Login failed, Incorrect Details.')
        }
    });
});

$("#addProductForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $("#addProductMessage").text('');
    console.log('helo');
    dataString = dataString + '&companyId=' + $('#companyId').text();
    console.log('companyId is: ', $('#companyId').text());
    console.log('dataString is: ', dataString);
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/product/create",
        data: dataString
    }).always(function(data){
        console.log('adding or not: ', data);
        if (data.responseText == "added") {
                console.log('output data is: ', data);
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
    console.log('helo');
    dataString = dataString + '&companyId=' + $('#companyId').text() + '&productTitle=' + $('#productTitle').text();
    // console.log('companyId is: ', $('#companyId').text());
    // console.log('dataString is: ', dataString);
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/product/update",
        data: dataString
    }).always(function(data){
        console.log('adding or not: ', data);
        if (data.status == "added") {
                console.log('output data is: ', data);
                
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
    console.log('helo: ', dataString);
    dataString = 'companyId=' + $('#companyId').text() + '&productTitle=' + $('#productTitle').text();
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/product/deleteProduct",
        data: dataString
    }).always(function(data){
        console.log('output data is: ', data);
        window.location.href = "products";
    });
});

$("#addCodesForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    // $("#addProductMessage").text('');
    dataString.companyId = $('#companyId').text();
    dataString.productTitle = $('#productTitle').text();
    console.log('helo');
    dataString = dataString + '&companyId=' + $('#companyId').text() + '&productTitle=' + $('#productTitle').text();
    console.log('companyId is: ', $('#companyId').text());
    console.log('dataString is: ', dataString);
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/code/addCodes",
        data: dataString
    }).always(function(data){
        console.log('adding or not: ', data);
        if (data.responseText == "added") {
                console.log('output data is: ', data);
                window.location.href = "";
        } else {
            $("#addProductMessage").text('Product title already in use.')
        }
    });
});

$(".productsTable tr").click(function() {
    var cells = $(this).closest("tr").children("td");
    var cell1 = cells.eq(0).text();
    var cell2 = cells.eq(1).text();
    var cell3 = cells.eq(2).text();
    var cell4 = cells.eq(3).text();
    // var cell5 = cells.eq(4).text();
    
    // console.log('cell5 is ', cell5);
    var dataString = "title=" + cell1 + "&picture=" + cell2 + "&description=" + cell3 + "&totalCodes=" + cell4;
    if (cell1 != '' && cell2 != '') {
        window.location.href = "currentProduct?" + dataString;
    }
});

$("#updateSettingsForm").on('submit',function(event) {
    event.preventDefault(); // to prevent default page reloading
    var dataString = $(this).serialize(); // to get the form data
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/companyUser/updateCompanyInfo",
        data: dataString
    }).always(function(data){
        // setTimeout(function () {
            // $('#registerForm')[0].reset();
            // $("#registerSuccess").show();
            console.log(data);
            if (data.status == "updated") {
                window.location.href = "settings";
            } else {
                console.log("updateFailed");
                window.location.href = "settings";
            }
        // }, 1000);
    });
});

// $(document).ready(function() {
//     $('#dataTable').dataTable( {
//         paging: false,
//         searching: false,
//         dom: 'Bfrtip',
//         buttons: [
//             'copy', 'csv', 'excel', 'pdf', 'print'
//         ]
//     } );
// } );
