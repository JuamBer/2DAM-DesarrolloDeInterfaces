let input = document.getElementById("input");
let btn = document.getElementById("btn");
let pantalla = document.getElementById("screen");
const num = 16;

btn.addEventListener('click', () => {
        var valores = input.value.split(" ");
        valores.forEach(element => {
            element = parseInt(element);
            console.log(element);
        });
        if(valores.length>4){
            pantalla.innerHTML = "Demasiados parámetros";
        }else{
            var table = new Array(num);
            for (var i = 1; i <= num; i++) {
                table[i] = new Array(num);
            }
            for (var i = 1; i <= num; i++) {
                for (var j = 1; j <= num; j++) {
                    table[i][j] = 0;
                }
            }
                let total = table.length - 1;
                let mitad = total / 2;
            filltable(table, valores,total,mitad);
            
            pantalla.innerHTML = getScreen(table);
        }
        
        

        

});
function filltable(table, valores,total,mitad) {
    console.log("FILLTABLE: valores.length="+valores.length+"total="+total+"mitad="+mitad);

    if (valores.length == 1) {
        switch(valores[1]){
            case 1: forfilltable(table,1,1,mitad,mitad); break;
            case 2: forfilltable(table, 1, mitad+1, mitad, total);
            break;
            case 3: forfilltable(table, mitad + 1, mitad + 1, total, total);
            break;
            case 4: forfilltable(table, mitad +1, 1, total, mitad );
            break;
            default: break;
        }
    }else{
        console.log("valores[1]"+valores[1]);
        switch (valores[1]) {
            case 1:
                    total = (table.length - 1)/2;
                    mitad = (total / 2)/2;
                    valores.splice(1, 1);
                    filltable(table,valores,total,mitad);
                break;
            case 2:
                forfilltable(table, 1, mitad + 1, mitad, total);
                break;
            case 3:
                forfilltable(table, mitad + 1, mitad + 1, total, total);
                break;
            case 4:
                forfilltable(table, mitad + 1, 1, total, mitad);
                break;
            default:
                break;
        }
    }
    return table;
}
function forfilltable(table, starti, startj, stopi,stopj) {
   for(var i = starti; i <=  stopi; i++){
       for (var j = startj; j <= stopj; j++) {
            table[i][j]="X";
       }
   }
   console.log(table);
   return table;
}
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
