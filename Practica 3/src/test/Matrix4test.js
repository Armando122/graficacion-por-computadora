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
//Pendientes
testLookAt();
testMultiply();
testMultiplyScalar();
testMultiplyVector();
testOrthographic();
testPerspective();
testRotateX();

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
    let test = new CG.Matrix4(210,-136,165,-50, -39,5,20,-92, -190,-12,-48,79, 61,-26-104,53);
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
    let m3 = new CG.Matrix4(1.56,1.56,1.23,1.45, 1.2,1.12,1.23,1.12, 1.12,1.23,1.23,1.34, 1.58,1.58,1.58,1);
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
    let test = new CG.Matrix4(-1,0,0,0, 0,4/3,0,0, 0,0,-103/97,-600/97, 0,0,-1,0);
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