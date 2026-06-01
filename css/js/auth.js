let accessToken = null;

function initAuth() {

    google.accounts.id.initialize({
        client_id:
        "TU_CLIENT_ID",
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
