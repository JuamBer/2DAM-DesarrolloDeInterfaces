//const fetch = require('node-fetch');
import fetch from 'node-fetch';
const recurso = "http://127.0.0.1:8080";

//Get para bienvenida:
fetch(recurso + '/bienvenida')
  .then(res => res.text())
  .then(body => console.log(body));

//Get para todos los clientes:
fetch(recurso + '/clientes')
  .then(res => res.json())
  .then(json => console.log(json));

//Get para busqueda por dni:
let dni = "11111111";
fetch(recurso + '/clientes/' + dni)
  .then(res => res.json())
  .then(json => console.log(json));

//nuevo objeto con el formato apropiado:
let nuevo = {
  "dni": "72345672",
  "name": "cliente",
  "phone": "9111111"
};
//post insertar cliente 
fetch(recurso + '/clientes', {
  method: 'post',
  body: JSON.stringify(nuevo),
  headers: { 'Content-Type': 'application/json' },
})
  .then(res => res.json())
  .then(json => console.log(json));