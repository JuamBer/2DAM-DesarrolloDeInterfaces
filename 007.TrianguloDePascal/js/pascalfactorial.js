
//Creamos Triangulo de pascal
function Triangle(num){
    var pascalTriangle = new Array(num);
    for (var i = 1; i <= num; i++) {
        pascalTriangle[i] = new Array(num);
    }

    for (i = 1; i <= num; i++) {
        for (j = 1; j <= i; j++) {
            pascalTriangle[i][j] = combina(i - 1, j - 1);
        }
    }
    return pascalTriangle;
}



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

//imprimimos los resultados  
function seeTriangle(pascalTriangle,num) {
    var texto = " ";
    for (i = 1; i <= num; i++) {
        for (j = 1; j <= num; j++) {
            texto += pascalTriangle[i][j];
            texto += " ";
        }
        texto += " ";
    }
}

console.log(seeTriangle(Triangle(10),10));