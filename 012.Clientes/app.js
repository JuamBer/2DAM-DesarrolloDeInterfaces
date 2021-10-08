//cargar módulo fs
const fs = require('fs')
//leer clientes del archivo
let fichero = fs.readFileSync('./clientes.json');
//array para manipular los datos
let clientes = new Array()
//parseamos el fichero en formato json
//ahora en el array clientes tendremos un vector
//donde en cada posición del vector hay un objeto
//con los datos de un cliente
clientes = JSON.parse(fichero);
//nuevo cliente
/*
let cnuevo = {};//objeto JSON
cnuevo ={ // asingamos un valor, debe ser cumpliento el formato del JSON
    dni:"24442001Q",
    nombre:"Raúl",
    telefono:"663314677"
}
clientes.push(cnuevo);
console.log(clientes);


*/

//borramos posición de array
//clientes.splice(4,1);

//actualizar cliente
clientes[0].nombre = "nuevo nombre"
clientes[0].dni = "68755548G"


//Reemplazamos el fichero JSON con el valor de nuestro array
fs.writeFileSync("./clientes.json",JSON.stringify(clientes));