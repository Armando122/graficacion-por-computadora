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

    //Radio del círculo móvil 
    let radioMóvil = 40;

    //Factor k, elección de usuario
    let k = 2.5;

    context.strokeStyle = '#4a98d3';

    //Dibujamos la epicicloide
    for (let giro = 0; giro < 361; giro++) {
        let x = xElement(giro, radioMóvil, k) + 400;
        let y = yElement(giro, radioMóvil, k) + 300;
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x,y);
        context.stroke();
    }
});

/* 
Función parametrica de x para la epicicloide 
Recibe el ángulo teta, el radio del círculo móvil r y el factor k
*/
function xElement(teta, r, k) {
    izq = r * (k+1) * Math.cos(teta);
    der = r * Math.cos((k+1) * teta);
    return izq - der;
}

/* 
Función parametrica de y para la epicicloide 
Recibe el ángulo teta, el radio del círculo móvil r y el factor k
*/
function yElement(teta, r, k) {
    izq = r * (k+1) * Math.sin(teta);
    der = r * Math.sin((k+1) * teta);
    return izq - der;
}

// Por hacer:
/*
1. Hacer lineTo
*/
