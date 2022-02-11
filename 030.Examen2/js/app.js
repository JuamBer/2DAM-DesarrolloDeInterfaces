//Imports
const fetch = require('node-fetch');
const pdf = require('html-pdf');
const { dialog } = require('@electron/remote');
//Constantes Globales
const recurso = "https://akabab.github.io/starwars-api/api/all.json";
const img = document.getElementById("img");
const name = document.getElementById("name");
const species = document.getElementById("species");
const gender = document.getElementById("gender");
const defualtInfo = [{
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png",
    name: "Star Wars",
    species: "None",
    gender: "None"
}];

//Variables Globales
let ActualId;


//Inicio del Programa
printSidebarInfo(defualtInfo, 1);
getListInformation();
activateButtonsListeners();


//Funciones
function printSidebarInfo(json, id) {
    img.src = json[id - 1].image;
    name.innerHTML = json[id - 1].name;
    species.innerHTML = json[id - 1].species;
    gender.innerHTML = json[id - 1].gender;

    ActualId = id;
}

function getListInformation() {
    fetch(recurso)
        .then(res => res.json())
        .then(json => {
            printListInfo(json);
            activateListListeners(json);
        });
}
function printListInfo(json) {
    const starwarsInfo = document.getElementById("starwars-info");

    let info = "";

    json.forEach(person => {
        info += `
        <tr id="person${person.id}">
            <td>${person.name}</td>
            <td><img src="${person.image}" alt="${person.name}"></td>
        </tr>`;
    });

    starwarsInfo.innerHTML = info;
}

function activateListListeners(json) {
    json.forEach(person => {
        const personId = document.getElementById("person"+person.id);
        personId.addEventListener('click',()=>{
            printSidebarInfo(json, person.id)
        });
    });
}


function activateButtonsListeners() {
    const btnDelete = document.getElementById("btn-delete");
    const btnReload = document.getElementById("btn-reload");
    const btnDoc = document.getElementById("btn-doc");

    btnDelete.addEventListener('click',()=>{
        const personId = document.getElementById("person" + ActualId);
        personId.remove();
        printSidebarInfo(defualtInfo, 1);
    });

    btnReload.addEventListener('click', () => {
        getListInformation();
    });

    btnDoc.addEventListener('click', () => {
        const info = document.getElementById("info");

        let content = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Character Info</title>
            </head>
            <style>
                body {
                    padding: 5%;
                }

                img {
                    max-height: 300px;
                    max-width: 100%;
                }

                .title {
                    font-weight: 200;
                }
            </style>
            <body>
                ${info.innerHTML}
            </body>
            </html>
        `;

        pdf.create(content).toFile('./pdfs/' + ActualId + '.pdf', (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                dialog.showMessageBox({
                    message: 'Pdf generado Correctamente',
                    type: 'info',
                    buttons: ['Okay']
                });
            };
        });

        
    });
}