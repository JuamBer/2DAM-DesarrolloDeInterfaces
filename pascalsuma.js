
var num = 20; //número de filas  

//creamos la matriz bidimensional A(n,n)  
var pascalTriangle = new Array(num);
for (var i = 1; i <= num; i++) {
    pascalTriangle[i] = new Array(num);
}
for (i = 1; i <= num; i++) {
    for (j = 1; j <= i; j++) {
        pascalTriangle[i][j] = 0;
    }
}



//alimentamos la matriz  
for (i = 1; i <= num; i++) {
    pascalTriangle[i][0]=1;
    for (j = 1; j <= i; j++) {
        if(i==1){
           
        }else{
            console.log("pascalTriangle["+i+"]["+j+"]->" + pascalTriangle[i][j]);
            console.log("pascalTriangle["+(i - 1)+"]["+j+"]->" + pascalTriangle[i - 1][j]);
             console.log("pascalTriangle["+(i - 1)+"]["+(j - 1)+"]->" + pascalTriangle[i - 1][j - 1]);
             
             pascalTriangle[i][j] = pascalTriangle[i - 1][j - 1] + pascalTriangle[i - 1][j];
        }
        
    }
}

console.log(texto);
//función que calcula el número combinatorio p sobre q  
function calcNum(a, b) {
    let result;
    return result;
}


var texto = '';
for (i = 1; i <= num; i++) {
    for (j = 1; j <= i; j++) {
        texto += pascalTriangle[i][j];
        texto += " ";
    }
    texto += "<br>";
}

console.log(texto);