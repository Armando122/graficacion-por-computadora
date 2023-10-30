var CG = (function(CG) {
    let g_width, g_width_m;
    var goldenCons = 1.6180339887;

    class Icosaedro extends CG.GenericGeometry {
        /**
         * Constructor de icosaedro
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, width, initial_transform) {
            g_width = (width || 1)/3;
            g_width_m = g_width*goldenCons;

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve los vértices del icosaedro
         */
        getVerticesW() {
            return [
                0,          g_width,    g_width_m, /*0 */
                0,          g_width,   -g_width_m, /*1 */
                0,         -g_width,    g_width_m, /*2 */
                0,         -g_width,   -g_width_m, /*3 */
                g_width,    g_width_m,  0,         /*4 */
                g_width,   -g_width_m,  0,         /*5 */
               -g_width,    g_width_m,  0,         /*6 */
               -g_width,   -g_width_m,  0,         /*7 */
                g_width_m,  0,          g_width,   /*8 */
                g_width_m,  0,         -g_width,   /*9 */
               -g_width_m,  0,          g_width,   /*10*/
               -g_width_m,  0,         -g_width    /*11*/
            ];
        }

        /**
         * Función que devuelve los vértices del icosaedro para usar en modo drawArrays
         */
        getVertices() {
            return [ 
                -g_width_m,0,g_width, /*10*/ 0,-g_width,g_width_m, /*2 */ 0,g_width,g_width_m,  /*0 */    // 10, 0, 2, Listo
                0,g_width,g_width_m,  /*0 */ 0,-g_width,g_width_m, /*2 */ g_width_m,  0,g_width,/*8 */    //  0, 8, 2, Listo
                g_width_m,  0,g_width,/*8 */ 0,-g_width,g_width_m, /*2 */ g_width,-g_width_m,0, /*5 */    //  8, 5, 2, Listo
                g_width,-g_width_m,0, /*5 */ 0,-g_width,g_width_m, /*2 */ -g_width,-g_width_m,0,/*7 */    //  5, 7, 2, Listo
                -g_width,-g_width_m,0,/*7 */ 0,-g_width,g_width_m, /*2 */ -g_width_m,0,g_width, /*10*/    // 7, 10, 2, Listo
                -g_width,g_width_m,0, /*6 */ -g_width_m,0,g_width, /*10*/ 0,g_width,g_width_m,  /*0 */    // 6, 0, 10, Listo
                -g_width_m,0,-g_width,/*11*/ -g_width_m,0,g_width, /*10*/ -g_width,g_width_m,0, /*6 */    // 11, 6, 10, Listo
                -g_width,-g_width_m,0,/*7 */ -g_width_m,0,g_width, /*10*/ -g_width_m,0,-g_width,/*11*/    // 7, 11, 10, Listo
                -g_width,-g_width_m,0,/*7 */ -g_width_m,0,-g_width,/*11*/ 0,-g_width,-g_width_m,/*3 */    // 7, 3, 11, Listo
                g_width,-g_width_m,0, /*5 */ -g_width,-g_width_m,0,/*7 */ 0,-g_width,-g_width_m,/*3 */    //  5, 3, 7, Listo
                g_width_m,0,-g_width, /*9 */ g_width,-g_width_m,0, /*5 */ 0,-g_width,-g_width_m,/*3 */    //  9, 3, 5, Listo
                g_width_m,  0,g_width,/*8 */ g_width,-g_width_m,0, /*5 */ g_width_m,0,-g_width, /*9 */    //  8, 9, 5, Listo
                g_width,g_width_m,0,  /*4 */ g_width_m,  0,g_width,/*8 */ g_width_m,0,-g_width, /*9 */    //  4, 9, 8, Listo
                0,g_width,g_width_m,  /*0 */ g_width_m,  0,g_width,/*8 */ g_width,g_width_m,0,  /*4 */    //  0, 4, 8, Listo
                -g_width,g_width_m,0, /*6 */ 0,g_width,g_width_m,  /*0 */ g_width,g_width_m,0,  /*4 */    //  6, 4, 0, Listo
                -g_width_m,0,-g_width,/*11*/ 0,g_width,-g_width_m, /*1 */ 0,-g_width,-g_width_m,/*3 */    // 11, 3, 1, Listo
                -g_width,g_width_m,0, /*6 */ 0,g_width,-g_width_m, /*1 */ -g_width_m,0,-g_width,/*11*/    // 6, 11, 1, Listo
                g_width,g_width_m,0,  /*4 */ 0,g_width,-g_width_m, /*1 */  -g_width,g_width_m,0, /*6 */   //  4, 6, 1, listo
                g_width_m,0,-g_width, /*9 */ 0,g_width,-g_width_m, /*1 */ g_width,g_width_m,0,  /*4 */    //  9, 4, 1, Listo
                0,-g_width,-g_width_m,/*3 */ 0,g_width,-g_width_m, /*1 */ g_width_m,0,-g_width, /*9 */     //  3, 9, 1 Listo
            ];
        }
        

        /**
         * Función que devuelve las caras del icosaedro
         */
        getFaces() {
            return [
                10, 0, 2, 
                0, 8, 2, 
                8, 5, 2, 
                5, 7, 2, 
                7, 10, 2, 
                6, 0, 10, 
                11, 6, 10, 
                7, 11, 10, 
                7, 3, 11, 
                5, 3, 7, 
                9, 3, 5, 
                8, 9, 5, 
                4, 9, 8, 
                0, 4, 8, 
                6, 4, 0, 
                11, 3, 1, 
                6, 11, 1, 
                4, 6, 1, 
                9, 4, 1, 
                3, 9, 1
            ];
        }
    }

    CG.Icosaedro = Icosaedro;
    return CG;
}) (CG || {});