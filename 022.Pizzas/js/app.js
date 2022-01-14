const pdf = require('html-pdf');
const remote = require('@electron/remote');
let fs = require("fs");

let srcSizes = "./db/sizes.json";
let srcMasses = "./db/masses.json";
let srcIngredients = "./db/ingredients.json";

let sizes = JSON.parse(fs.readFileSync(srcSizes));
let masses = JSON.parse(fs.readFileSync(srcMasses));
let ingredients = JSON.parse(fs.readFileSync(srcIngredients));

let ul_size = document.getElementById("ul_form_sizes");
let ul_masses = document.getElementById("ul_form_masses");
let ul_ingredients = document.getElementById("ul_form_ingredients");

let btn_accept = document.getElementById("btn_accept");
let btn_cancel = document.getElementById("btn_cancel");

loadSize();
loadMasses();
loadIngredients();

btn_accept.addEventListener('click',()=>{
    generatePDF();
});
btn_cancel.addEventListener('click', () => {
    remote.getCurrentWindow().close();
});

function generatePDF(){
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    let ingredients_check_cheked = document.querySelectorAll('.ingredients ul li input');
    let ingredients_cheked = new Array();
    let ingredients_cheked_html = "";
    
    for (var i = 0; i < ingredients_check_cheked.length; i++) {
        if (ingredients_check_cheked[i].checked) {
            ingredients_cheked.push(ingredients_check_cheked[i].value);
        }
    }
    ingredients_cheked.forEach(ingredient => {
        ingredients_cheked_html += "<li>" + ingredient + "</li>";
    })

    let sizes_check_cheked = document.querySelectorAll('.sizes ul li input');
    let size_checked;
    for (var i = 0; i < sizes_check_cheked.length; i++) {
        if (sizes_check_cheked[i].checked) {
            size_checked = sizes_check_cheked[i].value;
        }
    }

    let masses_check_cheked = document.querySelectorAll('.masses ul li input');
    let mass_checked;
    for (var i = 0; i < masses_check_cheked.length; i++) {
        if (masses_check_cheked[i].checked) {
            mass_checked = masses_check_cheked[i].value;
        }
    }
    console.log(size_checked);
    console.log(mass_checked);
    console.log(ingredients_cheked);

    let content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body style="padding:5%;">
            <h1>Your Order</h1>
            <br>
            <h2>Contact Info</h2>
            <ul>
                <li>Name: ${name}</li>
                <li>Phone: ${phone}</li>
                <li>Address: ${address}</li>
            </ul>
            <h2>Size</h2>
            <ul>
                <li>Size: ${size_checked}</li>
            </ul>
            <h2>Type of Mass</h2>
            <ul>
                <li>Mass: ${mass_checked}</li>
            </ul>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients_cheked_html}
            </ul>
        </body>
        </html>
    `;

    pdf.create(content).toFile('./pdfPedidos/' + name + '-order.pdf', (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        };
    });
}

function loadSize() {
    let html_size = "";

    sizes.sizes.forEach(size => {
        html_size += `
        <li>
            <div class="radio">
                <input 
                    type = "radio"
                    name = "sizes"
                    id = "size_${size[0]}"
                    value = "${size[0]}" >

                <h4>${size[0]}</h4>
            </div>
            <div class="img">
                <img class="size_${size[0]}" src="../${size[1]}" alt="${size[0]}"/>
            </div>
        </li>`;

    });

    ul_size.innerHTML = html_size;
}

function loadMasses(){
    let html_masses = "";

    masses.masses.forEach(mass => {
        html_masses += `
        <li>
            <div class="radio">
                <input 
                    type = "radio"
                    name = "masses"
                    id = "size_${mass[0]}"
                    value = "${mass[0]}" >

                <h4>${mass[0]}</h4>
            </div>
            <div class="img">
                <img class="mass_${mass[0]}" src="../${mass[1]}" alt="${mass[0]}"/>
            </div>
        </li>`;
        
    });

    ul_masses.innerHTML = html_masses;
}

function loadIngredients() {
    let html_ingredients = "";

    ingredients.ingredients.forEach(ingredient => {
        html_ingredients += `
        <li>
            <input 
                type = "checkbox"
                name = "masses"
                id = "size_${ingredient}"
                value = "${ingredient}" >

            <h4>${ingredient}</h4>
        </li>`;

    });

    ul_ingredients.innerHTML = html_ingredients;
}