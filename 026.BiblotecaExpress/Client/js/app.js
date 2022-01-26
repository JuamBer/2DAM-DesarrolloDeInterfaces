//import fetch from 'node-fetch';
const fetch = require('node-fetch');
const recurso = "http://127.0.0.1:8085";

//Get para todos los clientes:
fetch(recurso + '/db/books')
    .then(res => res.json())
    .then(books => {
        console.log(books);
        printBooks(books)
    });

function printBooks(json) {
    const wrapper = document.getElementById("wrapper");
    let books = "";

    json.forEach(book => {
        books += `
        <div class="book">
            <img src="${recurso}/public/${book.img}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        </div>`;
    });

    wrapper.innerHTML = books;
}