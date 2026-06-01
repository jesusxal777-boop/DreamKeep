document
.getElementById("new-doc")
.addEventListener(
    "click",
    createDocument
);

document
.getElementById("title")
.addEventListener(
    "input",
    saveCurrentDocument
);

document
.getElementById("content")
.addEventListener(
    "input",
    saveCurrentDocument
);
