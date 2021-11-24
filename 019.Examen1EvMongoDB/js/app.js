const {
    dialog
} = require('@electron/remote');
let fs = require("fs");

const mongoose = require('mongoose');

//promesa por defecto
mongoose.Promise = global.Promise;
//conectar con la base de datos
mongoose.connect('mongodb://localhost:27017/DI',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Definit esquema
let sh_esquema = new mongoose.Schema({
    id: {type:Number},
    superhero: {type:String},
    publisher: {type:String},
    alter_ego: {type:String},
    first_appearance: {type:String},
    characters: {type:String},
    img: {type:String},
    votes: {type:Number}
});
//modelo
let sh = mongoose.model('superheroes', sh_esquema);
//buscar datos

sh.find().then(resultado => {
    console.log(resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

let superheroes = new Array();
superheroes = JSON.parse(fs.readFileSync('db/superheroes.json'));
let votes = new Array();
votes = JSON.parse(fs.readFileSync('db/votes.json'));

let mostvotedinfo = document.getElementById("mostvotedinfo");
let info = document.getElementById("info");
let vote = document.getElementById("vote");
let btnvote = document.getElementById("btnvote");
let btnbefore = document.getElementById("btnbefore");
let btnnext = document.getElementById("btnnext");
let img = document.getElementById("img");

let pos = 0;

loadSuperhero()
btnvote.addEventListener('click', ()=>{voteSuperhero()});
btnbefore.addEventListener('click', ()=>{beforeImg()});
btnnext.addEventListener('click', ()=>{nextImg()});

function voteSuperhero() {
    let name = vote.value
    votes.push({
        "id": pos,
        "voter": "" + name + ""
    });
    try {
        let data = JSON.stringify(votes, null, 2);
        fs.writeFileSync('db/votes.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } catch (error) {
        console.log(error);
    }
    dialog.showMessageBox({
        message: 'Has votado a '+superheroes[pos].superhero+'!',
        type: 'info',
        buttons: ['Okay'],
        title: 'Superheroes'
    });
    vote.value="";
    checkMostVoted()
    try {
        let datasuperheroes = JSON.stringify(superheroes, null, 2);
        fs.writeFileSync('db/superheroes.json', datasuperheroes, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        }); 
    } catch (error) {
        console.log(error);
    }
}
function checkMostVoted() {
    let idmostvoted;
    let maxvotes = 0;
    superheroes.forEach(e => {
        e.votes=0;
    })

    superheroes.forEach(e1 => {
        votes.forEach(e2 => {
            if (e1.id == e2.id) {
                e1.votes = e1.votes + 1
            }
        }) 
        console.log(e1.superhero+": "+e1.votes);
    })
    
    superheroes.forEach(e => {
        if (e.votes > maxvotes){
            maxvotes = e.votes;
            idmostvoted=e.id;
        }
    })
    mostvotedinfo.innerHTML = "The most voted Superhero is " + superheroes[idmostvoted].superhero + " with "+maxvotes+ " votes"

}

function beforeImg() {
    if ((pos - 1) >= 0) {
        pos--;
        loadSuperhero()
    } else {
        dialog.showMessageBox({
            message: 'No hay Más Superheroes!',
            type: 'info',
            buttons: ['Okay'],
            title: 'Superheroes'
        });
    }
}
function nextImg(){
    if ((pos + 1) < superheroes.length){
        pos++;
        loadSuperhero()
    }else{
        dialog.showMessageBox({
            message: 'No hay Más Superheroes!',
            type: 'info',
            buttons: ['Okay'],
            title: 'Superheroes'
        });
    }
}
function loadSuperhero(){
    let superhero = superheroes[pos].superhero
    let publisher = superheroes[pos].publisher
    let alter_ego = superheroes[pos].alter_ego
    let first_appearance = superheroes[pos].first_appearance
    let characters = superheroes[pos].characters
    let src = "../img/"+superheroes[pos].img

    let table = `
        <table class = "table-striped">
        <tr>
            <td>superhero: </td>
            <td>${superhero}</td>
        </tr>
        <tr>
            <td>publisher: </td> 
            <td> ${publisher} </td> 
        </tr>
        <tr>
            <td>alter ego: </td> 
            <td>${alter_ego}</td>
        </tr>
        <tr>
            <td>first appearance: </td> 
            <td>${first_appearance}</td>
        </tr>    
        <tr>    
            <td>characters: </td> 
            <td>${characters}</td>
        </tr>
        </table>
    `;
    info.innerHTML=table
    img.src=src
}