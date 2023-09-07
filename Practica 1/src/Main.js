//Script principal
window.addEventListener("load", function(evt) {
    //Se obtiene el canvas
    let canvas = document.getElementById("el_canvas");
    let context = canvas.getContext("2d");

    //Construimos las líneas eje
    context.lineWidth = 2;
    context.strokeStyle = '#f5deb3';

    // Eje Vertical
    context.setLineDash([10,15]);
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(400,10);
    context.lineTo(400,590);
    context.stroke();

    //Eje Horizontal
    context.setLineDash([10,15]);
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(10,300);
    context.lineTo(800,300);
    context.stroke();
});

// Por hacer:
/*
1. Definir funciones parametricas
2. Definir ciclo for para formar puntos
3. Hacer lineTo
*/
