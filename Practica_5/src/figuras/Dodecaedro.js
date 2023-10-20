var CG = (function(CG) {
    let g_width, g_width_d, g_width_m;
    var goldenCons = 1.6180339887;

    class Dodecaedro {
        /**
         * Constructor de dodecaedro
         * @param {WebGLRenderingContext} gl
         * @param {Number[]} color
         * @param {Number} width
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color, width, initial_transform) {
            g_width = (width || 1)/Math.PI;
            g_width_d = g_width/goldenCons;
            g_width_m = g_width*goldenCons;

            this.initial_transform = initial_transform || new CG.Matrix4();

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

            this.num_elements = vertices.length/3;
        }

        /**
         * Función que dibuja el dodecaedro usando el color asignado
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         */
        draw(gl, positionAttributeLocation, normalAttributeLocation, colorUniformLocation, PVM_matrixLocation, VM_MatrixLocation, projectionMatrix, viewMatrix) {
            // Buffer de posiciones
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            // Buffer de normales
            gl.enableVertexAttribArray(normalAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            // Color figura
            gl.uniform4fv(colorUniformLocation, this.color);

            // VM_MatrixLocation
            let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
            gl.uniformMatrix4fv(VM_MatrixLocation, false, viewModelMatrix.toArray());

            // PVM
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
        
            // Dibujo 
            gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);
        }

        /**
         * Función que dibuja el dodecaedro en modo wireframe
         * @param {WebGLRenderingContext} gl
         * @param {GLint} positionAttributeLocation
         * @param {WebGLUniformLocation} colorUniformLocation
         * @param {WebGLUniformLocation} PVM_matrixLocation
         * @param {Matrix4} projectionViewMatrix
         */
        drawWireframe(gl, positionAttributeLocation, colorUniformLocation, PVM_matrixLocation, projectionViewMatrix) {
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
        }

        /**
         * Función que devuelve los vértices del dodecaedro, para usar en modo wireframe
         */
        getVerticesW() {
            return [
                 g_width,    g_width,    g_width,   /*0 */                
                 g_width,    g_width,   -g_width,   /*1 */                
                 g_width,   -g_width,    g_width,   /*2 */                
                 g_width,   -g_width,   -g_width,   /*3 */                
                -g_width,    g_width,    g_width,   /*4 */                
                -g_width,    g_width,   -g_width,   /*5 */                
                -g_width,   -g_width,    g_width,   /*6 */               
                -g_width,   -g_width,   -g_width,   /*7 */               
                 0,          g_width_d,  g_width_m, /*8 */ 
                 0,          g_width_d, -g_width_m, /*9 */
                 0,         -g_width_d,  g_width_m, /*10*/ 
                 0,         -g_width_d, -g_width_m, /*11*/ 
                 g_width_d,  g_width_m,  0,         /*12*/ 
                 g_width_d, -g_width_m,  0,         /*13*/ 
                -g_width_d,  g_width_m,  0,         /*14*/ 
                -g_width_d, -g_width_m,  0,         /*15*/ 
                 g_width_m,  0,          g_width_d, /*16*/ 
                 g_width_m,  0,         -g_width_d, /*17*/ 
                -g_width_m,  0,          g_width_d, /*18*/ 
                -g_width_m,  0,         -g_width_d  /*19*/ 
            ];
        }

        /**
         * Función que devuelve los vértices del dodecaedro, drawArrays
         */
        getVertices() {
            return [
                g_width,g_width,g_width,  /*0 */  g_width,-g_width,g_width,  /*2 */  g_width_m,0,g_width_d,     /*16*/
                g_width,g_width,g_width,  /*0 */  0,-g_width_d,g_width_m,    /*10*/  g_width,-g_width,g_width,  /*2 */
                g_width,g_width,g_width,  /*0 */  0,g_width_d,g_width_m,     /*8 */  0,-g_width_d,g_width_m,    /*10*/    // Cara-p
                g_width_d,g_width_m,0,    /*12*/  g_width_m,0,-g_width_d,    /*17*/  g_width,g_width,-g_width,  /*1 */
                g_width_d,g_width_m,0,    /*12*/  g_width_m,0,g_width_d,     /*16*/  g_width_m,0,-g_width_d,    /*17*/
                g_width_d,g_width_m,0,    /*12*/  g_width,g_width,g_width,   /*0 */  g_width_m,0,g_width_d,     /*16*/    // Cara
                0,g_width_d,g_width_m,    /*8 */  -g_width_d,g_width_m,0,    /*14*/  -g_width,g_width,g_width,  /*4 */
                0,g_width_d,g_width_m,    /*8 */  g_width_d,g_width_m,0,     /*12*/  -g_width_d,g_width_m,0,    /*14*/
                0,g_width_d,g_width_m,    /*8 */  g_width,g_width,g_width,   /*0 */  g_width_d,g_width_m,0,     /*12*/    // Cara 
                g_width,-g_width,g_width, /*2 */  g_width_m,0,-g_width_d,    /*17*/  g_width_m,0,g_width_d,     /*16*/  
                g_width,-g_width,g_width, /*2 */  g_width,-g_width,-g_width, /*3 */  g_width_m,0,-g_width_d,    /*17*/
                g_width,-g_width,g_width, /*2 */  g_width_d,-g_width_m,0,    /*13*/  g_width,-g_width,-g_width, /*3 */    // Cara 
                g_width_d,-g_width_m,0,   /*13*/  -g_width,-g_width,g_width, /*6 */  -g_width_d,-g_width_m,0,   /*15*/
                g_width_d,-g_width_m,0,   /*13*/  0,-g_width_d,g_width_m,    /*10*/ -g_width,-g_width,g_width,  /*6 */
                g_width_d,-g_width_m,0,   /*13*/  g_width,-g_width,g_width,  /*2 */ 0,-g_width_d,g_width_m,     /*10*/    // Cara 
                -g_width,-g_width,g_width,/*6 */  -g_width,g_width,g_width,  /*4 */  -g_width_m,0,g_width_d,    /*18*/
                -g_width,-g_width,g_width,/*6 */  0,g_width_d,g_width_m,     /*8 */  -g_width,g_width,g_width,  /*4 */
                -g_width,-g_width,g_width,/*6 */  0,-g_width_d,g_width_m,    /*10*/  0,g_width_d,g_width_m,     /*8 */    // Cara-p 
                g_width,-g_width,-g_width,/*3 */  g_width,g_width,-g_width,  /*1 */  g_width_m,0,-g_width_d,    /*17*/
                g_width,-g_width,-g_width,/*3 */  0,g_width_d,-g_width_m,    /*9 */  g_width,g_width,-g_width,  /*1 */
                g_width,-g_width,-g_width,/*3 */  0,-g_width_d,-g_width_m,   /*11*/  0,g_width_d,-g_width_m,    /*9 */    // Cara 
                g_width_d,-g_width_m,0,   /*13*/  0,-g_width_d,-g_width_m,   /*11*/  g_width,-g_width,-g_width, /*3 */
                g_width_d,-g_width_m,0,   /*13*/  -g_width,-g_width,-g_width,/*7 */  0,-g_width_d,-g_width_m,   /*11*/
                g_width_d,-g_width_m,0,   /*13*/  -g_width_d,-g_width_m,0,   /*15*/  -g_width,-g_width,-g_width,/*7 */    // Cara
                g_width,g_width,-g_width, /*1 */  -g_width_d,g_width_m,0,    /*14*/  g_width_d,g_width_m,0,     /*12*/
                g_width,g_width,-g_width, /*1 */  -g_width,g_width,-g_width, /*5 */  -g_width_d,g_width_m,0,    /*14*/
                g_width,g_width,-g_width, /*1 */  0,g_width_d,-g_width_m,    /*9 */  -g_width,g_width,-g_width, /*5 */    // Cara 
                0,-g_width_d,-g_width_m,  /*11*/  -g_width,g_width,-g_width, /*5 */  0,g_width_d,-g_width_m,    /*9 */
                0,-g_width_d,-g_width_m,  /*11*/  -g_width_m,0,-g_width_d,   /*19*/  -g_width,g_width,-g_width, /*5 */
                0,-g_width_d,-g_width_m,  /*11*/  -g_width,-g_width,-g_width,/*7 */  -g_width_m,0,-g_width_d,   /*19*/    // Cara
                -g_width,g_width,-g_width,/*5 */  -g_width,g_width,g_width,  /*4 */  -g_width_d,g_width_m,0,    /*14*/
                -g_width,g_width,-g_width,/*5 */  -g_width_m,0,g_width_d,    /*18*/  -g_width,g_width,g_width,  /*4 */
                -g_width,g_width,-g_width,/*5 */  -g_width_m,0,-g_width_d,   /*19*/  -g_width_m,0,g_width_d,    /*18*/    // Cara
                -g_width,-g_width,g_width,/*6 */  -g_width,-g_width,-g_width,/*7 */  -g_width_d,-g_width_m,0,   /*15*/
                -g_width,-g_width,g_width,/*6 */  -g_width_m,0,-g_width_d,   /*19*/  -g_width,-g_width,-g_width,/*7 */
                -g_width,-g_width,g_width,/*6 */  -g_width_m,0,g_width_d,    /*18*/ -g_width_m,0,-g_width_d,   /*19*/    // Cara
            ];
        }

        /**
         * Función que devuelve las normales a partir del arreglo de vértices recibido
         */
        getNormals(vertices) {
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
        }

        /**
         * Función que devuelve las caras del dodecaedro
         */
        getFaces() {
            return [
                0,16,2, 0,2,10, 0,10,8,
                12,1,17, 12, 17, 16, 12,0,16,
                8, 4, 14, 8, 14, 12, 8, 0,12,
                2,16,17,  2,17,3,  2,13,3,
                13,15,6,  13,6,10,  13,2,10, 
                6,18,4,  6,4,8,  6,10,8, 
                3,17,1,  3,1,9,  3,11,9, 
                13,3,11,  13,11,7, 13,15,7, 
                1,12,14,  1,14,5, 1,9,5, 
                11,9,5,  11,5,19, 11,7,19, 
                5,14,4,  5,4,18,  5,19,18, 
                6,15,7,  6,7,19,  6,18,19
            ];
        }
    }

    CG.Dodecaedro = Dodecaedro;
    return CG;
}) (CG || {});