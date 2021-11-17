let datos = [{
        nombre: "Nacho",
        telefono: "966112233",
        edad: 40
    },
    {
        nombre: "Ana",
        telefono: "911223344",
        edad: 35
    },
    {
        nombre: "Mario",
        telefono: "611998877",
        edad: 15
    },
    {
        nombre: "Laura",
        telefono: "633663366",
        edad: 17
    }
];

console.log("---JSON--")
console.log(datos)

datos.push({
    nombre: "Pedro",
    telefono: "611944444",
    edad: 25
}, {
    nombre: "Julia",
    telefono: "633232323",
    edad: 37
})
console.log("---AÑADIMOS ELEMENTOS--")
console.log(datos)

console.log("---ORDENADOS POR EDAD--")
datos.sort((n1, n2)=> {
    return n1.edad - n2.edad;
})
console.log(datos)

console.log("---ORDENADOS POR NOMBRE--")
datos.sort((a,b)=>{
    return a.nombre.localeCompare(b.nombre);
})
console.log(datos)

console.log("---FILTER NUEVO ARRAY--")
let a = datos.filter((element)=>{
    return element.edad > 29
})
console.log(a)