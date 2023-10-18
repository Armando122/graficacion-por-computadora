var CG = (function(CG) {
    let g_width, g_height, g_length;
  
    class PrismaRectangular {
      /**
       * @param {WebGLRenderingContext} gl
       * @param {Number[]} color
       * @param {Number} width
       * @param {Number} height
       * @param {Number} length
       * @param {Matrix4} initial_transform
       */
      constructor(gl, color, width, height, length, initial_transform) {
        g_width  = (width  || 1)/2;
        g_height = (height || 1)/2;
        g_length = (length || 1)/2;
        
        this.initial_transform = initial_transform || new CG.Matrix4();
  
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
       * @param {WebGLRenderingContext} gl
       * @param {GLint} positionAttributeLocation
       * @param {WebGLUniformLocation} colorUniformLocation
       * @param {WebGLUniformLocation} PVM_matrixLocation
       * @param {Matrix4} projectionViewMatrix
       * Función que dibuja el objeto geométrico usando el color asignado
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
       * @param {WebGLRenderingContext} gl
       * @param {GLint} positionAttributeLocation
       * @param {WebGLUniformLocation} colorUniformLocation
       * @param {WebGLUniformLocation} PVM_matrixLocation
       * @param {Matrix4} projectionViewMatrix
       * Función que dibuja el objeto geométrico en modo wireframe 
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
       * Función que devuelve un arreglo con los vértices de la figura
       */
      getVertices() {
        return [
            g_width,  g_height,  g_length, //0
            g_width, -g_height,  g_length, //1
            g_width,  g_height, -g_length, //2
            g_width, -g_height, -g_length, //3
           -g_width,  g_height,  g_length, //4
           -g_width, -g_height,  g_length, //5
           -g_width,  g_height, -g_length, //6
           -g_width, -g_height, -g_length  //7
        ];
      }
      
      /**
       * Función que devuelve el arreglo de caras de la figura.
       */
      getFaces() {
        return [
          2, 1, 3, //Triángulo 1 vista lateral derecha
          2, 0, 1, //Triángulo 2 vista lateral derecha
  
          1, 4, 5, //Triángulo 1 vista frontal
          1, 0, 4, //Triángulo 2 vista frontal
  
          5, 6, 7, //Triángulo 1 vista lateral izquierda
          5, 4, 6, //Triángulo 2 vista lateral izquierda
  
          6, 3, 7, //Triángulo 1 vista trasera
          6, 2, 3, //Triángulo 2 vista trasera
  
          4, 2, 6, //Triángulo 1 vista inferior
          4, 0, 2, //Triángulo 2 vista inferior
  
          3, 5, 7, //Triángulo 1 vista superior
          3, 1, 5, //Triángulo 2 vista superior
        ];
      }
    }
  
    CG.PrismaRectangular = PrismaRectangular;
    return CG;
  })(CG || {});
