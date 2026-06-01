let accessToken = null;

function initAuth() {

    google.accounts.id.initialize({
        client_id:
        "743766102684-320nu8h0d5dnoac0mpdg1stm582nmb6k.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

}

function handleCredentialResponse(response){

    console.log(response);

    document
    .getElementById("login-btn")
    .style.display = "none";

}

document
.getElementById("login-btn")
.addEventListener("click",initAuth);
