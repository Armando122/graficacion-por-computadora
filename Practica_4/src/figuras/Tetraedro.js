var CG = (function(CG) {
    let g_width, g_x, g_y, g_z, g_x0, g_y0;

    class Tetraedro{
        /**
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Matrix4} initial_transform
         * Constructor de tetraedro
         */
        constructor(gl, color, width, initial_transform) {
            g_width = (width || 1);

            let anguloT = 2 * Math.PI/3;
            g_x = width*2*Math.sqrt(2)/3;
            g_y = 0;
            g_z = -width/3;
            g_x0 = g_x * Math.cos(anguloT) + g_y * Math.sin(anguloT);
            g_y0 = -g_x * Math.sin(anguloT) + g_y * Math.cos(anguloT);

            this.initial_transform = initial_transform || new CG.Matrix4();

            this.positionbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionbuffer);

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
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         * Función que dibuja el objeto geométrico usando el color asignado
         */
        draw(gl, positionAttributeLocation, colorUniformLocation, PVM_matrixLocation, projectionViewMatrix) {
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionbuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            gl.uniform4fv(colorUniformLocation, this.color);

            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);

            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, this.num_elements, gl.UNSIGNED_SHORT, 0);
        }
        
        /**
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         * Función que dibuja el objeto geométrico en modo wireframe
         */
        drawWireframe(gl, positionAttributeLocation, colorUniformLocation, PVM_matrixLocation, projectionViewMatrix) {
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionbuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            gl.uniform4fv(colorUniformLocation, [0,0,0,1]);

            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);

            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.LINE_STRIP, this.num_elements, gl.UNSIGNED_SHORT, 0);
        }

        /**
         * Función que devuelve un arreglo con los vértices del tetraedro.
         */
        getVertices() {
            return [
                0,     0,    g_width, //0
                g_x0,  g_y0, g_z,     //1
                g_x0, -g_y0, g_z,     //2
                g_x,   g_y,  g_z      //3
            ];
        }

        /**
         * Función que devuelve las caras de la figura
         */
        getFaces() {
            return [
                3, 1, 0,

                0, 1, 2,

                2, 0, 3,

                3, 2, 1
            ];
        }
    }

    CG.Tetraedro = Tetraedro;
    return CG;
})(CG || {});