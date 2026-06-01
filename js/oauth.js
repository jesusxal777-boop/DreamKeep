const CLIENT_ID =
"743766102684-320nu8h0d5dnoac0mpdg1stm582nmb6k.apps.googleusercontent.com";

const SCOPES =
"https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

let tokenClient;
let accessToken = null;

window.onload = () => {

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (response) => {

            accessToken = response.access_token;

            await loadProfile();

            loadDocuments();

        }
    });

};

document
.getElementById("login-btn")
.addEventListener("click", () => {

    tokenClient.requestAccessToken();

});

async function loadProfile(){

    const res = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }
    );

    const user = await res.json();

    document
    .getElementById("username")
    .textContent = user.name;

    document
    .getElementById("avatar")
    .src = user.picture;

    document
    .getElementById("user-info")
    .hidden = false;

    document
    .getElementById("login-btn")
    .style.display = "none";

}
