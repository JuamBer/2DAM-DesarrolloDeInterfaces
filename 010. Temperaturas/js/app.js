let celsius = document.getElementById("celsius");
let kelvin = document.getElementById("kelvin");

let convertir = document.getElementById("convertir");
let limpiar = document.getElementById("limpiar");

limpiar.addEventListener('click', ()=>{
    celsius.value="";
    kelvin.value = "";
});

convertir.addEventListener('click', () => {
    let kel = parseInt(celsius.value);
    kelvin.value = kel + 273.15;
});