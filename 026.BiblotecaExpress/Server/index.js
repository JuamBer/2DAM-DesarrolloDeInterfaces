const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); //para acceder a los ficheros

let app = express();
// Body-parser para procesar datos JSON desde el cuerpo de las peticiones POST/PUT
app.use(bodyParser.json());


app.get('/db/books', (req, res) => {
    //leer clientes del archivo
    let fichero = fs.readFileSync('./db/books.json');
    let books = JSON.parse(fichero);
    res.send(books);
});

// Servicio de listado por dni
/*app.get('/clientes/:dni', (req, res) => {
    //leer clientes del archivo
    let fichero = fs.readFileSync('./clientes.json');
    let clientes = JSON.parse(fichero);
    //buscar cliente con dni en array clientes
    let clients = clientes.filter(client => client.dni == req.params.dni);

    if (clients.length > 0)
        res.send( clients );
    else
        res.send({
            mensajeError: "No se han encontrado clientes con ese DNI"
        });

});*/

// Servicio para insertar clientes
/*app.post('/db/books', (req, res) => {
    try {
        //obtener el cliente dado con la petición post
        let nuevoCliente = req.body;
        //leer clientes del archivo
        let fichero = fs.readFileSync('./clientes.json');
        let clientes = JSON.parse(fichero);
        //añadir el nuevo cliente:
        clientes.push(nuevoCliente);
        //guardar el fichero completo:
        fs.writeFileSync('./clientes.json', JSON.stringify(clientes));
        res.send({ ok: true });
    }
    catch (err) {
        res.send({ ok: false });
    }
});*/

app.use('/public', express.static(__dirname + '/public'));

app.listen(8085);