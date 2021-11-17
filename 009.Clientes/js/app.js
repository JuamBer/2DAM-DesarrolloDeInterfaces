const { throws } = require('assert');
const fs = require('fs')

let file = fs.readFileSync('db/clients.json');
let clients = new Array();
clients = JSON.parse(file);

let pos = 0;
let key = 1;

let dni = document.getElementById("dni");
let name = document.getElementById("name");
let phone = document.getElementById("phone");

let btnfirst = document.getElementById("btnfirst");
let btnbefore = document.getElementById("btnbefore");
let btnnext = document.getElementById("btnnext");
let btnlast = document.getElementById("btnlast");

let btndelete = document.getElementById("btndelete");
let btnadd = document.getElementById("btnadd");
let btnsave = document.getElementById("btnsave");

loadClient();

btnfirst.addEventListener('click', () => {
    console.log("AddEventListener First");
    pos = 0;
    try {
        loadClient();
    } catch (error) {
        console.error(error);
    }
});
btnbefore.addEventListener('click', () => {
    console.log("AddEventListener Before");
    pos--;
    try {
        loadClient();
    } catch (error) {
        pos++;
        console.error(error);
    }
});
btnnext.addEventListener('click', () => {
    console.log("AddEventListener Next");
    pos++;
    try{
        loadClient();
    } catch (error) {
        pos--;
        console.error(error);
    }
});
btnlast.addEventListener('click', () => {
    console.log("AddEventListener Last");
    try {
        pos = clients.length-1;
        loadClient();
    } catch (error) {
        console.error(error);
    }
});
btnsave.addEventListener('click', () => {
    console.log("AddEventListener Save DataBase");
    try {
        let data = JSON.stringify(clients, null, 2);
        fs.writeFileSync('db/clients.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } catch (error) {
        console.log(error);
    }
    
    console.log("User added");
});
btndelete.addEventListener('click', () => {
    console.log("AddEventListener Delete User");
    clients.splice(pos, 1);
    try{
        pos--;
        loadClient();
    }catch(error){
        console.log(error);
        try {
            pos++;
            loadClient();
        } catch (error) {
            console.log(error);
        }
    }
    console.log("User deleted");
});

btnadd.addEventListener('click', () => {
    console.log("AddEventListener Add User");
    
    if ((key % 2) == 0) {
        key++;
        dnival = dni.value;
        nameval = name.value;
        phoneval = phone.value;

        btnfirst.disabled = false;
        btnfirst.classList.remove("btn-default");
        btnfirst.classList.add("btn-primary");
        btnnext.disabled = false;
        btnnext.classList.remove("btn-default");
        btnnext.classList.add("btn-primary");
        btnbefore.disabled = false;
        btnbefore.classList.remove("btn-default");
        btnbefore.classList.add("btn-primary");
        btnlast.disabled = false;
        btnlast.classList.remove("btn-default");
        btnlast.classList.add("btn-primary");

        btndelete.disabled = false;
        btndelete.classList.remove("btn-default");
        btndelete.classList.add("btn-primary");
        btnsave.disabled = false;
        btnsave.classList.remove("btn-default");
        btnsave.classList.add("btn-primary");

        btnadd.classList.remove("btn-negative");
        btnadd.classList.add("btn-primary");

        if (dnival != "" && nameval != "" && phoneval != "") {
            clients.push({
                "dni": "" + dnival + "",
                "nombre": "" + nameval + "",
                "telefono": "" + phoneval + ""
            });
            console.log("User Added");
        } else {
            console.log("Cannot enter empty values");
        }

        pos = clients.length - 1;

        try {
            loadClient();
        } catch (error) {
            console.log(error);
        }
    }else{
        key++;
        dnival = dni.value;
        nameval = name.value;
        phoneval = phone.value;

        dni.value = "";
        name.value = "";
        phone.value = "";

        btnfirst.disabled = true;
        btnfirst.classList.remove("btn-primary");
        btnfirst.classList.add("btn-default");
        btnnext.disabled = true;
        btnnext.classList.remove("btn-primary");
        btnnext.classList.add("btn-default");
        btnbefore.disabled = true;
        btnbefore.classList.remove("btn-primary");
        btnbefore.classList.add("btn-default");
        btnlast.disabled = true;
        btnlast.classList.remove("btn-primary");
        btnlast.classList.add("btn-default");

        btndelete.disabled = true;
        btndelete.classList.remove("btn-primary");
        btndelete.classList.add("btn-default");
        btnsave.disabled = true;
        btnsave.classList.remove("btn-primary");
        btnsave.classList.add("btn-default");

        btnadd.classList.remove("btn-primary");
        btnadd.classList.add("btn-negative");
    }

});

function loadClient() {
    dni.value = clients[pos].dni;
    name.value = clients[pos].nombre;
    phone.value = clients[pos].telefono; 
}
