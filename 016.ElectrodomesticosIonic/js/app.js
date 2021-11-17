let fs = require("fs");
let file = fs.readFileSync('db/db.json');
let machines = new Array();
machines = JSON.parse(file);

let moreinfo = document.getElementById("moreinfo");
let table = document.getElementById("table");
let select = document.getElementById("select");
let options;
let choosenoption = 0;



loadOptions();
loadTotalInformation();


function loadOptions() {
    for (let i = 0; i < machines.length; i++) {
        console.log(machines[i]);
        options += "<ion-select-option value=" + i + ">" + machines[i].nombre + "</ion-select-option>";
    }

    select.addEventListener('ionChange', function () {
        choosenoption = select.value;
        loadInformation(choosenoption);
    });

    select.innerHTML = options;
}


function loadInformation(i) {

    let e = `
        <ion-row>
            <ion-col>Description: </ion-col>
            <ion-col>${machines[i].nombre}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col> Cost Price: </ion-col>
            <ion-col> ${machines[i].precioCoste} </ion-col>
        </ion-row>
        <ion-row>
            <ion-col> Shelling Price: </ion-col> 
            <ion-col>${machines[i].precioVenta}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col> Actual Stock: </ion-col> 
            <ion-col>${machines[i].stockActual}</ion-col>
        </ion-row>    
        <ion-row>    
            <ion-col> Min Stock: </ion-col> 
            <ion-col>${machines[i].stockMin}</ion-col>
        </ion-row>
    `;
    table.innerHTML = e;

}


function loadTotalInformation() {
    let totalproducs = machines.length;
    let totalstock = 0;
    let products = new Array();

    for (let i = 0; i < totalproducs; i++) {
        totalstock += machines[i].stockActual;
        if (machines[i].stockMin > machines[i].stockActual) {
            products.push(machines[i].nombre);
        }
    }
    let mi = `
        <ul>
            <li>Total producs: ${totalproducs}</li>
            <li>Total Actual Stock: ${totalstock}</li>
            <li>Stock producs debajo: 
                <ol>
        `;

    products.forEach(element => {
        mi += "<li>" + element + "</li>";
    });
    mi += "</ol></ul>";

    moreinfo.innerHTML = mi;
}