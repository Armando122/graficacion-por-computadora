// Tests
testConstructorM4();
testAdd();
testAdjoint();
testClone();
testDeterminant();
testEquals();
testExactEquals();
testFrustum();
testIdentiy();
testInvert();
testLookAt();
testMultiply();
testMultiplyScalar();
testMultiplyVector();
testOrthographic();
testPerspective();
testRotateX();
testRotateY();
testRotateZ();
testScale();
testSet();
testSubstract();
testTranslate();
testTranspose();

// Test constructor
function testConstructorM4() {
    let text = "Prueba constructor: ";
    let m = new CG.Matrix4(0,1,2,3, 4,5,6,7, 8,9,10,11, 12,13,14,15);
    let vacia = new CG.Matrix4();
    let test = true;
    if (m.a00 == 0 && m.a01 == 1 && m.a02 == 2 && m.a03 == 3 && 
        m.a10 == 4 && m.a11 == 5 && m.a12 == 6 && m.a13 == 7 && 
        m.a20 == 8 && m.a21 == 9 && m.a22 == 10 && m.a23 == 11 &&
        m.a30 == 12 && m.a31 == 13 && m.a32 == 14 && m.a33 == 15) {
        test = test && true;
    } else {
        test = test && false;
    }
    if (vacia.a00 == 1 && vacia.a01 == 0 && vacia.a02 == 0 && vacia.a03 == 0 && 
        vacia.a10 == 0 && vacia.a11 == 1 && vacia.a12 == 0 && vacia.a13 == 0 && 
        vacia.a20 == 0 && vacia.a21 == 0 && vacia.a22 == 1 && vacia.a23 == 0 &&
        vacia.a30 == 0 && vacia.a31 == 0 && vacia.a32 == 0 && vacia.a33 == 1) {
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

// Test add
function testAdd(params) {
    let text = "Prueba suma 4x4: ";
    let m1 = new CG.Matrix4(1,2,3,4, 5,6,7,8, 9,10,11,12, 13,14,15,16);
    console.log(m1.toArray());
    let m2 = new CG.Matrix4(1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1);
    let res = CG.Matrix4.add(m1, m2);
    let test = new CG.Matrix4(2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17);
    if (CG.Matrix4.equals(res, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test adjoint
function testAdjoint() {
    let text = "Prueba adjunta: ";
    let m = new CG.Matrix4(0,2,3,-1, 4,5,5,5, -1,4,0,6, 0,8,-1,2);
    let adj = m.adjoint();
    let test = new CG.Matrix4(210,-136,165,-50, -39,5,20,-92, -190,-12,-48,79, 61,-26,-104,53);
    if (CG.Matrix4.equals(adj, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test clone
function testClone() {
    let text = "Prueba clonar: ";
    let m = new CG.Matrix4(1,1,1,1, 2,2,2,2, 3,3,3,3, 4,4,4,4);
    let clon = m.clone();
    if (CG.Matrix4.exactEquals(m, clon)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test determinant
function testDeterminant() {
    let text = "Prueba determinante: ";
    let m = new CG.Matrix4(1,2,3,4, 2,1,2,3, 3,2,1,2, 4,3,2,1);
    let det = m.determinant();
    if (det == -20) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test equals
function testEquals() {
    let text = "Prueba equals: ";
    let m1 = new CG.Matrix4(1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1);
    let m2 = new CG.Matrix4();
    let m3 = new CG.Matrix4(1.000001,1.000001,1.000001,1.000001, 1.000001,1.000001,1.000001,1.000001, 1.000001,1.000001,1.000001,1.000001, 1.000001,1.000001,1.000001,1);
    let test = true;
    if (!CG.Matrix4.equals(m1,m2)) {
        test = test && true;
    } else {
        test = test && false;
    }
    if (CG.Matrix4.equals(m1,m3)) {
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
    let text = "Prueba exactEquals: ";
    let m1 = new CG.Matrix4(1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1);
    let m2 = new CG.Matrix4();
    let m3 = new CG.Matrix4(1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1);
    let test = true;
    if (!CG.Matrix4.exactEquals(m1,m2)) {
        test = test && true;
    } else {
        test = test && false;
    }
    if (CG.Matrix4.exactEquals(m1,m3)) {
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

// Test frustum
function testFrustum() {
    let text = "Prueba frustrum: ";
    let aspect = 800/600;
    let frustrum = CG.Matrix4.frustum(-3,3, -3/aspect, 3/aspect, 3, 100);
    let test = new CG.Matrix4(1,0,0,0, 0,4/3,0,0, 0,0,-103/97,-600/97, 0,0,-1,0);
    if (CG.Matrix4.equals(frustrum, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test identity
function testIdentiy() {
    let text = "Prueba identidad: ";
    let m = new CG.Matrix4(1,2,3,4, 2,1,2,3, 3,2,1,2, 4,3,2,1);
    m.identity();
    if (m.a00 == 1 && m.a01 == 0 && m.a02 == 0 && m.a03 == 0 && 
        m.a10 == 0 && m.a11 == 1 && m.a12 == 0 && m.a13 == 0 && 
        m.a20 == 0 && m.a21 == 0 && m.a22 == 1 && m.a23 == 0 &&
        m.a30 == 0 && m.a31 == 0 && m.a32 == 0 && m.a33 == 1) {
            console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }

}

// Test invert
function testInvert() {
    let text = "Prueba inversa: ";
    let m = new CG.Matrix4(10,2,2,7, 5,1,4,5, 5,5,1,7, 0,0,0,1);
    let inv = m.invert();
    let test = new CG.Matrix4(19/120,-1/15,-1/20,-17/40, -1/8,0,1/4,-7/8, -1/6,1/3,0,-1/2, 0,0,0,1);
    if (CG.Matrix4.equals(inv,test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test lookAt
function testLookAt() {
    let text = "Prueba lookAt: ";
    let eye = new CG.Vector3(3,2,4);
    let center = new CG.Vector3(0,0,0);
    let up = new CG.Vector3(0,1,0);
    let mLookAt = CG.Matrix4.lookAt(eye, center, up);
    let test = new CG.Matrix4(
                   4/5, 0, -3/5, 0,
                   -6/(5*Math.sqrt(29)), 5/Math.sqrt(29), -8/(5*Math.sqrt(29)), 0,
                   3/Math.sqrt(29), 2/Math.sqrt(29), 4/Math.sqrt(29), -Math.sqrt(29),
                   0, 0, 0, 1);
    if (CG.Matrix4.equals(mLookAt, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test multiply
function testMultiply() {
    let text = "Prueba multiplicación: ";
    let m1 = new CG.Matrix4(1,2,2,2, 3,1,3,3, 4,4,1,4, 5,5,5,1);
    let m2 = new CG.Matrix4(1,2,3,4, 5,6,7,8, 9,10,11,12, 13,14,15,16);
    let res = CG.Matrix4.multiply(m1, m2);
    let test = new CG.Matrix4(55,62,69,76, 74,84,94,104, 85,98,111,124, 88,104,120,136);
    if (CG.Matrix4.equals(res, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test multiplyScalar
function testMultiplyScalar() {
    let text = "Prueba multiplicación por escalar: ";
    let m = new CG.Matrix4(1,2,2,2, 3,1,3,3, 4,4,1,4, 5,5,5,1);
    let k = 2;
    let res = CG.Matrix4.multiplyScalar(m, k);
    let test = new CG.Matrix4(2,4,4,4, 6,2,6,6, 8,8,2,8, 10,10,10,2);
    if (CG.Matrix4.equals(res, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test multiplyVector
function testMultiplyVector() {
    let text = "Prueba multiplicación por un vector: ";
    let m = new CG.Matrix4(1,2,2,2, 3,1,3,3, 4,4,1,4, 5,5,5,1);
    let v = new CG.Vector4(5,4,3,1);
    let res = m.multiplyVector(v);
    let test = new CG.Vector4(21,31,43,61);
    if (CG.Vector4.equals(res, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test orthographic
function testOrthographic() {
    let text = "Prueba ortografica: ";
    let mOrth = CG.Matrix4.orthographic(-3,3, -3/(800/600),3/(800/600), 3,100);
    let test = new CG.Matrix4(
                   2/6, 0, 0, 0,
                   0, 4/9, 0, 0,
                   0, 0, 2/97, 103/97,
                   0, 0, 0, 1);
    if (CG.Matrix4.equals(mOrth, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test perspective
function testPerspective() {
    let text = "Prueba perspectiva: ";
    let theta = (75 * Math.PI) / 180;
    let mPersp = CG.Matrix4.perspective(theta, 800/600, 0.1, 2000);
    let c = 1/Math.tan(theta/2);
    let test = new CG.Matrix4(
                   c/(800/600), 0, 0, 0,
                   0, c, 0, 0,
                   0, 0, -20001/19999, -4000/19999,
                   0, 0, -1, 0);
    if (CG.Matrix4.equals(mPersp, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test rotateX
function testRotateX() {
    let text = "Prueba rotación en x: ";
    let theta = (82*Math.PI) / 180;
    let rot = CG.Matrix4.rotateX(theta);
    let test = new CG.Matrix4(1,0,0,0, 0,Math.cos(theta),-Math.sin(theta),0,
                              0,Math.sin(theta),Math.cos(theta),0, 0,0,0,1);
    if (CG.Matrix4.equals(rot, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test rotateY
function testRotateY() {
    let text = "Prueba rotación en y: ";
    let theta = (82*Math.PI) / 180;
    let rot = CG.Matrix4.rotateY(theta);
    let test = new CG.Matrix4(Math.cos(theta),0,Math.sin(theta),0,
                              0,1,0,0,
                              -Math.sin(theta),0,Math.cos(theta),0, 
                              0,0,0,1);
    if (CG.Matrix4.equals(rot, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test rotateZ
function testRotateZ() {
    let text = "Prueba rotación en z: ";
    let theta = (82*Math.PI) / 180;
    let rot = CG.Matrix4.rotateZ(theta);
    let test = new CG.Matrix4(Math.cos(theta),-Math.sin(theta),0,0,
                              Math.sin(theta),Math.cos(theta),0,0, 
                              0,0,1,0,
                              0,0,0,1);
    if (CG.Matrix4.equals(rot, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test Scale
function testScale() {
    let text = "Prueba escala: ";
    let v = new CG.Vector3(4,5,-9);
    let escala = CG.Matrix4.scale(v);
    let test = new CG.Matrix4(4,0,0,0, 0,5,0,0, 0,0,-9,0, 0,0,0,1);
    if (CG.Matrix4.equals(escala, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test set
function testSet() {
    let text = "Prueba set: ";
    let m = new CG.Matrix4(
        0.9774, 0, 0, 0,
        0, 1.30, 0, 0,
        0, 0, -20001/19999, -4000/19999,
        0, 0, 0, 1);
    m.set(1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1);
    let test = new CG.Matrix4(1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1);
    if (CG.Matrix4.equals(m, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test substract
function testSubstract() {
    let text = "Prueba resta: ";
    let m1 = new CG.Matrix4(4,0,0,0, 0,5,0,0, 0,0,-9,0, 0,0,0,1);
    let m2 = new CG.Matrix4(1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1);
    let res1 = CG.Matrix4.substract(m1,m2);
    let res2 = CG.Matrix4.substract(m2,m1);
    let test1 = new CG.Matrix4(3,-1,-1,-1, -1,4,-1,-1, -1,-1,-10,-1, -1,-1,-1,0);
    let test2 = new CG.Matrix4(-3,1,1,1, 1,-4,1,1, 1,1,10,1, 1,1,1,0);
    if (CG.Matrix4.equals(res1, test1) && CG.Matrix4.equals(res2, test2)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test translate
function testTranslate() {
    let text = "Prueba traslación: ";
    let v = new CG.Vector3(15,-3,48);
    let tras = CG.Matrix4.translate(v);
    let test = new CG.Matrix4(1,0,0,15, 0,1,0,-3, 0,0,1,48, 0,0,0,1);
    if (CG.Matrix4.equals(tras, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test transpose
function testTranspose() {
    let text = "Prueba transpuesta: ";
    let m = new CG.Matrix4(2,4,4,4, 6,2,6,6, 8,8,2,8, 10,10,10,2);
    let transpuesta = m.transpose();
    let test = new CG.Matrix4(2,6,8,10, 4,2,8,10, 4,6,2,10, 4,6,8,2);
    if (CG.Matrix4.equals(transpuesta, test)) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}