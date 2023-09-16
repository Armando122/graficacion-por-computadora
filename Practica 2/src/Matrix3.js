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
        
    }

    CG.Matrix3 = Matrix3;
    return CG;
}) (CG || {});