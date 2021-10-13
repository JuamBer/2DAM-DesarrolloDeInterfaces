const { throws } = require('assert');
const fs = require('fs')

let file = fs.readFileSync('db/clients.json');
let clients = new Array();
clients = JSON.parse(file);

let pos = 0;

let dni = document.getElementById("dni");
let name = document.getElementById("name");
let phone = document.getElementById("phone");

let btnfirst = document.getElementById("btnfirst");
let btnbefore = document.getElementById("btnbefore");
let btnnext = document.getElementById("btnnext");
let btnlast = document.getElementById("btnlast");

let btndelete = document.getElementById("btndelete");
let btnadd = document.getElementById("btnadd");
let btnaddred = document.getElementById("btnaddred");
let btnsave = document.getElementById("btnsave");

btnaddred.style.display = 'none';

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
    console.log("AddEventListener Add UserBlue");
    dnival = dni.value;
    nameval = name.value;
    phoneval = phone.value;

    dni.value = "";
    name.value = "";
    phone.value = "";
    
    btnfirst.disabled = true;
    btnfirst.style.background = "#2F2F2F";
    btnnext.disabled = true;
    btnnext.style.background = "#2F2F2F";
    btnbefore.disabled = true;
    btnbefore.style.background = "#2F2F2F";
    btnlast.disabled = true;
    btnlast.style.background = "#2F2F2F";

    btndelete.disabled = true;
    btndelete.style.background = "#2F2F2F";
    btnsave.disabled = true;
    btnsave.style.background = "#2F2F2F";

    btnadd.style.display = 'none';
    btnaddred.style.display = 'inline';
});

btnaddred.addEventListener('click', () => {
    console.log("AddEventListener AddRed User");
    dnival = dni.value;
    nameval = name.value;
    phoneval = phone.value;

    btnfirst.disabled = false;
    btnfirst.style.background = "#6eb4f7";
    btnnext.disabled = false;
    btnnext.style.background = "#6eb4f7";
    btnbefore.disabled = false;
    btnbefore.style.background = "#6eb4f7";
    btnlast.disabled = false;
    btnlast.style.background = "#6eb4f7";

    btndelete.disabled = false;
    btndelete.style.background = "#6eb4f7";
    btnsave.disabled = false;
    btnsave.style.background = "#6eb4f7";

    btnadd.style.display = 'none';
    btnaddred.style.display = 'inline';

    if (dnival != "" && nameval != "" && phoneval != ""){
        clients.push({
            "dni": "" + dnival + "",
            "nombre": "" + nameval + "",
            "telefono": "" + phoneval + ""
        });
        console.log("User Added");
    }else{
        console.log("Cannot enter empty values");
    }
    

    pos=clients.length-1;

    try {
        loadClient();
    } catch (error) {
        console.log(error);
    }

   
});

function loadClient() {
    dni.value = clients[pos].dni;
    name.value = clients[pos].nombre;
    phone.value = clients[pos].telefono; 
    btnadd.style.display = 'inline';
    btnaddred.style.display = 'none';
}
