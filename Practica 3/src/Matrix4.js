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
    }

    CG.Matrix4 = Matrix4;
    return CG;
}) (CG || {});