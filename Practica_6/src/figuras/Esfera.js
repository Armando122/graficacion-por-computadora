var CG = (function(CG) {
    let g_radius, g_Nu, g_Nv;

    class Esfera extends CG.GenericGeometry {
        /**
         * Constructor de esfera
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} radius
         * @param {Number} Nu
         * @param {Number} Nv
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, radius, Nu, Nv, initial_transform) {
            g_radius = radius || 1;
            g_Nu = Nu || 2;
            g_Nv = Nv || 2;

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve los vértices de la esfera
         */
        getVerticesW() {
            let vertices = [];
            let phi;
            let theta;

            vertices.push(0, g_radius, 0);
            for (let i = 1; i < g_Nu; i++) {
                phi = (i*Math.PI)/g_Nu;

                for (let j = 0; j < g_Nv; j++) {
                    theta = (j*2*Math.PI)/g_Nv;

                    let vX = g_radius * Math.sin(phi) * Math.cos(theta);
                    let vY = g_radius * Math.cos(phi);
                    let vZ = g_radius * Math.sin(phi) * Math.sin(theta);

                    vertices.push(vX, vY, vZ);
                }
            }
            vertices.push(0, -g_radius, 0);

            return vertices;
        }

        /**
         * Función que devuelve los vértices de la esfera explicitamente
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
         * Función que devuelve las caras de la esfera
         */
        getFaces() {
            let faces = [];
            for (let i = 0; i < g_Nv; i++) {
                faces.push(
                    0,
                    ((i+1)%g_Nv)+1,
                    (i%g_Nv)+1
                  );
            }
            for (let i = 1; i < g_Nu-1; i++) {
                for (let j = 0; j < g_Nv; j++) {
                  faces.push(
                    j+1 +(i-1)*g_Nv, //1
                    (j+1)%g_Nv +1 +(i-1)*g_Nv, //1
                    (j+1)%g_Nv +1 +i*g_Nv, //1
                    j+1 +i*g_Nv, //2
                    j+1 +(i-1)*g_Nv, //2
                    (j+1)%g_Nv +1 +i*g_Nv,
                  );
                }
            }
            let vertices = this.getVerticesW();
            let leng = vertices.length/3;
            for (let i = 0; i < g_Nv; i++) {
                faces.push(
                    leng - 1,
                    leng - 1 - g_Nv + i,
                    leng - 1 - g_Nv + ((i+1)%g_Nv)
                );
            }
            return faces;
        }

        /**
         * Función que devuelve el mapeo uv de la textura
         */
        getUV() {
            let mapeo = [];

            // Triángulos superiores
            for (let i = 0; i < g_Nv; i++) {
                mapeo.push(
                    ((i+1)*2)/(2*g_Nv), (g_Nu-1)/g_Nu,
                    (i*2)/(2*g_Nv), (g_Nu-1)/g_Nu,
                    ((i*2)+1)/(2*g_Nv), 1
                );
            }//96

            // Rectangulos
            for (let i = 1; i < g_Nu-1; i++) {
                for (let j = 0; j < g_Nv; j++) {
                    mapeo.push(
                        (j+1)/g_Nv, (g_Nu-i)/g_Nu,
                        j/g_Nv, (g_Nu-i)/g_Nu,
                        j/g_Nv, (g_Nu-(i+1))/g_Nu,
                        
                        (j+1)/g_Nv, (g_Nu-(i+1))/g_Nu,
                        (j+1)/g_Nv, (g_Nu - i)/g_Nu,
                        j/g_Nv, (g_Nu-(i+1))/g_Nu,
                    );
                }
            }

            // Tirángulos inferiores
            for (let i = 0; i < g_Nv; i++) {
                mapeo.push(
                    ((i+1)*2)/(2*g_Nv), 1/g_Nu,
                    ((i*2)+1)/(2*g_Nv), 0,
                    (i*2)/(2*g_Nv), 1/g_Nu,

                );
            }

            return mapeo;
        }
    }

    CG.Esfera = Esfera;
    return CG;
}) (CG || {});