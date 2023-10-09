var CG = (function(CG) {
    let g_R, g_r, g_Nu, g_Nv;

    class Toro {
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
         * Función que dibuja el toro usando el color asignado
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
         * Función que dibuja el toro usando el modo wireframe
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         */
        drawWireframe(gl, positionAttributeLocation, colorUniformLocation, PVM_matrixLocation, projectionViewMatrix) {
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
  
            gl.uniform4fv(colorUniformLocation, [0,0,0,1]);
        
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);
  
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
  
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.LINE_STRIP, this.num_elements, gl.UNSIGNED_SHORT, 0);
        }

        /**
         * Función que devuelve los vértices del toro
         */
        getVertices() {
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
    }

    CG.Toro = Toro;
    return CG;
}) (CG || {});