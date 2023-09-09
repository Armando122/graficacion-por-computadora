//Script principal
/**
 * Armando Ramírez González
 */
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

    
    //Factor k, elección de usuario
    let k = 2.1;
    
    //Radio del círculo móvil 
    let radioMóvil = 70/k;

    // Configuración de color y grosor de línea para la epicicloide
    context.strokeStyle = '#4a98d3';
    context.lineWidth = 1;

    //Dibujamos la epicicloide
    let sumaGiro = 0.01;
    for (let giro = 0; giro <= 76; giro=giro+sumaGiro) {
        let x1 = xElement(giro, radioMóvil, k) + 400;
        let y1 = yElement(giro, radioMóvil, k) + 300;

        let x2 = xElement(giro+sumaGiro, radioMóvil, k) + 400;
        let y2 = yElement(giro+sumaGiro, radioMóvil, k) + 300;

        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
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
