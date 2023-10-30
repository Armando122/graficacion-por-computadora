var CG = (function(CG) {
    let g_width, g_width_d, g_width_m;
    var goldenCons = 1.6180339887;

    class Dodecaedro extends CG.GenericGeometry {
        /**
         * Constructor de dodecaedro
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, width, initial_transform) {
            g_width = (width || 1)/Math.PI;
            g_width_d = g_width/goldenCons;
            g_width_m = g_width*goldenCons;

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve los vértices del dodecaedro, para usar en modo wireframe
         */
        getVerticesW() {
            return [
                 g_width,    g_width,    g_width,   /*0 */                
                 g_width,    g_width,   -g_width,   /*1 */                
                 g_width,   -g_width,    g_width,   /*2 */                
                 g_width,   -g_width,   -g_width,   /*3 */                
                -g_width,    g_width,    g_width,   /*4 */                
                -g_width,    g_width,   -g_width,   /*5 */                
                -g_width,   -g_width,    g_width,   /*6 */               
                -g_width,   -g_width,   -g_width,   /*7 */               
                 0,          g_width_d,  g_width_m, /*8 */ 
                 0,          g_width_d, -g_width_m, /*9 */
                 0,         -g_width_d,  g_width_m, /*10*/ 
                 0,         -g_width_d, -g_width_m, /*11*/ 
                 g_width_d,  g_width_m,  0,         /*12*/ 
                 g_width_d, -g_width_m,  0,         /*13*/ 
                -g_width_d,  g_width_m,  0,         /*14*/ 
                -g_width_d, -g_width_m,  0,         /*15*/ 
                 g_width_m,  0,          g_width_d, /*16*/ 
                 g_width_m,  0,         -g_width_d, /*17*/ 
                -g_width_m,  0,          g_width_d, /*18*/ 
                -g_width_m,  0,         -g_width_d  /*19*/ 
            ];
        }

        /**
         * Función que devuelve los vértices del dodecaedro, drawArrays
         */
        getVertices() {
            return [
                g_width,g_width,g_width,  /*0 */  g_width,-g_width,g_width,  /*2 */  g_width_m,0,g_width_d,     /*16*/
                g_width,g_width,g_width,  /*0 */  0,-g_width_d,g_width_m,    /*10*/  g_width,-g_width,g_width,  /*2 */
                g_width,g_width,g_width,  /*0 */  0,g_width_d,g_width_m,     /*8 */  0,-g_width_d,g_width_m,    /*10*/    // Cara-p
                g_width_d,g_width_m,0,    /*12*/  g_width_m,0,-g_width_d,    /*17*/  g_width,g_width,-g_width,  /*1 */
                g_width_d,g_width_m,0,    /*12*/  g_width_m,0,g_width_d,     /*16*/  g_width_m,0,-g_width_d,    /*17*/
                g_width_d,g_width_m,0,    /*12*/  g_width,g_width,g_width,   /*0 */  g_width_m,0,g_width_d,     /*16*/    // Cara
                0,g_width_d,g_width_m,    /*8 */  -g_width_d,g_width_m,0,    /*14*/  -g_width,g_width,g_width,  /*4 */
                0,g_width_d,g_width_m,    /*8 */  g_width_d,g_width_m,0,     /*12*/  -g_width_d,g_width_m,0,    /*14*/
                0,g_width_d,g_width_m,    /*8 */  g_width,g_width,g_width,   /*0 */  g_width_d,g_width_m,0,     /*12*/    // Cara 
                g_width,-g_width,g_width, /*2 */  g_width_m,0,-g_width_d,    /*17*/  g_width_m,0,g_width_d,     /*16*/  
                g_width,-g_width,g_width, /*2 */  g_width,-g_width,-g_width, /*3 */  g_width_m,0,-g_width_d,    /*17*/
                g_width,-g_width,g_width, /*2 */  g_width_d,-g_width_m,0,    /*13*/  g_width,-g_width,-g_width, /*3 */    // Cara 
                g_width_d,-g_width_m,0,   /*13*/  -g_width,-g_width,g_width, /*6 */  -g_width_d,-g_width_m,0,   /*15*/
                g_width_d,-g_width_m,0,   /*13*/  0,-g_width_d,g_width_m,    /*10*/ -g_width,-g_width,g_width,  /*6 */
                g_width_d,-g_width_m,0,   /*13*/  g_width,-g_width,g_width,  /*2 */ 0,-g_width_d,g_width_m,     /*10*/    // Cara 
                -g_width,-g_width,g_width,/*6 */  -g_width,g_width,g_width,  /*4 */  -g_width_m,0,g_width_d,    /*18*/
                -g_width,-g_width,g_width,/*6 */  0,g_width_d,g_width_m,     /*8 */  -g_width,g_width,g_width,  /*4 */
                -g_width,-g_width,g_width,/*6 */  0,-g_width_d,g_width_m,    /*10*/  0,g_width_d,g_width_m,     /*8 */    // Cara-p 
                g_width,-g_width,-g_width,/*3 */  g_width,g_width,-g_width,  /*1 */  g_width_m,0,-g_width_d,    /*17*/
                g_width,-g_width,-g_width,/*3 */  0,g_width_d,-g_width_m,    /*9 */  g_width,g_width,-g_width,  /*1 */
                g_width,-g_width,-g_width,/*3 */  0,-g_width_d,-g_width_m,   /*11*/  0,g_width_d,-g_width_m,    /*9 */    // Cara 
                g_width_d,-g_width_m,0,   /*13*/  0,-g_width_d,-g_width_m,   /*11*/  g_width,-g_width,-g_width, /*3 */
                g_width_d,-g_width_m,0,   /*13*/  -g_width,-g_width,-g_width,/*7 */  0,-g_width_d,-g_width_m,   /*11*/
                g_width_d,-g_width_m,0,   /*13*/  -g_width_d,-g_width_m,0,   /*15*/  -g_width,-g_width,-g_width,/*7 */    // Cara
                g_width,g_width,-g_width, /*1 */  -g_width_d,g_width_m,0,    /*14*/  g_width_d,g_width_m,0,     /*12*/
                g_width,g_width,-g_width, /*1 */  -g_width,g_width,-g_width, /*5 */  -g_width_d,g_width_m,0,    /*14*/
                g_width,g_width,-g_width, /*1 */  0,g_width_d,-g_width_m,    /*9 */  -g_width,g_width,-g_width, /*5 */    // Cara 
                0,-g_width_d,-g_width_m,  /*11*/  -g_width,g_width,-g_width, /*5 */  0,g_width_d,-g_width_m,    /*9 */
                0,-g_width_d,-g_width_m,  /*11*/  -g_width_m,0,-g_width_d,   /*19*/  -g_width,g_width,-g_width, /*5 */
                0,-g_width_d,-g_width_m,  /*11*/  -g_width,-g_width,-g_width,/*7 */  -g_width_m,0,-g_width_d,   /*19*/    // Cara
                -g_width,g_width,-g_width,/*5 */  -g_width,g_width,g_width,  /*4 */  -g_width_d,g_width_m,0,    /*14*/
                -g_width,g_width,-g_width,/*5 */  -g_width_m,0,g_width_d,    /*18*/  -g_width,g_width,g_width,  /*4 */
                -g_width,g_width,-g_width,/*5 */  -g_width_m,0,-g_width_d,   /*19*/  -g_width_m,0,g_width_d,    /*18*/    // Cara
                -g_width,-g_width,g_width,/*6 */  -g_width,-g_width,-g_width,/*7 */  -g_width_d,-g_width_m,0,   /*15*/
                -g_width,-g_width,g_width,/*6 */  -g_width_m,0,-g_width_d,   /*19*/  -g_width,-g_width,-g_width,/*7 */
                -g_width,-g_width,g_width,/*6 */  -g_width_m,0,g_width_d,    /*18*/ -g_width_m,0,-g_width_d,   /*19*/    // Cara
            ];
        }

        /**
         * Función que devuelve las caras del dodecaedro
         */
        getFaces() {
            return [
                0,16,2, 0,2,10, 0,10,8,
                12,1,17, 12, 17, 16, 12,0,16,
                8, 4, 14, 8, 14, 12, 8, 0,12,
                2,16,17,  2,17,3,  2,13,3,
                13,15,6,  13,6,10,  13,2,10, 
                6,18,4,  6,4,8,  6,10,8, 
                3,17,1,  3,1,9,  3,11,9, 
                13,3,11,  13,11,7, 13,15,7, 
                1,12,14,  1,14,5, 1,9,5, 
                11,9,5,  11,5,19, 11,7,19, 
                5,14,4,  5,4,18,  5,19,18, 
                6,15,7,  6,7,19,  6,18,19
            ];
        }
    }

    CG.Dodecaedro = Dodecaedro;
    return CG;
}) (CG || {});