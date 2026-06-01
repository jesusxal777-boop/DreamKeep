function createDocument(){

    const doc = {

        id: crypto.randomUUID(),

        title:"Sin título",

        content:""

    };

    documents.unshift(doc);

    currentDoc = doc;

    renderDocuments();

    openDocument(doc.id);

}
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

function renderDocuments(){

    const list =
    document.getElementById("docs-list");

    list.innerHTML = "";

    documents.forEach(doc=>{

        const div =
        document.createElement("div");

        div.className = "doc-item";

        div.textContent = doc.title;

        div.onclick = ()=>{

            openDocument(doc.id);

        };

        list.appendChild(div);

    });

}

function openDocument(id){

    const doc =
    documents.find(d=>d.id===id);

    if(!doc) return;

    currentDoc = doc;

    document
    .getElementById("title")
    .value = doc.title;

    document
    .getElementById("content")
    .innerHTML = doc.content;

}

function saveCurrentDocument(){

    if(!currentDoc) return;

    currentDoc.title =
    document
    .getElementById("title")
    .value;

    currentDoc.content =
    document
    .getElementById("content")
    .innerHTML;

    renderDocuments();

}
