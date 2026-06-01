let currentDocumentId = null;

async function createDocument(){

try{
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
    const doc =
    await response.json();
    currentDocumentId =
    doc.documentId;
    await loadDocuments();
    await openDocument(
        doc.documentId
    );
}
catch(error){
    console.error(error);
    alert(
        "Error creando documento"
    );
}

}

async function loadDocuments(){

try{
    const response =
    await fetch(
        "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.document'&fields=files(id,name)",
        {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }
    );
    const data =
    await response.json();
    const list =
    document.getElementById(
        "docs-list"
    );
    list.innerHTML = "";
    data.files.forEach(file=>{
        const item =
        document.createElement("div");
        item.className =
        "doc-item";
        item.textContent =
        file.name;
        item.onclick = ()=>{
            openDocument(
                file.id
            );
        };
        list.appendChild(
            item
        );
    });
}
catch(error){
    console.error(error);
}

}

async function openDocument(id){

try{
    currentDocumentId = id;
    const response =
    await fetch(
        `https://docs.googleapis.com/v1/documents/${id}`,
        {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }
    );
    const doc =
    await response.json();
    document
    .getElementById("title")
    .value =
    doc.title;
    let text = "";
    if(doc.body &&
       doc.body.content){
        doc.body.content
        .forEach(block=>{
            if(
                block.paragraph &&
                block.paragraph.elements
            ){
                block.paragraph
                .elements
                .forEach(el=>{
                    if(
                        el.textRun
                    ){
                        text +=
                        el.textRun.content;
                    }
                });
            }
        });
    }
    document
    .getElementById("content")
    .innerText =
    text;
}
catch(error){
    console.error(error);
}

}

async function saveDocument(){

    if(!currentDocumentId){

        alert(
            "No hay documento abierto"
        );

        return;

    }

    try{

        const content =
        document
        .getElementById("content")
        .innerText;

        const docResponse =
        await fetch(
            `https://docs.googleapis.com/v1/documents/${currentDocumentId}`,
            {
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            }
        );

        const doc =
        await docResponse.json();

        let endIndex = 1;

        if(
            doc.body &&
            doc.body.content &&
            doc.body.content.length > 0
        ){

            const last =
            doc.body.content[
                doc.body.content.length - 1
            ];

            endIndex =
            last.endIndex - 1;

        }

        const requests = [];

        if(endIndex > 1){

            requests.push({

                deleteContentRange:{

                    range:{
                        startIndex:1,
                        endIndex:endIndex
                    }

                }

            });

        }

        requests.push({

            insertText:{

                location:{
                    index:1
                },

                text:content

            }

        });

        await fetch(

            `https://docs.googleapis.com/v1/documents/${currentDocumentId}:batchUpdate`,

            {

                method:"POST",

                headers:{
                    Authorization:`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    requests:requests

                })

            }

        );

        alert(
            "Documento guardado"
        );

    }
    catch(error){

        console.error(error);

        alert(
            "Error al guardar"
        );

    }

}
