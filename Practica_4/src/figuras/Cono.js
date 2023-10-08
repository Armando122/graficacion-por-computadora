var CG = (function(CG) {
    let g_radius, g_height, g_Nu, g_Nv;

    class Cono {
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

            this.initial_transform = initial_transform;

            this.positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

            let vertices = this.getVertices();
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            this.color = color;

            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            let faces = this.getFaces();
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);

            this.num_elements = faces.length;
        }

        /**
         * Función que dibuja el cono usando el color asignado
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         */
        draw(gl, positionAttributeLocation, colorUniformLocation, PVM_matrixLocation, projectionViewMatrix) {
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
  
            gl.uniform4fv(colorUniformLocation, this.color);
        
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);
  
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
  
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, this.num_elements, gl.UNSIGNED_SHORT, 0);
        }

        /**
         * Función que dibuja el cono usando el modo wireframe
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         */
        /*drawWireframe(gl, positionAttributeLocation, colorUniformLocation, PVM_matrixLocation, projectionViewMatrix) {
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
  
            gl.uniform4fv(colorUniformLocation, [0,0,0,1]);
        
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);
  
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
  
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.LINE_STRIP, this.num_elements, gl.UNSIGNED_SHORT, 0);
        }*/

        /**
         * Función que devuelve los vértices del cono
         */
        getVertices() {
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
         * Función que devuelve las caras del cono
         */
        getFaces() {
            let faces = [];
            let vertices = this.getVertices();
            let leng = vertices.length/3;

            for (let i = 0; i < g_Nu; i++) {
                faces.push(
                    leng - 1, 
                    leng - 1 - g_Nu + i,
                    leng - 1 - g_Nu + (i+1)%g_Nu);
            }
            for (let i = 0; i < g_Nv-1; i++) {
                for (let j = 0; j < g_Nu; j++) {
                  faces.push(
                    j + i*g_Nu, //1
                    (j+1)%g_Nu +i*g_Nu, //1
                    (j+1)%g_Nu +(i+1)*g_Nu, //1
                    j +(i+1)*g_Nu,
                    j +i*g_Nu,
                    (j+1)%g_Nu +(i+1)*g_Nu
                  );
                }
              }

            return faces;
        }
    }

    CG.Cono = Cono;
    return CG;
}) (CG || {});