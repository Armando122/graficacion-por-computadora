var CG = (function(CG) {
    let g_radius, g_height, g_Nu, g_Nv;

    class Cono extends CG.GenericGeometry {
        /**
         * Constructor de cono
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
            g_height = (height || 1)
            g_Nu = Nu || 2;
            g_Nv = Nv || 2;

            super(gl, color, initial_transform);
        }

        /**
         * Función que devuelve los vértices del cono
         */
        getVerticesW() {
            let vertices = [];

            for (let i = 0; i < g_Nv; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  vertices.push(
                    g_radius * (g_Nv-i)/g_Nv * Math.cos(j*2*Math.PI/g_Nu),
                    -g_height + i*2*g_height/g_Nv,
                    g_radius * (g_Nv-i)/g_Nv * Math.sin(j*2*Math.PI/g_Nu),
                  );
                }
            }
            vertices.push(0, g_height, 0);

            return vertices;
        }

        /**
         * Función que devuelve los vértices del cono
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
         * Función que devuelve las caras del cono
         */
        getFaces() {
            let faces = [];
            let vertices = this.getVerticesW();
            let leng = vertices.length/3;

            for (let i = 0; i < g_Nu; i++) {
                faces.push(
                    leng - 1, 
                    leng - 1 - g_Nu + (i+1)%g_Nu,
                    leng - 1 - g_Nu + i,
                    );
            }
            for (let i = 0; i < g_Nv-1; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  faces.push(
                    j + i*g_Nu, //1
                    (j+1)%g_Nu +(i+1)*g_Nu, //1
                    (j+1)%g_Nu +i*g_Nu, //1
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
          let sum = 1/(2*g_Nu*g_Nv);

          // Rectangulos
          for (let i = g_Nv-1; i > 0; i--) {
              for (let j = 0; j < g_Nu+1; j++) {
                  mapeo.push(
                    ((j*2)+1)/(2*g_Nu)-((i+1)*sum), 1-((i+1)/g_Nv),
                    ((j*2)+1)/(2*g_Nu)+(i*sum), 1-(i/g_Nv),
                    ((j*2)+1)/(2*g_Nu)+((i+1)*sum), 1-((i+1)/g_Nv),

                    
                    ((j*2)+1)/(2*g_Nu)-(i*sum), 1-(i/g_Nv),
                    ((j*2)+1)/(2*g_Nu)+(i*sum), 1-(i/g_Nv),
                    ((j*2)+1)/(2*g_Nu)-((i+1)*sum), 1-((i+1)/g_Nv),
                  );
              }
          }

          // Triángulos superiores
          for (let i = 0; i < g_Nu; i++) {
            mapeo.push(
              ((i*2)+1)/2*g_Nu + sum, 1-(1/g_Nv),
              ((i*2)+1)/g_Nu - sum, 1-(1/g_Nv),
              ((i*2)+1)/2*g_Nu, 1,
            );
        }

          return mapeo;
      }
    }

    CG.Cono = Cono;
    return CG;
}) (CG || {});