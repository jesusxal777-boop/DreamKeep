// docs.js

let documents = [];

let currentDoc = null;

/*
========================
CREAR DOCUMENTO
========================
*/

function createDocument(){

    const doc = {

        id: crypto.randomUUID(),

        title: "Sin título",

        content: ""

    };

    documents.unshift(doc);

    currentDoc = doc;

    renderDocuments();

    openDocument(doc.id);

    saveToStorage();

}

/*
========================
MOSTRAR DOCUMENTOS
========================
*/

function renderDocuments(){

    const list =
    document.getElementById("docs-list");

    if(!list) return;

    list.innerHTML = "";

    documents.forEach(doc => {

        const item =
        document.createElement("div");

        item.className = "doc-item";

        item.textContent =
        doc.title || "Sin título";

        item.onclick = () => {

            openDocument(doc.id);

        };

        list.appendChild(item);

    });

}

/*
========================
ABRIR DOCUMENTO
========================
*/

function openDocument(id){

    const doc =
    documents.find(d => d.id === id);

    if(!doc) return;

    currentDoc = doc;

    const title =
    document.getElementById("title");

    const content =
    document.getElementById("content");

    if(title){

        title.value = doc.title;

    }

    if(content){

        content.innerHTML = doc.content;

    }

}

/*
========================
GUARDAR DOCUMENTO
========================
*/

function saveCurrentDocument(){

    if(!currentDoc) return;

    const title =
    document.getElementById("title");

    const content =
    document.getElementById("content");

    currentDoc.title =
    title.value || "Sin título";

    currentDoc.content =
    content.innerHTML;

    saveToStorage();

}

/*
========================
LOCAL STORAGE
========================
*/

function saveToStorage(){

    localStorage.setItem(
        "dreamkeep_documents",
        JSON.stringify(documents)
    );

}

function loadFromStorage(){

    const saved =
    localStorage.getItem(
        "dreamkeep_documents"
    );

    if(!saved) return;

    try{

        documents =
        JSON.parse(saved);

        renderDocuments();

        if(documents.length > 0){

            openDocument(
                documents[0].id
            );

        }

    }
    catch(error){

        console.error(
            "Error cargando documentos",
            error
        );

    }

}

/*
========================
ELIMINAR DOCUMENTO
========================
*/

function deleteCurrentDocument(){

    if(!currentDoc) return;

    documents =
    documents.filter(
        doc => doc.id !== currentDoc.id
    );

    currentDoc = null;

    saveToStorage();

    renderDocuments();

    document
    .getElementById("title")
    .value = "";

    document
    .getElementById("content")
    .innerHTML = "";

    if(documents.length > 0){

        openDocument(
            documents[0].id
        );

    }

}

/*
========================
BUSCAR
========================
*/

function searchDocuments(text){

    const list =
    document.getElementById("docs-list");

    list.innerHTML = "";

    documents
    .filter(doc =>

        doc.title
        .toLowerCase()
        .includes(
            text.toLowerCase()
        )

    )
    .forEach(doc => {

        const item =
        document.createElement("div");

        item.className =
        "doc-item";

        item.textContent =
        doc.title;

        item.onclick = () => {

            openDocument(doc.id);

        };

        list.appendChild(item);

    });

}
