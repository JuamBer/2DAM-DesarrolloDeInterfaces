const mongoose = require('mongoose');
let fs = require("fs");

let booksJSON = JSON.parse(fs.readFileSync("./db/books.json"));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/libros', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let libroSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

let Book = mongoose.model('libros', libroSchema);

saveBooksToDataBase(booksJSON);

function saveBooksToDataBase(books){
    books.forEach(item => {
        let book = new Book({
            title: item.title,
            author: item.author,
            img: item.img
        });

        let promise = book.save().then(resultado => {
            console.log("SAVE: \n\t", resultado);
        }).catch(error => {
            console.log("SAVE: \n\tERROR:", error);
        });
    });
}


