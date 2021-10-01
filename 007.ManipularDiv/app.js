let mDiv = document.getElementById("datos");

mDiv.innerHTML = "<p> Contenido del div </p>";

//Crear un botón
let button = document.createElement("button");
//añadirle el atributo texto del botón
button.textContent = "button";

mDiv.appendChild(button);
//manejar evento click del botón:
button.addEventListener('click', () => {
    alert('Button Clicked!!!');
})