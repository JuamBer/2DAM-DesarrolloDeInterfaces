let input = lldocument.getElementById("input");
let btn = document.getElementById("btn");
let pantalla = document.getElementById("screen");
const num = 16;

btn.addEventListener('click', () => {
    var valores = input.value.split(" ");
    valores.forEach(element => {
        element = parseInt(element);
        console.log(element);
    });
    if (valores.length > 4) {
        pantalla.innerHTML = "Demasiados parámetros";
    } else {
        var table = new Array(num);
        for (var i = 0; i < num; i++) {
            table[i] = new Array(num);
        }
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < num; j++) {
                table[i][j] = 0;
            }
        }
        let total = table.length;
        let mitad = total / 2;
        let starti = 0;
        let startj = 0;
        let stopi = total;
        let stopj = total;
        filltable(table, valores, total, mitad, starti, startj, stopi, stopj);

        pantalla.innerHTML = getScreen(table);
    }
});

function filltable(table, valores, total, mitad, starti, startj, stopi, stopj) {
    console.log("FILLTABLE -> VALORESRESTANTES=" + valores.length + "TOTAL=" + total + "; MITAD=" + mitad + "; STARTI=" + starti + "; STARTJ=" + startj + "; STOPI=" + stopi + "; STOPJ=" + stopj);

    console.log("valores[0]: " + valores[0]);
    if (valores[0] != undefined) {
        total = total / 2;
        mitad = total / 2;

        console.log("1-> TOTAL=" + total + "; MITAD=" + mitad);
        switch (parseInt(valores[0])) {
            case 1:
                valores.splice(0, 1);
                filltable(table, valores, total, mitad, starti, startj, stopi - total, stopj - total);
                break;
            case 2:
                valores.splice(0, 1);
                filltable(table, valores, total, mitad, starti, startj + total, stopi - total, stopj);
                break;
            case 3:
                valores.splice(0, 1);
                filltable(table, valores, total, mitad, starti + total, startj + total, stopi, stopj);
                break;
            case 4:
                valores.splice(0, 1);
                filltable(table, valores, total, mitad, starti + total, startj, stopi, stopj - total);
                break;
        }
    } else {
        forfilltable(table, starti, startj, stopi, stopj);
    }

    return table;
}

function forfilltable(table, starti, startj, stopi, stopj) {
    for (var i = starti; i < stopi; i++) {
        for (var j = startj; j < stopj; j++) {
            table[i][j] = "X";
        }
    }
    console.log("FORFILLTABLE:\n");
    console.log(table);
    return table;
}

function getScreen(table) {
    var texto = "";
    for (i = 0; i < num; i++) {
        texto += "<br>";
        for (j = 0; j < num; j++) {
            texto += table[i][j] + " " + " ";
        }
        texto += " ";
    }
    return texto;
}