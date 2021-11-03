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
        options += "<option value=" + i + ">" + machines[i].nombre + "</option>";
    }

    select.addEventListener('change', () => {
        choosenoption = select.value;
        loadInformation(choosenoption);
    });

    select.innerHTML = options;
}


function loadInformation(i) {
    let tr = `
        <tr>
            <td>Description: </td>
            <td>${machines[i].nombre}</td>
        </tr>
        <tr>
            <td> Cost Price: </td> 
            <td> ${machines[i].precioCoste} </td> 
        </tr>
        <tr>
            <td> Shelling Price: </td> 
            <td>${machines[i].precioVenta}</td>
        </tr>
        <tr>
            <td> Actual Stock: </td> 
            <td>${machines[i].stockActual}</td>
        </tr>    
        <tr>    
            <td> Min Stock: </td> 
            <td>${machines[i].stockMin}</td>
        </tr>
    `;
    table.innerHTML = tr;

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