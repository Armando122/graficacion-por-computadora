var CG = (function(CG) {
    let g_width, g_x, g_y, g_z, g_x0, g_y0;

    class Tetraedro extends CG.GenericGeometry {
        /**
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Matrix4} initial_transform
         * Constructor de tetraedro
         */
        constructor(gl, color, width, initial_transform) {
            g_width = (width || 1);

            let anguloT = 2 * Math.PI/3;
            g_x = width*2*Math.sqrt(2)/3;
            g_y = 0;
            g_z = -width/3;
            g_x0 = g_x * Math.cos(anguloT) + g_y * Math.sin(anguloT);
            g_y0 = -g_x * Math.sin(anguloT) + g_y * Math.cos(anguloT);

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve un arreglo con los vértices del tetraedro.
         */
        getVerticesW() {
            return [
                0,     0,    g_width, /*0*/
                g_x0,  g_y0, g_z,     /*1*/
                g_x0, -g_y0, g_z,     /*2*/
                g_x,   g_y,  g_z      /*3*/
            ];
        }

        /**
         * Función que devuelve el arreglo de vértices para ser usado por drawArrays
         */
        getVertices() {
            return [
                0, 0, g_width, /*0*/ g_x0, g_y0, g_z, /*1*/ g_x, g_y, g_z /*3*/,
                0, 0, g_width, /*0*/ g_x0, -g_y0, g_z, /*2*/ g_x0, g_y0, g_z, /*1*/
                0, 0, g_width, /*0*/ g_x, g_y, g_z, /*3*/ g_x0, -g_y0, g_z, /*2*/
                g_x0, g_y0, g_z, /*1*/ g_x0, -g_y0, g_z, /*2*/ g_x, g_y, g_z /*3*/
            ];
        }

        /**
         * Función que devuelve las caras de la figura
         */
        getFaces() {
            return [
                0, 1, 3,

                0, 2, 1,

                0, 3, 2,

                1, 2, 3
            ];
        }

        /**
         * Función que devuelve el mapeo uv de la textura
         */
        getUV() {
            let uSum = 3*g_width;
            return [
                // Cara 1
                (2*g_width)/uSum, 0.5,
                g_width/uSum, 0.5,
                (g_width+(g_width/2))/uSum, 1,
    
                // Cara 2
                1, 0.5,
                (2*g_width)/uSum, 0.5,
                (2*g_width)+(g_width/2)/uSum, 1,

                // Cara 3
                g_width/uSum, 0.5,
                0, 0.5,
                (g_width/2)/uSum, 1,

                // Cara 4
                g_width/uSum, 0.5,
                (g_width+(g_width/2))/uSum, 0,
                (2*g_width)/uSum, 0.5,
            ];
        }
    }

    CG.Tetraedro = Tetraedro;
    return CG;
})(CG || {});