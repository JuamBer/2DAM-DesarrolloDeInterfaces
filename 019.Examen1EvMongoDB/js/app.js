const {dialog} = require('@electron/remote');
const mongoose = require('mongoose');
let mostvotedinfo = document.getElementById("mostvotedinfo");
let info = document.getElementById("info");
let vote = document.getElementById("vote");
let btnvote = document.getElementById("btnvote");
let btnbefore = document.getElementById("btnbefore");
let btnnext = document.getElementById("btnnext");
let img = document.getElementById("img");
let superheroes;
let pos = 0;
let votes;

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

let votes_esquema = new mongoose.Schema({
    id: {type:Number},
    voter: {type:String},
});

//modelo
let sh = mongoose.model('superheroes', sh_esquema);
let vt = mongoose.model('votes', votes_esquema);

//buscar datos
sh.find().then(resultado => {
    superheroes = resultado;
    console.log(superheroes);
    loadSuperhero()
}).catch(error => {
    console.log("ERROR:", error);
});
vt.find().then(resultado => {
    votes = resultado;
    console.log(votes);
}).catch(error => {
    console.log("ERROR:", error);
});

btnvote.addEventListener('click', ()=>{voteSuperhero()});
btnbefore.addEventListener('click', ()=>{beforeImg()});
btnnext.addEventListener('click', ()=>{nextImg()});

function voteSuperhero() {
    let name = vote.value
    let nVote = new vt({
        id: pos,
        voter: name
    });
    nVote.save(nVote).then(resultado => {
        console.log("BIEN:", resultado);
    }).catch(error => {
        console.log("ERROR:", error);
    });

    dialog.showMessageBox({
        message: 'Has votado a '+superheroes[pos].superhero+'!',
        type: 'info',
        buttons: ['Okay'],
        title: 'Superheroes'
    });
    vote.value="";
    checkMostVoted()
    
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