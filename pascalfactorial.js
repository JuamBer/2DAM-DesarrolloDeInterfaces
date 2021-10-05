
var num = 20; //número de filas  

//creamos la matriz bidimensional A(n,n)  
var pascalTriangle = new Array(num);
for (var i = 1; i <= num; i++) {
    pascalTriangle[i] = new Array(num);
}

//alimentamos la matriz  
for (i = 1; i <= num; i++) {
    for (j = 1; j <= i; j++) {
        pascalTriangle[i][j] = combina(i - 1, j - 1);
    }
}
//imprimimos los resultados  
//imprimimos los resultados  
var texto = '';
for (i = 1; i <= num; i++) {
    for (j = 1; j <= i; j++) {
        texto += pascalTriangle[i][j];
        texto += " ";
    }
    texto += "<br>";
}
console.log(texto);
//función que calcula el número combinatorio p sobre q  
function combina(p, q) {
    return factorial(p) / (factorial(q) * factorial(p - q));
}
//función que calcula el factorial  
function factorial(h) {
    var f = 1;
    if (h !== 0) {
        for (k = 1; k <= h; k++) {
            f *= k;
        }
    }
    return f;
}