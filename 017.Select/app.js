let f = require("./opciones.json");

let div = document.getElementById("div");
let select = document.getElementById("select");
let cadena;

for (let i = 0; i < f.length; i++) {
    cadena += "<option value=" + f[i].n + ">" + f[i].valor + "</option>";
}

select.innerHTML = cadena;
select.addEventListener('change', () =>{
    let s = ""
    s = "has hecho clic en " + select.value;
    console.log(s);
    div.innerHTML = s;
});