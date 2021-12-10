let nPreg = 4;
document.getElementById("comprobar").addEventListener('click', () => {
    let aciertos = 0;
    let fallos = 0;
    for (let i = 0; i < nPreg; i++) {
        let ra = document.getElementById('rA' + (i + 1));
        let rb = document.getElementById('rB' + (i + 1));
        let rc = document.getElementById('rC' + (i + 1));
        //supongo que las respuestas A son siempre las correctas:
        if (ra.checked) aciertos++;
        if (rb.checked) fallos++;
        if (rc.checked) fallos++;
    }
    document.getElementById("cabecera").innerHTML = "Aciertos: " +
        aciertos + "   Fallos: " + fallos;
});