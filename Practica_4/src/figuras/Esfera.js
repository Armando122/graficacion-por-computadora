var CG = (function(CG) {
    let g_radius, g_Nu, g_Nv;

    class Esfera {
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
         * Función que dibuja la esfera usando el color asignado
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
         * Función que dibuja la esfera en modo wireframe
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
  
            gl.uniform4fv(colorUniformLocation, this.color);
        
            let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);
  
            gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
  
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.LINE_STRIP, this.num_elements, gl.UNSIGNED_SHORT, 0);
        }*/

        /**
         * Función que devuelve los vértices de la esfera
         */
        getVertices() {
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
                    (j+1)%g_Nv +1 +i*g_Nv,
                    j+1 +(i-1)*g_Nv //2
                  );
                }
            }
            let vertices = this.getVertices();
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