// Tests
testConstructor();
testAdd();
testClone();
testDistance();
testDot();
testEquals();
testExactEquals();
testNormalize();
testSet();
testSquareDistance();
testZero();

// Test constructor
function testConstructor() {
    let text = "Prueba constructor: ";
    let v = new CG.Vector4(1,1,1,1);
    let vVacio = new CG.Vector4();
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
    let v = new CG.Vector4(4,4,4,1);
    let suma = CG.Vector4.add(u, v);
    let test = new CG.Vector4(5,5,5,2);
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

// Test distance
function testDistance() {
    let text = "Prueba distancia: ";
    let a = new CG.Vector4(0,2,0,1);
    let b = new CG.Vector4(7,2,-1,1);
    let test = Math.sqrt(50);
    let res = CG.Vector4.distance(a,b);
    if (res == test) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test Dot
function testDot() {
    let text = "Prueba producto punto: ";
    let u = new CG.Vector4(1, 1/2, 3, 1);
    let v = new CG.Vector4(4, -4, 1, 1);
    let test = 6;
    let dot = CG.Vector4.dot(u, v);
    if (test == dot) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test Equals
function testEquals() {
    let text = "Prueba equals: ";
    let u = new CG.Vector4(1,1,1,1);
    let v = new CG.Vector4(2,3,4,5);
    let s = new CG.Vector4(1.000001,1.000001,1.000001,1.000001);
    let test = true;
    if (!CG.Vector4.equals(u,v)) {
        test = test && true;
    } else {
        test = test && false;
    }
    if (CG.Vector4.equals(u,s)) {
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

// Test exactEquals
function testExactEquals() {
    let text = "Prueba exact equals: ";
    let u = new CG.Vector4(1,1,1,1);
    let v = new CG.Vector4(2,3,4,5);
    let s = new CG.Vector4(1,1,1,1);
    let test = true;
    if (!CG.Vector4.exactEquals(u,v)) {
        test = test && true;
    } else {
        test = test && false;
    }
    if (CG.Vector4.exactEquals(u,s)) {
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

// Test Normalize
function testNormalize() {
    let text = "Prueba normalize: ";
    let u = new CG.Vector4(3,4,3,1);
    let norma = Math.sqrt(35);
    let uN = new CG.Vector4(3/norma, 4/norma, 3/norma, 1/norma);
    let test = u.normalize();
    if (CG.Vector4.equals(uN, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test set
function testSet() {
    let text = "Prueba set: ";
    let u = new CG.Vector4();
    u.set(1,1,1,1);
    let test = new CG.Vector4(1,1,1,1);
    if (CG.Vector4.exactEquals(u, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test squareDistance
function testSquareDistance() {
    let text = "Prueba squareDistance: ";
    let a = new CG.Vector4(0,2,0,1);
    let b = new CG.Vector4(7,2,-1,1);
    let test = Math.pow(Math.sqrt(50),2);
    let res = CG.Vector4.squaredDistance(a,b);
    if (res == test) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test zero
function testZero() {
    let text = "Prueba zero: ";
    let a = new CG.Vector4(50,2,40,1);
    a.zero();
    let v = new CG.Vector4(0,0,0,0);
    if (CG.Vector4.exactEquals(a, v)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}