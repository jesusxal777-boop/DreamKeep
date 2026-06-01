async function createDocument(){

    const title =
    prompt("Nombre del documento");

    if(!title) return;

    const response = await fetch(
        "https://docs.googleapis.com/v1/documents",
        {
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:title
            })
        }
    );

    const doc = await response.json();

    alert(
        "Documento creado:\n" +
        doc.title
    );

    loadDocuments();

}

async function loadDocuments(){

    const response = await fetch(
        "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.document'",
        {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }
    );

    const data = await response.json();

    const list =
    document.getElementById("docs-list");

    list.innerHTML = "";

    data.files.forEach(file => {

        const item =
        document.createElement("div");

        item.className = "doc-item";

        item.textContent = file.name;

        item.onclick = () => {

            window.open(
                `https://docs.google.com/document/d/${file.id}/edit`,
                "_blank"
            );

        };

        list.appendChild(item);

    });

}
