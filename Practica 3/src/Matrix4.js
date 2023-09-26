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
            let m = this.#toArray();
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
       #toArray() {
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
            let m = this.#toArray();
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
    }

    CG.Matrix4 = Matrix4;
    return CG;
}) (CG || {});