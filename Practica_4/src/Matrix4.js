var CG = (function(CG) {
    class Matrix4 {
        /**
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a03
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a13
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         * @param {Number} a23
         * @param {Number} a30
         * @param {Number} a31
         * @param {Number} a32
         * @param {Number} a33
         * Recibe 16 parámetros correspondientes a cada entrada de la matriz de 4x4
         * en caso de no recibir argumentos se construye la matriz identidad.
         */
        constructor(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
            let vacio = [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33].every(value=> {
                return value == null;
            });

            if (vacio) {
                this.a00 = 1;
                this.a01 = 0;
                this.a02 = 0;
                this.a03 = 0;
                this.a10 = 0;
                this.a11 = 1;
                this.a12 = 0;
                this.a13 = 0;
                this.a20 = 0;
                this.a21 = 0;
                this.a22 = 1;
                this.a23 = 0;
                this.a30 = 0;
                this.a31 = 0;
                this.a32 = 0;
                this.a33 = 1;
            } else {
                this.a00 = a00;
                this.a01 = a01;
                this.a02 = a02;
                this.a03 = a03;
                this.a10 = a10;
                this.a11 = a11;
                this.a12 = a12;
                this.a13 = a13;
                this.a20 = a20;
                this.a21 = a21;
                this.a22 = a22;
                this.a23 = a23;
                this.a30 = a30;
                this.a31 = a31;
                this.a32 = a32;
                this.a33 = a33;
            }
        }

        /**
         * @return {Array}
         * Convierte la matriz en un arreglo.
         */
        toArray() {
            return [this.a00, this.a10, this.a20, this.a30, this.a01, this.a11, this.a21, this.a31, this.a02, this.a12, this.a22, this.a32, this.a03, this.a13,
                this.a23, this.a33];
        }

        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Matrix4}
         * Devuelve la suma de las dos matrices
         */
        static add(m1,m2) {
            let suma = new Matrix4(
                m1.a00 + m2.a00,
                m1.a01 + m2.a01,
                m1.a02 + m2.a02,
                m1.a03 + m2.a03,
                m1.a10 + m2.a10,
                m1.a11 + m2.a11,
                m1.a12 + m2.a12,
                m1.a13 + m2.a13,
                m1.a20 + m2.a20,
                m1.a21 + m2.a21,
                m1.a22 + m2.a22,
                m1.a23 + m2.a23,
                m1.a30 + m2.a30,
                m1.a31 + m2.a31,
                m1.a32 + m2.a32,
                m1.a33 + m2.a33
            );
            return suma;
        }

        /**
         * @return {Matrix4}
         * Devuelve la matriz adjunta o de cofactores
         */
        adjoint() {
            let m = this.#toArrayAux();
            let mAux = new Array(4);
            mAux[0] = new Array(4);
            mAux[1] = new Array(4);
            mAux[2] = new Array(4);
            mAux[3] = new Array(4);

            for (let i = 0; i < mAux.length; i++) {
                for (let j = 0; j < mAux[0].length; j++) {
                    let m3 = this.getMinorMatrix(m,i,j);
                    let det3 = m3.determinant();
                    mAux[i][j] = Math.pow(-1,i+j) * det3;
                }
            }

            let adjM = new Matrix4(mAux[0][0],mAux[1][0],mAux[2][0],mAux[3][0],
                                   mAux[0][1],mAux[1][1],mAux[2][1],mAux[3][1],
                                   mAux[0][2],mAux[1][2],mAux[2][2],mAux[3][2],
                                   mAux[0][3],mAux[1][3],mAux[2][3],mAux[3][3]);
            return adjM;
        }

        /**
         * Devuelve una matriz de 3x3 eliminando la columna i y el renglón j
         */
        getMinorMatrix(m, i ,j) {
            let tempC = 0;
            let tempF = 0;
            let tempM = new Array(3);
            tempM[0] = new Array(3);
            tempM[1] = new Array(3);
            tempM[2] = new Array(3);

            for (let k = 0; k < m.length; k++) {
                if (k == i) {
                    continue;
                }

                for (let l = 0; l < m[0].length; l++) {
                    if (l == j) {
                        continue;
                    }
                    tempM[tempC][tempF] = m[k][l];
                    tempF++;
                }
                tempF = 0;

                tempC++;
            }

            return new CG.Matrix3(tempM[0][0],tempM[0][1],tempM[0][2],
                                  tempM[1][0],tempM[1][1],tempM[1][2],
                                  tempM[2][0],tempM[2][1],tempM[2][2]);

        }

        /*
        * Devuelve la matriz en un arreglo
        */
       #toArrayAux() {
        return [
            [this.a00, this.a01, this.a02, this.a03],
            [this.a10, this.a11, this.a12, this.a13],
            [this.a20, this.a21, this.a22, this.a23],
            [this.a30, this.a31, this.a32, this.a33]];
       }

       /**
        * @return {Matrix4}
        * Devuelve una copia de la matriz
        */
       clone() {
        return new Matrix4(
            this.a00, this.a01, this.a02, this.a03,
            this.a10, this.a11, this.a12, this.a13,
            this.a20, this.a21, this.a22, this.a23,
            this.a30, this.a31, this.a32, this.a33
        );
       }

       /**
        * @return {Number}
        * Devuelve el determinante de la matriz
        */
       determinant() {
            let m = this.#toArrayAux();
            let i = 0;
            let res = 0;

            for (let j = 0; j < m[0].length; j++) {
                    let m3 = this.getMinorMatrix(m,i,j);
                    let det3 = m3.determinant();
                    res += Math.pow(-1,i+j) * m[i][j] * det3;
            }
            return res;
       }

        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Boolean}
         */
        static equals(m1,m2) {
            let arrAux = [Math.abs(m1.a00-m2.a00), Math.abs(m1.a01-m2.a01), Math.abs(m1.a02-m2.a02),Math.abs(m1.a03-m2.a03), 
                          Math.abs(m1.a10-m2.a10), Math.abs(m1.a11-m2.a11), Math.abs(m1.a12-m2.a12),Math.abs(m1.a13-m2.a13), 
                          Math.abs(m1.a20-m2.a20), Math.abs(m1.a21-m2.a21), Math.abs(m1.a22-m2.a22),Math.abs(m1.a23-m2.a23),
                          Math.abs(m1.a30-m2.a30), Math.abs(m1.a31-m2.a31), Math.abs(m1.a32-m2.a32),Math.abs(m1.a33-m2.a33)].every(value=> {
                return (value >= 0) && (value < 0.000002);
            });

        if (arrAux) {
            return true;
        }
        return false;
        }

        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Boolean}
         * Devuelve verdadero si sus argumentos son exactamente iguales, falso en otro caso
         */
        static exactEquals(m1, m2) {
            if (m1.a00 == m2.a00 &&
                m1.a01 == m2.a01 &&
                m1.a02 == m2.a02 &&
                m1.a03 == m2.a03 &&
                m1.a10 == m2.a10 && 
                m1.a11 == m2.a11 && 
                m1.a12 == m2.a12 &&
                m1.a13 == m2.a13 && 
                m1.a20 == m2.a20 && 
                m1.a21 == m2.a21 && 
                m1.a22 == m2.a22 &&
                m1.a23 == m2.a23 &&
                m1.a30 == m2.a30 &&
                m1.a31 == m2.a31 &&
                m1.a32 == m2.a32 &&
                m1.a33 == m2.a33) {
                    return true;
            }
            return false;
        }

        /**
         * @param {Number} left
         * @param {Number} right
         * @param {Number} bottom
         * @param {Number} top
         * @param {Number} near
         * @param {Number} far
         * @return {Matrix4}
         * Construye una matriz que representa el frustum
         * determinada por los planos left, right, bottom, top, near y far
         */
        static frustum(left, right, bottom, top, near, far) {
            return new Matrix4(
                (2*near)/(right-left), 0, (right+left)/(right-left), 0,
                0, (2*near)/(top-bottom), (top+bottom)/(top-bottom), 0,
                0, 0, -(far+near)/(far-near), -(2*near*far)/(far-near),
                0, 0, -1, 0
            );
        }

        /**
         * Asigna los valores de la matriz identidad a la matriz que invocó la función
         */
        identity() {
            this.a00 = 1;
            this.a01 = 0;
            this.a02 = 0;
            this.a03 = 0;
            this.a10 = 0;
            this.a11 = 1;
            this.a12 = 0;
            this.a13 = 0;
            this.a20 = 0;
            this.a21 = 0;
            this.a22 = 1;
            this.a23 = 0;
            this.a30 = 0;
            this.a31 = 0;
            this.a32 = 0;
            this.a33 = 1;
        }

        /**
         * @return {Matrix4}
         * Devuelve la matriz inversa de la matriz que invoca la función
         */
        invert() {
            let adjunta = this.adjoint();
            let transpuesta = adjunta.transpose();
            let det = this.determinant();
            let res = Matrix4.multiplyScalar(adjunta, 1/det);
            return res;
        }

        /**
         * @param {Vector3} eye
         * @param {Vector3} center
         * @param {Vector3} up
         * @return {Matrix4}
         * Devuelve la matriz de vista a partir de la posición del ojo, el centro de interés (coi) y
         * el vector hacia arriba
         */
        static lookAt(eye, center, up) {
            let negCenter = new CG.Vector3(-1*center.x, -1*center.y, -1*center.z);
            let subW = CG.Vector3.add(eye, negCenter);
            let w = subW.normalize();
            let subU = CG.Vector3.cross(up, w);
            let u = subU.normalize();
            let v = CG.Vector3.cross(w, u);
            let negEye = new CG.Vector3(-1*eye.x, -1*eye.y, -1*eye.z);
            return new Matrix4(u.x,u.y,u.z, CG.Vector3.dot(negEye, u),
                               v.x,v.y,v.z, CG.Vector3.dot(negEye, v),
                               w.x,w.y,w.z, CG.Vector3.dot(negEye, w),
                               0,0,0,1);
        }

        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Matrix4}
         * Devuelve la multiplicación de dos matrices
         */
        static multiply(m1, m2) {
            let m1Arr = m1.#toArrayAux();
            let m2Arr = m2.#toArrayAux();
            let res = new Array(4);
            for (let m = 0; m < res.length; m++) {
                res[m] = new Array(4);
                for (let l = 0; l < res[m].length; l++) {
                    res[m][l] = 0;
                }
            }

            for (let i = 0; i < res.length; i++) {
                for (let j = 0; j < res.length; j++) {
                    for (let k = 0; k < 4; k++) {
                        res[i][j] += m1Arr[i][k] * m2Arr[k][j];
                    }
                }
            }

            return new Matrix4(res[0][0],res[0][1],res[0][2],res[0][3],
                               res[1][0],res[1][1],res[1][2],res[1][3],
                               res[2][0],res[2][1],res[2][2],res[2][3],
                               res[3][0],res[3][1],res[3][2],res[3][3]);
        }

        /**
         * @param {Matrix4} m1
         * @param {Number} c
         * @return {Matrix4}
         * Devuelve la matriz resultante de multiplicar la matriz original por un escalar.
         */
        static multiplyScalar(m1, c) {
            let multEscalar = new Matrix4(
                m1.a00 * c,
                m1.a01 * c,
                m1.a02 * c,
                m1.a03 * c,
                m1.a10 * c,
                m1.a11 * c,
                m1.a12 * c,
                m1.a13 * c,
                m1.a20 * c,
                m1.a21 * c,
                m1.a22 * c,
                m1.a23 * c,
                m1.a30 * c,
                m1.a31 * c,
                m1.a32 * c,
                m1.a33 * c
            );
            return multEscalar;
        }

        /**
         * @param {Vector4} v
         * @return {Vector4}
         * Devuelve un vector resultado de multiplicar la matriz por el vector
         */
        multiplyVector(v) {
            let v1m = new CG.Vector4(this.a00,this.a01,this.a02,this.a03);
            let v2m = new CG.Vector4(this.a10,this.a11,this.a12,this.a13);
            let v3m = new CG.Vector4(this.a20,this.a21,this.a22,this.a23);
            let v4m = new CG.Vector4(this.a30,this.a31,this.a32,this.a33);
            let res = new CG.Vector4(
                this.#auxMult(v1m,v),
                this.#auxMult(v2m,v),
                this.#auxMult(v3m,v),
                this.#auxMult(v4m,v)
            );
            return res;
        }

        /**
         * @param {Number} left
         * @param {Number} right
         * @param {Number} bottom
         * @param {Number} top
         * @param {Number} near
         * @param {Number} far
         * @return {Matrix4}
         * Devuelve la matriz que corresponde a una proyección ortogonal
         */
        static orthographic(left, right, bottom, top, near, far) {
            let mOrth = new Matrix4(
                2/(right-left), 0, 0, -(right+left)/(right-left),
                0, 2/(top-bottom), 0, -(top+bottom)/(top-bottom),
                0, 0, -2/(near-far), -(far+near)/(near-far),
                0, 0, 0, 1
            );
            return mOrth;
        }

        /**
         * @param {Number} fovy
         * @param {Number} aspect
         * @param {Number} near
         * @param {Number} far
         * @return {Matrix4}
         * Devuelve una matriz correspondiente a una proyección en perspectiva
         */
        static perspective(fovy, aspect, near, far) {
            let c = 1/Math.tan(fovy/2);
            let mPersp = new Matrix4(
                c/aspect, 0, 0, 0,
                0, c, 0, 0,
                0, 0, -(far+near)/(far-near), -(2*near*far)/(far-near),
                0, 0, -1, 0
            );
            return mPersp;
        }

        /*
         * Función auxiliar de multiply
         * @return {Number}
         */
        #auxMult(v1, v2) {
            let n = (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z) + (v1.w * v2.w);
            return n;
        }

        /**
         * @param {Number} theta
         * @return {Matrix4}
         * Devuelve la matriz de rotación 3D sobre X con el ángulo en radianes
         */
        static rotateX(theta) {
            return new Matrix4(
                1, 0, 0, 0,
                0, Math.cos(theta), -Math.sin(theta), 0,
                0, Math.sin(theta), Math.cos(theta), 0,
                0, 0, 0, 1
            );
        }

        /**
         * @param {Number} theta
         * @return {Matrix4}
         * Devuelve la matriz de rotación 3D sobre Y con el ángulo en radianes
         */
        static rotateY(theta) {
            return new Matrix4(
                Math.cos(theta), 0, Math.sin(theta), 0,
                0, 1, 0, 0,
                -Math.sin(theta), 0, Math.cos(theta), 0,
                0, 0, 0, 1
            );
        }

        /**
         * @param {Number} theta
         * @return {Matrix4}
         * Devuelve la matriz de rotación 3D sobre Z con el ángulo en radianes
         */
        static rotateZ(theta) {
            return new Matrix4(
                Math.cos(theta), -Math.sin(theta), 0, 0,
                Math.sin(theta), Math.cos(theta), 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
        }

        /**
         * @param {Vector3} v
         * @return {Matrix4}
         * Devuelve la matriz de escalamiento 3D con los componentes determinados por el vector v
         */
        static scale(v) {
            return new Matrix4(
                v.x, 0, 0, 0,
                0, v.y, 0, 0,
                0, 0, v.z, 0,
                0, 0, 0, 1
            );
        }

        /**
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a03
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a13
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         * @param {Number} a23
         * @param {Number} a30
         * @param {Number} a31
         * @param {Number} a32
         * @param {Number} a33
         * Asinga los nuevos valores a los componentes de la matriz.
         */
        set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
            this.a00 = a00;
            this.a01 = a01;
            this.a02 = a02;
            this.a03 = a03;
            this.a10 = a10;
            this.a11 = a11;
            this.a12 = a12;
            this.a13 = a13;
            this.a20 = a20;
            this.a21 = a21;
            this.a22 = a22;
            this.a23 = a23;
            this.a30 = a30;
            this.a31 = a31;
            this.a32 = a32;
            this.a33 = a33;
        }

        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Matrix4}
         * Devuelve la matriz resultante de restarle a la matriz m1 los componenetes de m2
         */
        static substract(m1,m2) {
            let k = -1;
            let nuevaM2 = Matrix4.multiplyScalar(m2, k);
            let resta = Matrix4.add(m1, nuevaM2);
            return resta;
        }

        /**
         * @param {Vector3} v
         * @return {Matrix4}
         * Devuelve una amtriz de traslación 3D cuyos componentes están dados por el vector
         */
        static translate(v) {
            return new Matrix4(
                1, 0, 0, v.x,
                0, 1, 0, v.y,
                0, 0, 1, v.z,
                0, 0, 0, 1
            );
        }

        /**
         * @return {Matrix4}
         * Devuelve la transpuesta de la matriz
         */
        transpose() {
            let transpuesta = new Matrix4(
                this.a00,
                this.a10,
                this.a20,
                this.a30,
                this.a01,
                this.a11,
                this.a21,
                this.a31,
                this.a02,
                this.a12,
                this.a22,
                this.a32,
                this.a03,
                this.a13,
                this.a23,
                this.a33
            );
            return transpuesta;
        }
    }

    CG.Matrix4 = Matrix4;
    return CG;
}) (CG || {});