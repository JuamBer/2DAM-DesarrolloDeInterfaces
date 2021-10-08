const fs = require('fs')

let fichero = fs.readFileSync('clientes.json');

let clients = new Array()

clients = JSON.parse(fichero);
let pos = 0;

let dni = document.getElementById("dni");
let nombre = document.getElementById("name");
let phone = document.getElementById("phone");

let btnnext = document.getElementById("btnnext");
let btnbefore = document.getElementById("btnbefore");
let btnsave = document.getElementById("btnsave");
let btndelete = document.getElementById("btndelete");

loadClient(clients, pos);

btnnext.addEventListener('click', () => {
    console.log("AddEventListener Next");
    pos++;
    loadClient(clients, pos);
});
btnbefore.addEventListener('click', () => {
    pos--;
    beforeClient(clients, pos);
});
btnsave.addEventListener('click', () => {
    dnival = dni.value;
    nameval = nombre.value;
    phoneval = phone.value;

    clients.push({
        "dni": "" + dni + "",
        "nombre": "" + nameval + "",
        "telefono": "" + phoneval + ""
    });
    loadClient(clients, pos - 1);
    console.log("Usuario añadido ");
});
btndelete.addEventListener('click', () => {
    clients.splice(pos, 1);
    loadClient(clients, pos - 1);
    console.log("Cliente Eliminado");
});

function loadClient() {
    dni.value = clients[pos].dni;
    nombre.value = clients[pos].nombre;
    phone.value = clients[pos].telefono;
}
