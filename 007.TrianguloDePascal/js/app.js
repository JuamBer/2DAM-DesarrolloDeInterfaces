let filas = document.getElementById("filas");
let btntriangle = document.getElementById("btntriangle");
let tbody = document.getElementById("tbody");


btntriangle.addEventListener('click', () => {
    var num = parseInt(filas.value);

    var pascalTriangle = new Array(num);
    for (var i = 1; i <= num; i++) {
        pascalTriangle[i] = new Array(num);
    }

    for (i = 1; i <= num; i++) {
        for (j = 1; j <= i; j++) {
            pascalTriangle[i][j] = combina(i - 1, j - 1);
        }
    }

    var texto = '';
    let mitad = num;
    for (i = 1; i <= num; i++) {
        
        texto += "<tr>";
        for (a = 0; a < mitad; a++) {
            texto += "<td></td>";
        }
       
        for (j = 1; j <= i; j++) {
            texto += "<td>";
            texto += pascalTriangle[i][j];
            texto += "</td>";
            texto += "<td></td>";
        }
       for (a = 1; a < mitad; a++) {
           texto += "<td></td>";
       }
        mitad--;
        texto += "</tr>";
    }
    tbody.innerHTML = texto;
});

function combina(p, q) {
    return factorial(p) / (factorial(q) * factorial(p - q));
}

function factorial(h) {
    var f = 1;
    if (h !== 0) {
        for (k = 1; k <= h; k++) {
            f *= k;
        }
    }
    return f;
}