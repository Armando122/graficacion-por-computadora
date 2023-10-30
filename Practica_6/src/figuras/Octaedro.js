var CG = (function(CG) {
    let g_width;

    class Octaedro extends CG.GenericGeometry {

        /**
         * Constructor de octaedro
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, width, initial_transform) {
            g_width = (width || 1);

            super(gl, color, initial_transform);

            /*this.initial_transform = initial_transform || new CG.Matrix4();

            this.positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

            let vertices = this.getVertices();
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            this.color = color;

            // Buffer de normales
            this.normalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);

            let normals = this.getNormals(vertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

            this.num_elements = vertices.length/3;*/
        }

        /**
         * Función que dibuja el octaedro usando el color asignado
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         */
        /*draw(gl, positionAttributeLocation, normalAttributeLocation, colorUniformLocation, PVM_matrixLocation, VM_MatrixLocation, projectionMatrix, viewMatrix) {
            // Buffer de posiciones
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            //Buffer de normales
            gl.enableVertexAttribArray(normalAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            // Color de la figura
            gl.uniform4fv(colorUniformLocation, this.color);

            // VM_MatrixLocation
            let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
            gl.uniformMatrix4fv(VM_MatrixLocation, false, viewModelMatrix.toArray());

            //PVM
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
  
            // Dibujado
            gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);
        }*/

        /**
         * Función que dibuja el octaedro usando el modo wireframe
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         */
        /*drawWireframe(gl, positionAttributeLocation, colorUniformLocation, PVM_matrixLocation, projectionViewMatrix) {
            let positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            let vertices = this.getVerticesW();
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            let indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

            let faces = this.getFaces();
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);

            let num_elementsL = faces.length;

            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
  
            gl.uniform4fv(colorUniformLocation, [0,0,0,1]);
        
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);
  
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
  
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.drawElements(gl.LINE_STRIP, num_elementsL, gl.UNSIGNED_SHORT, 0);
        }*/

        /**
         * Función que devuelve el arreglo de vértices del octaedro para el modo wireframe
         */
        getVerticesW() {
            return [
                0,        0,        g_width, /*0*/
                g_width,  0,        0,       /*1*/
               -g_width,  0,        0,       /*2*/
                0,        g_width,  0,       /*3*/
                0,       -g_width,  0,       /*4*/
                0,        0,       -g_width  /*5*/
            ];
        }

        /**
         * Función que devuelve los vértices del octaedro para ser usado por drawArrays
         */
        getVertices() {
            return [
                0, g_width, 0,/*3*/ 0, 0, g_width, /*0*/ g_width, 0, 0, /*1*/
                0, g_width, 0,/*3*/ -g_width, 0, 0, /*2*/ 0, 0, g_width, /*0*/
                0, -g_width, 0, /*4*/ g_width, 0, 0, /*1*/ 0, 0, g_width, /*0*/ 
                0, -g_width, 0, /*4*/ 0, 0, g_width, /*0*/ -g_width, 0, 0, /*2*/
                0, 0, -g_width, /*5*/ 0, g_width, 0,/*3*/  g_width, 0, 0, /*1*/
                0, g_width, 0,/*3*/ 0, 0, -g_width, /*5*/ -g_width, 0, 0, /*2*/
                0, -g_width, 0, /*4*/ 0, 0, -g_width, /*5*/ g_width, 0, 0, /*1*/
                0, 0, -g_width, /*5*/ 0, -g_width, 0, /*4*/ -g_width, 0, 0, /*2*/
            ];
        }

        /**
         * Función que devuelve las normales del octaedro
         */
        /*getNormals(vertices) {
            let normals = [];
            let v1 = new CG.Vector3();
            let v2 = new CG.Vector3();
            let v3 = new CG.Vector3();
            let n;

            //Reconstrucción de vértices
            for (let i = 0; i < vertices.length; i+=9) {
                v1.set(vertices[i  ], vertices[i+1], vertices[i+2]);
                v2.set(vertices[i+3], vertices[i+4], vertices[i+5]);
                v3.set(vertices[i+6], vertices[i+7], vertices[i+8]);
                // Cálculo de la normal
                n = CG.Vector3.cross(CG.Vector3.substract(v1, v2), CG.Vector3.substract(v2, v3)).normalize();
                normals.push(
                    n.x, n.y, n.z,
                    n.x, n.y, n.z,
                    n.x, n.y, n.z
                );
            }
            
            return normals;
        }*/

        /**
         * Función que devuelve las caras del octaedro
         */
        getFaces() {
            return [
                3, 1, 0, //
                2, 3, 0, //
                1, 4, 0, //
                4, 2, 0, //
                1, 3, 5, //
                3, 2, 5, //
                4, 1, 5, //
                2, 4, 5
            ];
        }
    }

    CG.Octaedro = Octaedro;
    return CG;
}) (CG || {});