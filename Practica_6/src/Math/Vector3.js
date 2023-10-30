var CG = (function(CG) {
    class Vector3 {
        /**
         * @param x
         * @param y
         * @param z
         * En caso de no recibir valores devuelve (0,0,0)
         */
        constructor(x=0,y=0,z=0) {
            /*if (x == NaN && y == NaN && z == NaN) {
                this.x = 0;
                this.y = 0;
                this.z = 0;*/
            //} else {
                this.x = x;
                this.y = y;
                this.z = z;
            //}
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Vector3}
         * Devuelve la suma de los vectores
         */
        static add(u, v) {
            let nx = u.x + v.x;
            let ny = u.y + v.y;
            let nz = u.z + v.z;
            let vect = new Vector3(nx,ny,nz);
            return vect;
        }

        static substract(u, v) {
            return new Vector3(
              u.x - v.x,
              u.y - v.y,
              u.z - v.z
            );
          }

        /**
         * @return {Vector3}
         * Devuelve la copia del vector que invocó la función
         */
        clone() {
            let copyX = this.x;
            let copyY = this.y;
            let copyZ = this.z;
            let copyVector = new Vector3(copyX,copyY,copyZ);
            return copyVector;
        }

         /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Vector3}
         * Devuelve el producto cruz del vector u y v
         */
        static cross(u, v) {
            let componenteX = (u.y*v.z) - (u.z*v.y);
            let componenteY = (u.z*v.x) - (u.x*v.z);
            let componenteZ = (u.x*v.y) - (u.y*v.x);
            let vector = new Vector3(componenteX,componenteY,componenteZ);
            return vector;
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Number}
         * Devuelve la distancia eucidiana entre dos vectores
         */
        static distance(u, v) {
            let numX = Math.pow((u.x-v.x),2);
            let numY = Math.pow((u.y-v.y),2);
            let numZ = Math.pow((u.z-v.z),2);
            let res = Math.sqrt(numX + numY + numZ);
            return res;
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Number}
         * Devuelve el producto punto de los vectores u y v
         */
        static dot(u,v) {
            let nx = u.x*v.x;
            let ny = u.y*v.y;
            let nz = u.z*v.z;
            return nx+ny+nz;
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Boolean}
         * Devuelve verdadero si sus valores son aproximadamente iguales con e = 0.000001, falso
         * en caso contrario
         */
        static equals(u,v) {
            let restaX = Math.abs(u.x-v.x);
            let restaY = Math.abs(u.y-v.y);
            let restaZ = Math.abs(u.z-v.z);
            if ((restaX >= 0 && restaX < 0.000002) && 
                (restaY >= 0 && restaY < 0.000002) && 
                (restaZ >= 0 && restaZ < 0.000002)) {
                return true;
            }
            return false;
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Boolean}
         * Devuelve verdadero  si sur argumentos son exactamente iguales, falso en
         * caso contrario.
         */
        static exactEquals(u, v) {
            if (u.x == v.x && u.y == v.y && u.z == v.z) {
                return true;   
            }
            return false;
        }

        /**
         * @return {Vector3}
         * Devuelve el vector normalizado
         */
        normalize() {
            let sumaV = Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
            let moduloV = Math.sqrt(sumaV);
            let nx = this.x / moduloV;
            let ny = this.y / moduloV;
            let nz = this.z / moduloV;
            return new Vector3(nx, ny, nz);
        }

        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         * Asigna los nuevos componentes al vector
         */
        set(nx=0, ny=0, nz=0) {
            this.x = nx;
            this.y = ny;
            this.z = nz;
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Number}
         * Devuelve la distancia euclidiana al cuadrado
         */
        static squareDistance(u, v) {
            return Math.pow(this.distance(u, v), 2);
        }

        /**
         * Asigna cero a cada componente del vector
         */
        zero() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
    }

    CG.Vector3 = Vector3;
    return CG;
}) (CG || {});