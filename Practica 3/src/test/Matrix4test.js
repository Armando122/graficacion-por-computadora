// Tests
testConstructorM4();
testAdd();
testAdjoint();
//Pendientes
testClone();
testDeterminant();
testEquals();
testExactEquals();
testFrustum();
testIdentiy();
testInvert();

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