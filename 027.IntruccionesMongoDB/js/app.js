const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/contactos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    }
});

let Contacto = mongoose.model('contactos', contactoSchema);

let contacto1 = new Contacto({
    nombre: "Boris",
    telefono: "946112230",
    edad: 49
});

//SAVE
let p1 = contacto1.save().then(resultado => {
    console.log("SAVE: \n\t", resultado);
}).catch(error => {
    console.log("SAVE: \n\tERROR:", error);
});
//FIND SIN PARÁMETROS
let p2 = Contacto.find().then(resultado => {
    console.log("FIND: \n\t", resultado);
}).catch(error => {
    console.log("FIND: \n\tERROR:", error);
});
//FIND CON PARÁMETROS
let p3 = Contacto.find({
    nombre: 'Boris',
    edad: 49
}).then(resultado => {
    console.log("FIND: \n\t", resultado);
}).catch(error => {
    console.log("FIND: \n\tERROR:", error);
});
let p4 = Contacto.remove({
    nombre: 'Boris'
}).then(resultado => {
    console.log("REMOVE: \n\t", resultado);
}).catch(error => {
    console.log("REMOVE: \n\tERROR:", error);
});

//FIND ONE AND UPDATE
let p5 = Contacto.findOneAndUpdate({
        nombre: 'Boris'
    }, {
        nombre: 'Boris Anaya',
        edad: 50
    }, {
        new: true
    })
    .then((resultado) => {
        console.log("FIND ONE AND UPDATE: \n\t", resultado)
    }).catch(error => {
        console.log("FIND ONE AND UPDATE: \n\tERROR:", error);
    });
//FIND BY ID AND UPDATE
let p6 = Contacto.findByIdAndUpdate('5ede78b4c5e89d072c3d1a71', {
        nombre: 'Boris Anaya Moreno',
        edad: 51
    }, {
        new: true
    })
    .then(resultado => {
        console.log("FIND BY ID AND UPDATE:", resultado);
    }).catch(error => {
        console.log("FIND BY ID AND UPDATE: \n\tERROR:", error);
    });

Promise.all([p1, p2, p3, p4, p5, p6]).then(values => {
    mongoose.connection.close();
});