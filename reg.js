var updateID;
var btnchg;

function loadData() {
    alert('validated!');
    $.ajax({
        url: "http://localhost:8080/reg/get",
        type: 'GET',

        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (data) {
            // alert(JSON.stringify(data));
            //alert(data.length);
            $("#pp1").append("<table class='table' ><tr> <th width='50'>Id</th>"
                + "<th width='50'>fullname</th>"
                + "<th width='50'>email</th>"
                + "<th width='50'>password</th>"
                + "<th width='50'>dob</th>"
                + "<th width='50'>country</th>"
                + "<th width='50'>gender</th>"
                + "<th width='200'>category</th> </tr></table>");
            var tr;
            for (var i = 0; i < data.length; i++) {
                tr = $('<tr/>');
                tr.append("<td >" + data[i].id + "</td>");
                tr.append("<td>" + data[i].fullname + "</td>");
                tr.append("<td>" + data[i].email + "</td>");
                tr.append("<td>" + data[i].password + "</td>");
                tr.append("<td>" + data[i].dob + "</td>");
                tr.append("<td>" + data[i].country + "</td>");
                tr.append("<td>" + data[i].gender + "</td>");
                var d = JSON.stringify(data[i]);
                //alert(d);
                tr.append("<td><button onclick='update(" + d + ")' >Edit</button> <button onclick=delete1(" + data[i].id + ") >Delete</button></td>");
                $('table').append(tr);
            }
        },
        error: function () {
            alert('fail....post');

        }
    });
}

$(document).ready(function () {

    alert("reg.js page loading...");
    alert("get all");
    loadData();

    $("input:submit").click(function () {
        if (btnchg > 0) {
            alert ("update clicked...")
            update1();
        }
        else {
            alert("save clicked....")
            save();
        }
    })
    // $("#save").click(function(){
    //    alert("save button calling");
    //    alert("btnchg value...."+btnchg);
    // save();

    // });

    // $("#update").click(function(){
    //     alert("btnchg value...."+btnchg);
    //  update1();

    //     });


});




function save() {
    alert("post");
    var markers = {

        "country": $('#country').val(),
        "dob": $('#birthDate').val(),
        "email": $('#email').val(),
        "fullname": $('#firstName').val(),
        "gender": $("form input[type='radio']:checked").val(),
        "id": 0,
        "password": $('#password').val()
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/reg/post",
        data: JSON.stringify(markers),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { alert(data); console.log(data); },
        failure: function (errMsg) {
            console.log(errMsg);
            alert(errMsg);
        }
    });
}



function update(data) {
    alert("update....." + JSON.stringify(data));
    updateID = data.id;
    btnchg = updateID;
    if (btnchg > 0) { $("input:submit").val("update") }
    $("#updateID").text(btnchg);
    $("#firstName").val(data.fullname);
    $("#email").val(data.email);
    $("#password").val(data.password);
    $("#birthDate").val(data.dob);
    $("#country").val(data.country);
    $("#gender3").val(data.gender);
    $("." + data.gender).click();
}

function delete1(data) {
    alert("delete....." + JSON.stringify(data));

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/reg/delete/" + data,
        success: function (result) {

            $("#pp1").html(result);
            loadData();
        }
    });
}
function update1() {
    alert("calling update")
    var markers = {

        "country": $('#country').val(),
        "dob": $('#birthDate').val(),
        "email": $('#email').val(),
        "fullname": $('#firstName').val(),
        "gender": $("form input[type='radio']:checked").val(),
        "id": 0,
        "password": $('#password').val()
    };
    console.log("id is..." + updateID);
    alert("id is..." + updateID);
    $.ajax({
        url: "http://localhost:8080/reg/put/" + updateID,
        type: 'PUT',
        data: JSON.stringify(markers),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (data, textStatus, request) {
            alert(JSON.stringify(data));
        },
        error: function () {
            alert('fail');

        }
    });
}