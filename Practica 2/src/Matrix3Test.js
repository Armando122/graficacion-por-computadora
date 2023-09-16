// Test
constructorMatrix3Test();
identityTest();


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
    let i = m.identity();
    let elemsM = [i.a01, i.a02, i.a10, i.a12, i.a20, i.a21];
    let test = elemsM.every(value=> {
        return value === 0;
    });
    if (i.a00 == 1 && i.a11 == 1 && i.a22 == 1) {
        test = test && true;
    }

    if (test) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}