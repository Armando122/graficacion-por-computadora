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
         * Función que dibuja la esfera usando el color asignado
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

            // Buffer de normales
            gl.enableVertexAttribArray(normalAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            //Color de la figura
            gl.uniform4fv(colorUniformLocation, this.color);

            // VM
            let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
            gl.uniformMatrix4fv(VM_MatrixLocation, false, viewModelMatrix.toArray());


            // PVM
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
            
            // Dibujo
            gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);
        }*/

        /**
         * Función que dibuja la esfera en modo wireframe
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
         * Función que devuelve las normales de la esfera
         */
        /*getNormals(vertices) {let normals = [];
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
    }

    CG.Esfera = Esfera;
    return CG;
}) (CG || {});