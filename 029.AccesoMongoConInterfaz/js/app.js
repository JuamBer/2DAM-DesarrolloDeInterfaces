'use strict';
const mongoose = require('mongoose');
const fs = require('fs');


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

let Book = mongoose.model('libros', librosSchema);
home(Book);
search.addEventListener('click', () => {
    searchBook(Book);
});
all.addEventListener('click', () => {
    home(Book);
});
newBook.addEventListener('click', () => {
    addNewBook(Book);
});
function searchBook(Book) {
    const searchBook = document.getElementById("searchBook");
    const insertBook = document.getElementById("insertBook");
    searchBook.style.display = "inline";
    insertBook.style.display = "none";
    console.log("searchBook")

    const searchBook_title = document.getElementById("searchBook_title");
    const searchBook_title_button = document.getElementById("searchBook_title_button");
    const searchBook_author = document.getElementById("searchBook_author");
    const searchBook_author_button = document.getElementById("searchBook_author_button");

    searchBook_title_button.addEventListener('click', () => {
        console.log("searchBook_title_button")
        const title = searchBook_title.value;

        const selector = {
            "title": {
                $regex: title,
                $options: "i"
            }
        }

        let p1 = Book.find(selector).then(resultado => {
            printBooks(resultado);
        }).catch(error => {
            console.log("ERROR en find");
        });
    });

    searchBook_author_button.addEventListener('click', () => {
        const author = searchBook_author.value;
        
        const selector = {
            "author": {
                $regex: author,
                $options: "i"
            }
        }

        let p1 = Book.find(selector).then(resultado => {
            printBooks(resultado);
        }).catch(error => {
            console.log("ERROR en find");
        });
    });

    
}
function addNewBook(Book) {
    const searchBook = document.getElementById("searchBook");
    const insertBook = document.getElementById("insertBook");
    searchBook.style.display = "none";
    insertBook.style.display = "inline";
    
    const insertBook_title = document.getElementById("insertBook_title");
    const insertBook_author = document.getElementById("insertBook_author");
    const insertBook_img = document.getElementById("insertBook_img");
    const insertBook_button = document.getElementById("insertBook_button");

    insertBook_button.addEventListener('click', ()=>{
        const title = insertBook_title.value;
        const author = insertBook_author.value;
        const img = insertBook_img;

        
        const newBook = new Book({
            title: title,
            author: author,
            img: img.files[0].name
        });
        console.dir(img);
        try {
            const data = fs.readFileSync(img.files[0].path, 'base64');

            fs.writeFile("img/"+img.files[0].name, data, 'base64', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                }
            });
        } catch (err) {
            console.error(err)
        }

        

        let promise = newBook.save().then(resultado => {
            console.log("SAVE: \n\t", resultado);
        }).catch(error => {
            console.log("SAVE: \n\tERROR:", error);
        });
    });
}
function home(Libro) {
    const searchBook = document.getElementById("searchBook");
    const insertBook = document.getElementById("insertBook");
    searchBook.style.display = "none";
    insertBook.style.display = "none";

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
