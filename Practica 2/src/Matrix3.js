var CG = (function(CG) {
    class Matrix3 {
        /**
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         * Recibe 9 parametros correspondientes a cada casilla de la matriz de 3x3
         * en caso de no recibir valores devuelve la matriz identidad
         */
        constructor(a00,a01, a02, a10, a11, a12, a20, a21, a22) {
            let vacio = [a00,a01, a02, a10, a11, a12, a20, a21, a22].every(value=> {
                return value == null;
            });

            // Matriz identidad
            if (vacio) {
                this.a00 = 1;
                this.a01 = 0;
                this.a02 = 0;
                this.a10 = 0;
                this.a11 = 1;
                this.a12 = 0;
                this.a20 = 0;
                this.a21 = 0;
                this.a22 = 1;
            } else {
                this.a00 = a00;
                this.a01 = a01;
                this.a02 = a02;
                this.a10 = a10;
                this.a11 = a11;
                this.a12 = a12;
                this.a20 = a20;
                this.a21 = a21;
                this.a22 = a22;
            }
        }

        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         * Devuelve la suma de dos matrices
         */
        static add(m1, m2) {
            let newM = new Matrix3(
                m1.a00 + m2.a00,
                m1.a01 + m2.a01,
                m1.a02 + m2.a02,
                m1.a10 + m2.a10,
                m1.a11 + m2.a11,
                m1.a12 + m2.a12,
                m1.a20 + m2.a20,
                m1.a21 + m2.a21,
                m1.a22 + m2.a22);
            return newM;
        }

        /**
         * @return {Matrix3}
         * Devuelve la matriz adjunta de la matriz que invoca la función
         */
        adjoint() {
            let adjM = new Matrix3(
                (this.a11 * this.a22) - (this.a12*this.a21), 
                -1*((this.a10 * this.a22) - (this.a12*this.a20)),
                (this.a10 * this.a21) - (this.a11*this.a20),
                -1*((this.a01 * this.a22) - (this.a02*this.a21)),
                (this.a00 * this.a22) - (this.a02*this.a20),
                -1*((this.a00 * this.a21) - (this.a01*this.a20)),
                (this.a01 * this.a12) - (this.a02*this.a11),
                -1*((this.a00 * this.a12) - (this.a02*this.a10)),
                (this.a00 * this.a11) - (this.a01*this.a10));
            return adjM;
        }
        
        /**
         * @return {Matrix3}
         * Devuelve una copia de la matriz que invocó la función
         */
        clone() {
            let newCopy = new Matrix3(
                this.a00,
                this.a01,
                this.a02,
                this.a10,
                this.a11,
                this.a12,
                this.a20,
                this.a21,
                this.a22);
            return newCopy;
        }

        /**
         * @return {Number}
         * Devuelve el determinante de la matriz
         */
        determinant() {
            let sumas = (this.a00*this.a11*this.a22) + (this.a01*this.a12*this.a20) + (this.a02*this.a10*this.a21);
            let resta = -1*(this.a02*this.a11*this.a20) - (this.a00*this.a12*this.a21) - (this.a01*this.a10*this.a22);
            return sumas + resta;
        }

        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Boolean}
         * Devuelve true en caso de que sus argumentos sean aproximadamente iguales 0.000001
         * falso en caso contrario.
         */
        static equals(m1, m2) {
            let arrAux = [Math.abs(m1.a00-m2.a00), Math.abs(m1.a01-m2.a01), Math.abs(m1.a02-m2.a02), 
                          Math.abs(m1.a10-m2.a10), Math.abs(m1.a11-m2.a11), Math.abs(m1.a12-m2.a12), 
                          Math.abs(m1.a20-m2.a20), Math.abs(m1.a21-m2.a21), Math.abs(m1.a22-m2.a22)].every(value=> {
                return (value >= 0) && (value < 0.000002);
            });

            if (arrAux) {
                return true;
            }
            return false;
        }

        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Boolean}
         * Devuelve true si sus argumentos son exactamente iguales
         * falso en otro caso
         */
        static exactEquals(m1, m2) {
            if (m1.a00 == m2.a00 &&
                m1.a01 == m2.a01 &&
                m1.a02 == m2.a02 &&
                m1.a10 == m2.a10 && 
                m1.a11 == m2.a11 && 
                m1.a12 == m2.a12 && 
                m1.a20 == m2.a20 && 
                m1.a21 == m2.a21 && 
                m1.a22 == m2.a22) {
                    return true;
            }
            return false;
        }

        /**
         * Asigna los valores de la matriz identidad a la matriz que llama
         * la función
         */
        identity() {
            this.a00 = 1;
            this.a01 = 0;
            this.a02 = 0;
            this.a10 = 0;
            this.a11 = 1;
            this.a12 = 0;
            this.a20 = 0;
            this.a21 = 0;
            this.a22 = 1;
        }

        /**
         * @return {Matrix3}
         * Devuelve la matriz inversa de la matriz
         */
        invert() {
            let det = this.determinant();
            let adj = this.adjoint();
            let adjT = adj.transpose();
            let inv = new Matrix3(
                adjT.a00/det,
                adjT.a01/det,
                adjT.a02/det,
                adjT.a10/det,
                adjT.a11/det,
                adjT.a12/det,
                adjT.a20/det,
                adjT.a21/det,
                adjT.a22/det
            );
            return inv;
        }

        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         * Devuelve la multiplicación de dos matrices
         */
        static multiply(m1, m2) {
            let v1m1 = new CG.Vector3(m1.a00, m1.a01, m1.a02);
            let v2m1 = new CG.Vector3(m1.a10, m1.a11, m1.a12);
            let v3m1 = new CG.Vector3(m1.a20, m1.a21, m1.a22);

            let v1m2 = new CG.Vector3(m2.a00, m2.a10, m2.a20);
            let v2m2 = new CG.Vector3(m2.a01, m2.a11, m2.a21);
            let v3m2 = new CG.Vector3(m2.a02, m2.a12, m2.a22);

            let mulM = new Matrix3(
                Matrix3.auxMult(v1m1, v1m2),
                Matrix3.auxMult(v1m1, v2m2),
                Matrix3.auxMult(v1m1, v3m2),

                Matrix3.auxMult(v2m1,v1m2),
                Matrix3.auxMult(v2m1,v2m2),
                Matrix3.auxMult(v2m1,v3m2),

                Matrix3.auxMult(v3m1,v1m2),
                Matrix3.auxMult(v3m1,v2m2),
                Matrix3.auxMult(v3m1,v3m2)
            );
            return mulM;
        }

        /*
         * Función auxiliar de multiply
         * @return {Number}
         */
        static auxMult(v1, v2) {
            let n = (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
            return n;
        }

        /**
         * @param {Matrix3} m1
         * @param {Number} c
         * @return {Matrix3}
         * Devuelve la matriz multiplicada por un escalar
         */
        static multiplyScalar(m1, c) {
            let mult = new Matrix3(
                m1.a00*c,
                m1.a01*c,
                m1.a02*c,
                m1.a10*c,
                m1.a11*c,
                m1.a12*c,
                m1.a20*c,
                m1.a21*c,
                m1.a22*c
            );
            return mult;
        }

        /**
         * @param {Vector3} v
         * @return {Vector3}
         * Devuelve el vector resutante de multiplicar el vector por la matriz que llama la función
         */
        multiplyVector(v) {
            let v1m = new CG.Vector3(this.a00,this.a01,this.a02);
            let v2m = new CG.Vector3(this.a10,this.a11,this.a12);
            let v3m = new CG.Vector3(this.a20,this.a21,this.a22);
            let res = new CG.Vector3(
                Matrix3.auxMult(v1m,v),
                Matrix3.auxMult(v2m,v),
                Matrix3.auxMult(v3m,v)
            );
            return res;
        }

        /**
         * @param {Number} theta
         * @return {Matrix3}
         * Devuelve una matriz que representa la matriz de rotación en theta radianes.
         */
        static rotate(theta) {
            let mR = new Matrix3(
                Math.cos(theta), -Math.sin(theta), 0,
                Math.sin(theta), Math.cos(theta), 0,
                0, 0, 1
            );
            return mR; 
        }

        /**
         * @param {Number} sx
         * @param {Number} sy
         * @return {Matrix3}
         * Devuelve la matriz de escalamiento con sx en x y sy en y
         */
        static scale(sx, sy) {
            let mS = new Matrix3(
                sx, 0, 0,
                0, sy, 0, 
                0, 0, 1
            );
            return mS;
        }

        /**
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         * Asigna los nuevos valores a la matriz que llama la función
         */
        set(a00, a01, a02, a10, a11, a12, a20, a21, a22) {
            this.a00 = a00;
            this.a01 = a01;
            this.a02 = a02;
            this.a10 = a10;
            this.a11 = a11;
            this.a12 = a12;
            this.a20 = a20;
            this.a21 = a21;
            this.a22 = a22;
        }

        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         * Sustrae componente a componente la matriz m2 de m1
         */
        static substract(m1,m2) {
            let mEscalar = Matrix3.multiplyScalar(m2, -1);
            let res = Matrix3.add(m1, mEscalar);
            return res;
        }

        /**
         * @param {Number} tx
         * @param {Number} ty
         * @return {Matrix3}
         * Devuelve la matriz de transformación de traslación, tx traslación en x
         * y ty traslación en y
         */
        static translate(tx, ty) {
            let mTrans = new Matrix3(
                1, 0, tx,
                0, 1, ty,
                0, 0, 1
            );
            return mTrans;
        }

        /**
         * @return {Matrix3}
         * Devuelve la transpuesta de la matriz que llamó la función
         */
        transpose() {
            let mT = new Matrix3(
                this.a00,
                this.a10,
                this.a20,
                this.a01,
                this.a11,
                this.a21,
                this.a02,
                this.a12,
                this.a22);
            return mT;
        }
        
    }

    CG.Matrix3 = Matrix3;
    return CG;
}) (CG || {});