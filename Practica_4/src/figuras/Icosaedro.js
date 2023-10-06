var CG = (function(CG) {
    let g_width, g_width_m;
    var goldenCons = 1.6180339887;

    class Icosaedro {
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
         * Función que dibuja el icosaedro usando el color asignado
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
         * Función que dibuja el icosaedro en modo wireframe
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
         * Función que devuelve los vértices del icosaedro
         */
        getVertices() {
            return [
                0,          g_width,    g_width_m, 
                0,          g_width,   -g_width_m, 
                0,         -g_width,    g_width_m, 
                0,         -g_width,   -g_width_m, 
                g_width,    g_width_m,  0, 
                g_width,   -g_width_m,  0, 
               -g_width,    g_width_m,  0, 
               -g_width,   -g_width_m,  0, 
                g_width_m,  0,          g_width, 
                g_width_m,  0,         -g_width, 
               -g_width_m,  0,          g_width, 
               -g_width_m,  0,         -g_width
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