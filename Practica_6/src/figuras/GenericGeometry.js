/**
 * Abstracción para las figuras utilizadas
 */
var CG = (function(CG) {

    class GenericGeometry {
        
        /**
         * Constructor
         * @param {WebGLRenderingContext} gl
         * @param {Boolean} smooth
         * @param {Number[]} color
         * @param {Matrix4} initial_transform
         */
        constructor(gl, color = [0,0,0,1], initial_transform = new CG.Matrix4()) {
            this.smooth = false;
            this.color = color;
            this.initial_transform = initial_transform;
            this.flatNumElems = 0;
            this.smoothNumElems = 0;

            // Se hacen los caćulos de buffers
              let smooth_vertices = this.getVerticesW();

              let faces = this.getFaces();
              let flat_vertices = this.getVertices();
              let uVMap = this.getUV();

              // triángulos ordenados en el buffer
              this.flatPositionBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.flatPositionBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat_vertices), gl.STATIC_DRAW);
        
              // triángulos indexados
              this.smoothPositionBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.smoothPositionBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(smooth_vertices), gl.STATIC_DRAW);

              /* Coordenadas UV */
              this.UVBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uVMap), gl.STATIC_DRAW);
        
              // los índices correspondientes
              this.indicesBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
              gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);
        
              // normales para drawArray
              let flat_normals = this.getFlatNormals(flat_vertices);
              this.flatNormalBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.flatNormalBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat_normals), gl.STATIC_DRAW);
        
              // normales para drawElements
              let smooth_normals = this.getSmoothNormals(smooth_vertices, faces);
              this.smoothNormalBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.smoothNormalBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(smooth_normals), gl.STATIC_DRAW);
        
              // número de elementos en el buffer de datos plano
              this.flatNumElements = flat_vertices.length/3;
        
              // número de elementos en el buffer de datos suavizado
              this.smoothNumElements = faces.length;
            /*} else {
              // En otro caso el objeto no está definido con caras suaves
              let vertices = this.getVertices();
              let normals = this.getFlatNormals(vertices);
        
              // creación del buffer de datos del prisma
              this.flatPositionBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.flatPositionBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        
              // creación del buffer de normales del prisma
              this.flatNormalBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.flatNormalBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
              
              // número de elementos que define el prisma
              this.flatNumElements = vertices.length/3;
            }*/
        }

        /**
         * Función que asigna una textura a la figura
         */
        setTexture(imagen) {
          this.imagen = imagen;
          this.texture = gl.createTexture();
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imagen);
          gl.generateMipmap(gl.TEXTURE_2D);
        }
        
        /**
         * @param {*} gl  El contexto de render de WebGL
         * @param {*} projectionMatrix  Matriz de transformación de proyección
         * @param {*} viewMatrix  Matriz de transformación de la vista
         * @param {*} light_pos Posición de la luz
         */
        draw(gl, material = new CG.DiffuseMaterial(gl), projectionMatrix, viewMatrix, light_pos, coef_env, coef_dif, coef_espec, alpha_s) {

          this.material = material;
          
          gl.useProgram(this.material.program);

          // Coordenadas UV
          this.material.setAttribute(gl, "a_texcoord", this.UVBuffer, 2, gl.FLOAT, false, 0, 0);

          // Color de la luz ambiental
          this.material.setUniform(gl, "l_a", [this.color[0],this.color[1], this.color[2]]);
          // Coeficiente ambiental
          this.material.setUniform(gl, "k_a", coef_env);

          // Color de la luz difusa
          this.material.setUniform(gl, "l_d", [this.color[0], this.color[1], this.color[2]]);
          // Coeficiente difuso
          this.material.setUniform(gl, "k_d", coef_dif)
      
          // el color
          this.material.setUniform(gl, "u_color", this.color);

          // la luz
          this.material.setUniform(gl, "u_light_position", [light_pos.x, light_pos.y, light_pos.z]);

          // el color de la luz
          this.material.setUniform(gl, "l_s", [1,1,1]);

          // parámetro de brillo del modelo
          this.material.setUniform(gl, "alpha_s", alpha_s);
          // Coeficiente especular
          this.material.setUniform(gl, "k_s", coef_espec);

      
          // VM_matrixLocation
          let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
          this.material.setUniform(gl, "u_VM_matrix", viewModelMatrix.toArray());

          // PVM_matrixLocation
          let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
          this.material.setUniform(gl, "u_PVM_matrix", projectionViewModelMatrix.toArray());

          // se activa la textura con la que se va a dibujar CREAR
          //gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          this.material.setUniform(gl, "u_texture", 0);
          //gl.uniform1i(textureUniform, 0);

          // si es suavizado utilizamos los datos indexados
          if (this.smooth && (this.smoothNumElements>0)) {
            // el buffer de posiciones
            this.material.setAttribute(gl, "a_position", this.smoothPositionBuffer, 3, gl.FLOAT, false, 0, 0);
            
            // el buffer de normales
            this.material.setAttribute(gl, "a_normal", this.smoothNormalBuffer, 3, gl.FLOAT, false, 0, 0);
            
            // dibujado
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
            gl.drawElements(gl.TRIANGLES, this.smoothNumElements, gl.UNSIGNED_SHORT, 0);
          }
          // si es plano utilizamos los datos consecutivos
          else {
            // el buffer de posiciones
            this.material.setAttribute(gl, "a_position", this.flatPositionBuffer, 3, gl.FLOAT, false, 0, 0);
          
            // el buffer de normales
            this.material.setAttribute(gl, "a_normal", this.flatNormalBuffer, 3, gl.FLOAT, false, 0, 0);
          
            // dibujado
            gl.drawArrays(gl.TRIANGLES, 0, this.flatNumElements);
          }
        }

        /**
         * @param {*} gl  El contexto de render de WebGL
         * @param {*} projectionViewMatrix  Matriz de transformación de proyección
         */
        drawWireframe(gl, projectionViewMatrix) {
          let vertices = this.getVerticesW();
          let faces = this.getFaces();
          
          let wMaterial = new CG.WireframeMaterial(gl);
          gl.useProgram(wMaterial.program);

          // triángulos ordenados en el buffer
          let positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

          // los índices correspondientes
          let indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);

          // número de elementos en el buffer de datos
          let num_elementsL = faces.length;

          // el buffer de posiciones
          wMaterial.setAttribute(gl, "a_position_w", positionBuffer, 3, gl.FLOAT, false, 0, 0);
          
          // PVM_matrixLocation
          let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, this.initial_transform);
          wMaterial.setUniform(gl, "u_PVM_matrix_w", projectionViewModelMatrix.toArray());
          
          
          // el color
          wMaterial.setUniform(gl, "u_color_w", [0,0,0,1]);

        
          // dibujado
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          gl.drawElements(gl.LINE_STRIP, num_elementsL, gl.UNSIGNED_SHORT, 0);
        }
        
        /**
         * Función que devuelve las normales del objeto
         */
        getFlatNormals(vertices) {
          let normals = [];
          let v1 = new CG.Vector3();
          let v2 = new CG.Vector3();
          let v3 = new CG.Vector3();
          let n;

          // Se reconstruyen los vértices a partir del arreglo recibido
          for (let i = 0; i < vertices.length; i+=9) {
            v1.set(vertices[i  ], vertices[i+1], vertices[i+2]);
            v2.set(vertices[i+3], vertices[i+4], vertices[i+5]);
            v3.set(vertices[i+6], vertices[i+7], vertices[i+8]);
            // Se calcula la normal
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
         * Función para obtener las normales suaves
         */
        getSmoothNormals(vertices, faces) {
          let normals = [];
          let v1 = new CG.Vector3();
          let v2 = new CG.Vector3();
          let v3 = new CG.Vector3();
          let i1, i2, i3;
          let tmp = new CG.Vector3();
          let n;
        
          for (let i=0; i<faces.length; i+=3) {
            i1 = faces[i  ]*3;
            i2 = faces[i+1]*3;
            i3 = faces[i+2]*3;
        
            v1.set( vertices[i1], vertices[i1 + 1], vertices[i1 + 2] );
            v2.set( vertices[i2], vertices[i2 + 1], vertices[i2 + 2] );
            v3.set( vertices[i3], vertices[i3 + 1], vertices[i3 + 2] );
            n = CG.Vector3.cross(CG.Vector3.substract(v1, v2), CG.Vector3.substract(v2, v3)).normalize();
            
            tmp.set( normals[i1], normals[i1+1], normals[i1+2] );
            tmp = CG.Vector3.add(tmp, n);
            normals[i1  ] = tmp.x;
            normals[i1+1] = tmp.y;
            normals[i1+2] = tmp.z;
        
            tmp.set( normals[i2], normals[i2+1], normals[i2+2] );
            tmp = CG.Vector3.add(tmp, n);
            normals[i2  ] = tmp.x;
            normals[i2+1] = tmp.y;
            normals[i2+2] = tmp.z;
        
            tmp.set( normals[i3], normals[i3+1], normals[i3+2] );
            tmp = CG.Vector3.add(tmp, n);
            normals[i3  ] = tmp.x;
            normals[i3+1] = tmp.y;
            normals[i3+2] = tmp.z;
          }
        
          for (let i=0; i<normals.length; i+=3) {
            tmp.set(normals[i], normals[i+1], normals[i+2]);
            tmp = tmp.normalize();
            normals[i  ] = tmp.x;
            normals[i+1] = tmp.y;
            normals[i+2] = tmp.z;
          }
        
          return normals;
        }
    }

    CG.GenericGeometry = GenericGeometry;
    return CG;
}(CG || {}));