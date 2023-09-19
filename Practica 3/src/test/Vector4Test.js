// Tests
testConstructor();
testAdd();
testClone();

// Test constructor
function testConstructor() {
    let text = "Prueba constructor: ";
    let v = new CG.Vector4(1,1,1,1);
    let vVacio = CG.Vector4();
    let test = true;
    if (v.x == 1 && v.y == 1 && v.z == 1 && v.w == 1 &&
        vVacio.x == 0 && vVacio.y == 0 && vVacio.z == 0 && vVacio.w == 0) {
        test = test && true;
    } else {
        test = test && false;
    }
    if (test) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test suma
function testAdd() {
    let text = "Prueba suma: ";
    let u = new CG.Vector4(1,1,1,1);
    let v = new CG.Vector4(4,4,4,4);
    let suma = CG.Vector4.add(u, v);
    let test = new CG.Vector4(5,5,5,5);
    if (CG.Vector4.exactEquals(suma, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test clone
function testClone() {
    let text = "Prueba clonar: ";
    let v = new CG.Vector4(4,5,3,5);
    let copia = v.clone();
    if (CG.Vector4.exactEquals(v, copia)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}