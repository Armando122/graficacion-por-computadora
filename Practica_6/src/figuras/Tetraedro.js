var CG = (function(CG) {
    let g_width, g_x, g_y, g_z, g_x0, g_y0;

    class Tetraedro extends CG.GenericGeometry {
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

            super(gl, color, initial_transform);

            /*this.initial_transform = initial_transform || new CG.Matrix4();

            this.positionbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionbuffer);

            let vertices = this.getVertices();
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            this.color = color;

            // buffer de normales
            this.normalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            
            let normals = this.getNormals(vertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

            this.num_elements = vertices.length/3;*/
        }
        
        /**
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         * Función que dibuja el objeto geométrico usando el color asignado
         */
        /*draw(gl, positionAttributeLocation, normalAttributeLocation, colorUniformLocation, PVM_matrixLocation, VM_matrixLocation, projectionMatrix, viewMatrix) {
            // buffer de posiciones
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionbuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
            
            // Buffer de normales
            gl.enableVertexAttribArray(normalAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
            
            // Color de la figura
            gl.uniform4fv(colorUniformLocation, this.color);
            
            // VM_MatrixLocation
            let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
            gl.uniformMatrix4fv(VM_matrixLocation, false, viewModelMatrix.toArray());
            
            // PVM
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());

            // Dibujado
            gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);
        }*/
        
        /**
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         * Función que dibuja el objeto geométrico en modo wireframe
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
         * Función que devuelve un arreglo con los vértices del tetraedro.
         */
        getVerticesW() {
            return [
                0,     0,    g_width, /*0*/
                g_x0,  g_y0, g_z,     /*1*/
                g_x0, -g_y0, g_z,     /*2*/
                g_x,   g_y,  g_z      /*3*/
            ];
        }

        /**
         * Función que devuelve el arreglo de vértices para ser usado por drawArrays
         */
        getVertices() {
            return [
                0, 0, g_width, /*0*/ g_x0, g_y0, g_z, /*1*/ g_x, g_y, g_z /*3*/,
                0, 0, g_width, /*0*/ g_x0, -g_y0, g_z, /*2*/ g_x0, g_y0, g_z, /*1*/
                0, 0, g_width, /*0*/ g_x, g_y, g_z, /*3*/ g_x0, -g_y0, g_z, /*2*/
                g_x0, g_y0, g_z, /*1*/ g_x0, -g_y0, g_z, /*2*/ g_x, g_y, g_z /*3*/
            ];
        }

        /**
         * Función que devuelve las normales para el tetraedro
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