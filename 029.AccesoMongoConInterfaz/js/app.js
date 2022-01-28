'use strict';
const mongoose = require('mongoose');
const search = document.getElementById("search");
const newBook = document.getElementById("newBook");
const all = document.getElementById("all");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/libros', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let librosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    img: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
    }
});

let Libro = mongoose.model('libros', librosSchema);
//home(Libro);
search.addEventListener('click', () => {
    searchBook();
});
all.addEventListener('click', () => {
    home(Libro);
});
newBook.addEventListener('click', () => {
    addNewBook(Libro);
});
function searchBook() {
    
}
function addNewBook() {
    const insertBook_title = document.getElementById("insertBook_title");
    const insertBook_author = document.getElementById("insertBook_author");
    const insertBook_img = document.getElementById("insertBook_img");
    const insertBook_button = document.getElementById("insertBook_button");

    insertBook_button.addEventListener('click', ()=>{
        const title = insertBook_title.value;
        const author = insertBook_author.value;
        const img = insertBook_img.value;

        const newBook = new Book({
            title: title,
            author: author,
            img: img
        });

        let promise = newBook.save().then(resultado => {
            console.log("SAVE: \n\t", resultado);
        }).catch(error => {
            console.log("SAVE: \n\tERROR:", error);
        });
    });
}
function home(Libro) {
    let p1 = Libro.find().then(resultado => {
        printBooks(resultado);
    }).catch(error => {
        console.log("ERROR en find");
    });
}


function printBooks(resultado) {
    const wrapper = document.getElementById("wrapper");
    let booksHTML = "";

    for (let index = 0; index < resultado.length; index++) {
        const book = resultado[index];
        booksHTML += `
            <div class="book">
                <img src="../img/${book.img}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
            </div>`;
    }

    wrapper.innerHTML = booksHTML;
}
