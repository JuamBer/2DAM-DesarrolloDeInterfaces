
const {
    dialog
} = require('@electron/remote');
let fs = require("fs");

let doc = new Array();
let srcDocument;

let btnOpen = document.getElementById("btnOpen");
let btnSave = document.getElementById("btnSave");
let mainContent = document.getElementById("mainContent");

btnSave.disabled = true;

btnOpen.addEventListener('click', ()=>{
    openDocument()
});

btnSave.addEventListener('click', () => {
    saveDocument()
});

function openDocument(){
    console.log("OpenDocument")
    file = dialog.showOpenDialogSync({
        title: "Abriendo archivos de video",
        defaultPath: "/db",
        filters: [{
                name: 'name',
                extensions: ['json']
            },
            {
                name: 'All Files',
                extensions: ['*']
            }
        ]
    });
    srcDocument = file[0]
    btnSave.disabled = false;
    doc = JSON.parse(fs.readFileSync(srcDocument));

    text = "";

    for (let i = 0; i < doc.length; i++) {
        text += `<tr size="2">
                    <td>${doc[i].grupo}</td> 
                    <td>${doc[i].nombre}</td> 
                    <td contenteditable="true" id="td${i}">${doc[i].nota}</td> 
                </tr>`;
        
    }
    mainContent.innerHTML = text;

}

function saveDocument() {
    
    let form = mainContent.text;

    
    for (let i = 0; i < doc.length; i++) {
        doc[i].nota = document.getElementById("td"+i).innerHTML
    }

    let fileSave = dialog.showSaveDialogSync();
    
    try {
        let dataDocument = JSON.stringify(doc, null, 2);
        console.log(fileSave)
        fs.writeFileSync(fileSave, dataDocument, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } catch (error) {
        console.log(error);
    }
}