// Test
constructorMatrix3Test();
identityTest();
invertTest();
multiplyTest();
multiplyScalarTest();
multiplyVectorTest();
rotateTest();
scaleTest();
setfTest();
substractTest();
translateTest();
transposeTest();

// Test constructor
function constructorMatrix3Test() {
    let text = "Prueba constructor Matrix3: ";
    let mVacia = new CG.Matrix3();
    let m = new CG.Matrix3(1,2,3,4,5,6,7,8,9);
    let elemsM = [m.a00, m.a01, m.a02, m.a10, m.a11, m.a12, m.a20, m.a21, m.a22];
    let elems = [1,2,3,4,5,6,7,8,9];
    let elemsVacio = [mVacia.a01, mVacia.a02, mVacia.a10, mVacia.a12, mVacia.a20, mVacia.a21];
    let testVacio = elemsVacio.every(value=> {
        return value === 0;
    });
    if (mVacia.a00 == 1 && mVacia.a11 == 1 && mVacia.a22 == 1) {
        testVacio = testVacio && true;
    }
    let test = true;
    for (let index = 0; index < 9; index++) {
        if (elemsM[index] == elems[index]) {
            test = test && true;
        } else {
            test = test && false;
        }
    }

    if (testVacio && test) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}


// Test identity
function identityTest() {
    let text = "Prueba identidad Matrix3: ";
    let m = new CG.Matrix3(2,3,4, 3,4,5, 6,7,4);
    m.identity();
    let elemsM = [m.a01, m.a02, m.a10, m.a12, m.a20, m.a21];
    let test = elemsM.every(value=> {
        return value === 0;
    });
    if (m.a00 == 1 && m.a11 == 1 && m.a22 == 1) {
        test = test && true;
    }

    if (test) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test invert
function invertTest() {
    let text = "Prueba invert: ";
    let m = new CG.Matrix3(2,0,1, 3,0,0, 5,1,1);
    let test = new CG.Matrix3(0,(1/3),0, -1,-1,1, 1,(-2/3),0);
    let inv = m.invert();
    if (CG.Matrix3.equals(test, inv)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test multiply
function multiplyTest() {
    let text = "Prueba multiplicación: ";
    let d = new CG.Matrix3(1,6,0, -1,3,1, 4,6,2);
    let e = new CG.Matrix3(0,4,0, 2,3,1, 1,-2,1);
    let multDETest = new CG.Matrix3(12,22,6, 7,3,4, 14,30,8);
    let multiplyDE = CG.Matrix3.multiply(d,e);
    if (CG.Matrix3.equals(multiplyDE,multDETest)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test multiplyScalar
function multiplyScalarTest() {
    let text = "Prueba multiplicación escalar: ";
    let m = new CG.Matrix3(2,3,0, 1,2,0, 3,-5,6);
    let escalar = 5;
    let res = CG.Matrix3.multiplyScalar(m, escalar);
    let test = new CG.Matrix3(10,15,0, 5,10,0, 15,-25,30);
    if (CG.Matrix3.equals(res,test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test multiplyVector
function multiplyVectorTest() {
    let text = "Prueba multiplicación de Vector por Matriz: "
    let v = new CG.Vector3(1,-5,6);
    let m = new CG.Matrix3(0,0.25,1, 6,-3.40,4.42, 7,10,-5.25);
    let vRes = m.multiplyVector(v);
    let test = new CG.Vector3(4.75, 49.52, -74.5);
    if (CG.Vector3.equals(vRes, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test rotate
function rotateTest() {
    let text = "Prueba rotación: ";
    let theta = (Math.PI/180)*45;
    let test = new CG.Matrix3(Math.cos(theta),-Math.sin(theta),0, 
                              Math.sin(theta), Math.cos(theta),0, 
                              0,0,1);
    let m = CG.Matrix3.rotate(theta);
    if (CG.Matrix3.equals(test,m)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test scale
function scaleTest() {
    let text = "Prueba escalamiento: ";
    let m = CG.Matrix3.scale(5,10);
    let test = new CG.Matrix3(5,0,0, 0,10,0, 0,0,1);
    if (CG.Matrix3.equals(m,test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test set
function setfTest() {
    let text = "Prueba set: ";
    let m = new CG.Matrix3(2,3,0, 1,2,0, 3,5,6);
    m.set(0,0,0, 1,1,1, 2,2,2);
    let test = new CG.Matrix3(0,0,0, 1,1,1, 2,2,2);
    if (CG.Matrix3.equals(m,test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test substract
function substractTest() {
    let text = "Prueba sustracción: ";
    let m1 = new CG.Matrix3(2,3,0, 1,2,0, 3,5,6);
    let m2 = new CG.Matrix3(0,0,0, 1,1,1, 2,2,2);
    let res = CG.Matrix3.substract(m1,m2);
    let test = new CG.Matrix3(2,3,0, 0,1,-1, 1,3,4);
    if (CG.Matrix3.equals(res,test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test Translate
function translateTest() {
    let text = "Prueba translación: ";
    let m = CG.Matrix3.translate(5,-10);
    let test = new CG.Matrix3(1,0,5, 0,1,-10, 0,0,1);
    if (CG.Matrix3.equals(m, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test transpose
function transposeTest() {
    let text = "Prueba transpuesta: ";
    let m = new CG.Matrix3(2,3,0, 1,2,0, 3,5,6);
    let t = m.transpose();
    let test = new CG.Matrix3(2,1,3, 3,2,5, 0,0,6);
    if (CG.Matrix3.equals(t, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}
