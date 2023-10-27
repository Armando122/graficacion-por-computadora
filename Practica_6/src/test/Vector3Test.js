//Test
construirVectorTest();
addTest();
cloneTest();
crossTest();
distanceTest();
//dotTest();

// Test constructor
function construirVectorTest() {
    let vectorVacio = new CG.Vector3();
    let vector = new CG.Vector3(2,3,4);
    let testVacio = false;
    let testVector = false;
    let text = "Prueba constructor Vector3: "
    if (vectorVacio.x == 0 && vectorVacio.y == 0 && vectorVacio.z == 0) {
        testVacio = true;
    }

    if (vector.x == 2 && vector.y == 3 && vector.z == 4) {
        testVector = true;
    }

    if (testVacio && testVector) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla")
    }
}

// Test add
function addTest() {
    let u = new CG.Vector3(1,2,3);
    let v = new CG.Vector3(7,13,6);
    let text = "Prueba Suma Vector3: "
    let suma = CG.Vector3.add(u,v);
    if (suma.x == 8 && suma.y == 15 && suma.z == 9) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test clone
function cloneTest() {
    let vOrig = new CG.Vector3(5,2,-5);
    let vClone = vOrig.clone();
    let text = "Prueba clone Vector3: "
    if (vClone.x == 5 && vClone.y == 2 && vClone.z == -5) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

//Test cross
function crossTest() {
    let text = "Prueba cross Vector3: ";
    let u = new CG.Vector3(3,0,2);
    let v = new CG.Vector3(-1,4,2);
    let res = CG.Vector3.cross(u,v);
    if (res.x == -8 && res.y == -8 && res.z == 12) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test Distance
function distanceTest() {
    let text = "Prueba distance Vector3: ";
    let u = new CG.Vector3(1,1,4);
    let v = new CG.Vector3(3,0,2);
    if (CG.Vector3.distance(u,v) == 3) {
        console.log(text + "Pasa");
    } else {
        console.log(text + "Falla");
    }
}

// Test dot