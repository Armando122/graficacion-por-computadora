var CG = (function(CG) {
    let g_R, g_r, g_Nu, g_Nv;

    class Toro extends CG.GenericGeometry {
        /**
         * Constructor de toro
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} major_radius
         * @param {Number} minor_radius
         * @param {Number} Nu
         * @param {Number} Nv
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, major_radius, minor_radius, Nu, Nv, initial_transform) {
            g_R = (major_radius || 1)/2;
            g_r = (minor_radius || 1)/2;
            g_Nu = Nu || 2;
            g_Nv = Nv || 2;

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve los vértices del toro
         */
        getVerticesW() {
            let vertices = [];

            for (let i = 0; i < g_Nv+1; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  vertices.push(
                    -(g_R + g_r * Math.sin(2*Math.PI*j/g_Nu)) * Math.sin(2*Math.PI*i/g_Nv),
                    g_r * Math.cos(2*Math.PI*j/g_Nu),
                    (g_R + g_r * Math.sin(2*Math.PI*j/g_Nu)) * Math.cos(2*Math.PI*i/g_Nv)
                    );
                }
            }

            return vertices;
        }

        /**
         * Función para obtener los vértices del toro explicitamente
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

            for (let i = 0; i < g_Nv; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  faces.push(
                    j +i*g_Nu,
                    j +(i+1)*g_Nu,
                    (j+1)%g_Nu +(i+1)*g_Nu,
                    (j+1)%g_Nu +i*g_Nu,
                    j +i*g_Nu,
                    (j+1)%g_Nu +(i+1)*g_Nu
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
            for (let i = 0; i < g_Nu; i++) {
                for (let j = 0; j < g_Nv; j++) {
                    mapeo.push(
                        (j+1)/g_Nv, 1-(i/g_Nu),
                        (j+1)/g_Nv, 1-(i+1)/g_Nu,
                        j/g_Nv, 1-(i+1)/g_Nu,
                        //j/g_Nv, 1-(i+1)/g_Nu,

                        j/g_Nv, 1-(i/g_Nu),
                        (j+1)/g_Nv, 1-(i/g_Nu),
                        j/g_Nv, 1-(i+1)/g_Nu,
                    );
                }
            }
  
            return mapeo;
        }
    }

    CG.Toro = Toro;
    return CG;
}) (CG || {});