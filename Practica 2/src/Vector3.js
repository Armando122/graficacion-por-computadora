var CG = (function(CG) {
    class Vector3 {
        /**
         * @param x
         * @param y
         * @param z
         * En caso de no recibir valores devuelve (0,0,0)
         */
        constructor(x,y,z) {
            if (x == null && y == null && z == null) {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            } else {
                this.x = x;
                this.y = y;
                this.z = z;
            }
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
    }

    CG.Vector3 = Vector3;
    return CG;
}) (CG || {});