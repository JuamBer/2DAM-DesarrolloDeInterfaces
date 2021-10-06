let input = document.getElementById("input");
let btn = document.getElementById("btn");
let pantalla = document.getElementById("screen");
const num = 16;

btn.addEventListener('click', () => {
        var table = new Array(num);
        for (var i = 1; i <= num; i++) {
            table[i] = new Array(num);
        }
        for(var i = 1; i <= num;i++){
            for (var j = 1; j <= num; j++) {
                table[i][j]=0;
            }
        }
        console.log(getScreen(table));
        pantalla.innerHTML = getScreen(table);

});

function getScreen(table) {
    var texto = "";
    for (i = 1; i <= num; i++) {
        texto += "<br>";
        for (j = 1; j <= num; j++) {
            texto += table[i][j]+" "+" ";
        }
        texto += " ";
    }
    return texto;
}
