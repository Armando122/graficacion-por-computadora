var CG = (function(CG) {
    class Vector4 {
        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         * @param {Number} w
         * Constructor para vector4
         */
        constructor(x,y,z,w) {
            if (x == null && y == null && z == null && w == null) {
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 0;
            } else {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Vector4}
         * Devuelve la suma de sus argumentos
         */
        static add(u, v) {
            let res = new Vector4(u.x+v.x,u.y+v.y,u.z+v.z,u.w+v.w);
            return res;
        }

        /**
         * @return {Vector4}
         * Devuelve un objeto con los mismos argumentos del objeto que llamó la función
         */
        clone() {
            let clone = new Vector4(this.x, this.y, this.z, this.w);
            return clone;
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Number}
         * Devuelve la distancia euclidiana entre sus argumentos
         */
        static distance(u, v) {
            let x = Math.pow(u.x-v.x,2);
            let y = Math.pow(u.y-v.y,2);
            let z = Math.pow(u.z-v.z,2);
            let w = Math.pow(u.w-v.w,2);
            let res = Math.sqrt(x + y + z + w);
            return res;
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Number}
         * Devuelve el producto punto de sus argumentos
         */
        static dot(u, v) {
            let nx = u.x*v.x;
            let ny = u.y*v.y;
            let nz = u.z*v.z;
            let nw = u.w*v.w;
            return nx+ny+nz+nw;
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Boolean}
         * Devuelve verdadero si sus argumentos son aproximadamente iguales con 0.000001
         * falso en caso contrario
         */
        static equals(u, v) {
            let restaX = Math.abs(u.x-v.x);
            let restaY = Math.abs(u.y-v.y);
            let restaZ = Math.abs(u.z-v.z);
            let restaW = Math.abs(u.w-v.w);
            if ((restaX >= 0 && restaX < 0.000002) && 
                (restaY >= 0 && restaY < 0.000002) && 
                (restaZ >= 0 && restaZ < 0.000002) &&
                (restaW >= 0 && restaW < 0.000002)) {
                return true;
            }
            return false;
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Boolean}
         * Devuelve verdadero si sus argumentos son exactamente iguales
         * falso en caso contrario
         */
        static exactEquals(u, v){
            if (u.x == v.x && u.y == v.y && u.z == v.z && u.w == v.w) {
                return true;   
            }
            return false;
        }

        /**
         * @return {Vector4}
         * Devuelve el vector normalizado
         */
        normalize() {
            let sumaV = Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) + Math.pow(this.w, 2);
            let moduloV = Math.sqrt(sumaV);
            let nx = this.x / moduloV;
            let ny = this.y / moduloV;
            let nz = this.z / moduloV;
            let nw = this.w / moduloV;
            return new Vector4(nx, ny, nz, nw);
        }

        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         * @param {Number} w
         * Asigna los nuevos valores al vector
         */
        set(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Number}
         * Devuelve la distancia al cuadrado que hay entre los argumentos
         */
        static squaredDistance(u, v) {
            let n = Vector4.distance(u,v);
            return Math.pow(n, 2);
        }

        /**
         * Asigna cero a cada componente del vector
         */
        zero() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
        }
    }

    CG.Vector4 = Vector4;
    return CG;
}) (CG || {});