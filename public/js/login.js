$(document).ready(function() {
    $("#login-link").on('click', displayLogin);
    $("#login-button").on('click', loginUser);

    $("input#user_name").keydown(function(e) {
        if (e.keyCode === 13) {
            $("input#password").focus();
        }
    });

    $("input#password").keydown(function(e) {
        if (e.keyCode === 13) {
            loginUser();
        }
    });
});

function displayLogin()
{
    $(".login-links").css("display", "none");
    $(".login-inputs").css("display", "inline");
    $("input#user_name").focus();
}

function displayLoginMenu()
{
    $(".login-inputs").css("display", "none");
    $(".login-menu").css("display", "inline");
}

function loginUser()
{
    var username = $('input#user_name').val();
    var password = $('input#password').val();

    var request = $.ajax({
        url: "/login",
        method: "POST",
        data: {
            user_name: username,
            password: password
        },
        dataType: "json",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    request.done(function(data) {
        if (data.success === true) {
            $("#login-menu-username").prepend(username);
            displayLoginMenu();
        } else {
            alert(data.error);
        }
    });

    request.fail(function( jqXHR, textStatus ) {
        alert("Failed to log in: " + textStatus );
    });
}