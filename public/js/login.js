$(document).ready(function() {
    $("#login-link").on('click', displayLoginInputs);
    $("#login-button").on('click', loginUser);
    $("#login-cancel-button").on('click', displayLoginLinks);

    $("input#user_name").keydown(function(e) {
        switch(e.keyCode) {
            case 13:
                // Enter
                $("input#password").focus();
                break;
            case 27:
                // ESC
                displayLoginLinks();
                break;
            default:
                break;
        }
    });

    $("input#password").keydown(function(e) {
        switch(e.keyCode) {
            case 13:
                // Enter
                loginUser();
                break;
            case 27:
                // ESC
                displayLoginLinks();
                break;
            default:
                break;
        }    });
});

function displayLoginLinks()
{
    $(".login-inputs").css("display", "none");
    $(".login-menu").css("display", "none");
    $(".login-links").css("display", "inline");
    $("input#user_name").focus();
}

function displayLoginInputs()
{
    $(".login-links").css("display", "none");
    $(".login-menu").css("display", "none");
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