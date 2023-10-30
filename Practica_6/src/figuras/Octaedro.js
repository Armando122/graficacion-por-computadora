var CG = (function(CG) {
    let g_width;

    class Octaedro extends CG.GenericGeometry {

        /**
         * Constructor de octaedro
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, width, initial_transform) {
            g_width = (width || 1);

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve el arreglo de vértices del octaedro para el modo wireframe
         */
        getVerticesW() {
            return [
                0,        0,        g_width, /*0*/
                g_width,  0,        0,       /*1*/
               -g_width,  0,        0,       /*2*/
                0,        g_width,  0,       /*3*/
                0,       -g_width,  0,       /*4*/
                0,        0,       -g_width  /*5*/
            ];
        }

        /**
         * Función que devuelve los vértices del octaedro para ser usado por drawArrays
         */
        getVertices() {
            return [
                0, g_width, 0,/*3*/ 0, 0, g_width, /*0*/ g_width, 0, 0, /*1*/
                0, g_width, 0,/*3*/ -g_width, 0, 0, /*2*/ 0, 0, g_width, /*0*/
                0, -g_width, 0, /*4*/ g_width, 0, 0, /*1*/ 0, 0, g_width, /*0*/ 
                0, -g_width, 0, /*4*/ 0, 0, g_width, /*0*/ -g_width, 0, 0, /*2*/
                0, 0, -g_width, /*5*/ 0, g_width, 0,/*3*/  g_width, 0, 0, /*1*/
                0, g_width, 0,/*3*/ 0, 0, -g_width, /*5*/ -g_width, 0, 0, /*2*/
                0, -g_width, 0, /*4*/ 0, 0, -g_width, /*5*/ g_width, 0, 0, /*1*/
                0, 0, -g_width, /*5*/ 0, -g_width, 0, /*4*/ -g_width, 0, 0, /*2*/
            ];
        }

        /**
         * Función que devuelve las caras del octaedro
         */
        getFaces() {
            return [
                3, 0, 1, //
                3, 2, 0, //
                4, 1, 0, //
                4, 0, 2, //
                5, 3, 1, //
                3, 5, 2, //
                4, 5, 1, //
                5, 4, 2
            ];
        }
    }

    CG.Octaedro = Octaedro;
    return CG;
}) (CG || {});