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
