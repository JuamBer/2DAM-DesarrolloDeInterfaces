const mongoose = require('mongoose');

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

printBooks();

function printBooks() {

    let books = Book.find().then(resultado => {
        console.log("FIND: \n\t", resultado);
    }).catch(error => {
        console.log("FIND: \n\tERROR:", error);
    });
    books.forEach(item => {

    });
    const wrapper = document.getElementById("wrapper");
    let books = "";

    books.forEach(book => {
        books += `
        <div class="book">
            <img src="${recurso}/public/${book.img}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        </div>`;
    });

    wrapper.innerHTML = books;
}


