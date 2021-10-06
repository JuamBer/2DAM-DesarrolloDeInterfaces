var num = 20; //número de filas  

//creamos la matriz bidimensional A(n,n)  
    let pascalTriangle = new Array(num);
    for (let i = 0; i < num; i++) {
        pascalTriangle[i] = new Array(num);
    }

    for (let i = 0; i < 1; i++) {
        pascalTriangle[i][0] = 1;
        for (let j = 0; j < num; j++) {
            pascalTriangle[i][j] = 0;
        }
    }
    pascalTriangle[0][0] = 1;
    for (let i = 1; i < num; i++) {
        pascalTriangle[i][0] = 1;
        for (let j = 1; j < num; j++) {
            pascalTriangle[i][j] = pascalTriangle[i - 1][j] + pascalTriangle[i - 1][j - 1];
        }
    }

