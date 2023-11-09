var CG = (function(CG) {
    let g_radius, g_height, g_Nu, g_Nv;

    class Cilindro extends CG.GenericGeometry {
        /**
         * Constructor de cilindro
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} radius
         * @param {Number} height
         * @param {Number} Nu
         * @param {Number} Nv
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, radius, height, Nu, Nv, initial_transform) {
            g_radius = (radius || 1);
            g_height = (height || 1);
            g_Nu = Nu || 2;
            g_Nv = Nv || 2;

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve los vértices del cilindro
         */
        getVerticesW() {
            let vertices = [];

            for (let i = 0; i < g_Nv+1; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  vertices.push(
                    g_radius * Math.cos(j*2*Math.PI/g_Nu),
                    -g_height + i*2*g_height/g_Nv,
                    g_radius * Math.sin(j*2*Math.PI/g_Nu));
                }
            }
            
            return vertices;
        }

        /**
         * Función para obtener los vértices del cilindro explicitamente
         */
        getVertices() {
            let verticesW = this.getVerticesW();
            let faces = this.getFaces();
            let vertices = [];

            for (let i = 0; i < faces.length; i++) {
                let cara = faces[i];
                // Construimos la cara
                let j = 3 * cara;
                vertices.push(
                    verticesW[j  ],
                    verticesW[j+1],
                    verticesW[j+2]
                    );
            }

            return vertices;
        }

        /**
         * Función que devuelve las caras del cilindro
         */
        getFaces() {
            let faces = [];

            for (let i = 0; i < g_Nv-1; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  faces.push(
                    j +i*g_Nu,  
                    (j+1)%g_Nu +(i+1)*g_Nu,
                    (j+1)%g_Nu +i*g_Nu,
                    j +(i+1)*g_Nu,
                    (j+1)%g_Nu +(i+1)*g_Nu,
                    j +i*g_Nu
                    );
                }
            }
            
            return faces;
        }

        /**
         * Función que devuelve el mapeo uv de la textura
         */
        getUV() {
            let mapeo = [];
  
            // Rectangulos
            for (let i = 0; i < g_Nv; i++) {
                for (let j = 0; j < g_Nu; j++) {
                    mapeo.push(
                        j/g_Nu, 1-((i+1)/g_Nv),
                        (j+1)/g_Nu, 1-(i/g_Nv),
                        (j+1)/g_Nu, 1-(i+1)/g_Nv,

                        j/g_Nu, 1-(i/g_Nv),
                        (j+1)/g_Nu, 1-(i/g_Nv),
                        j/g_Nu, 1-((i+1)/g_Nv),
                    );
                }
            }
  
            return mapeo;
        }
    }

    CG.Cilindro = Cilindro;
    return CG;
}) (CG || {});