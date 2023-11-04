var CG = (function(CG) {
    let MATERIAL_CACHE = {};

    class Material {
        /**
         * Constructor para materiales
         */
        constructor(gl, vertex_shader_source_code, fragment_shader_source_code) {
            if (MATERIAL_CACHE[this.constructor.name]) {
                this.program = MATERIAL_CACHE[this.constructor.name];
            } else {
                this.program = CG.createProgram(
                    gl,
                    CG.createShader(gl, gl.VERTEX_SHADER, vertex_shader_source_code),
                    CG.createShader(gl, gl.FRAGMENT_SHADER, fragment_shader_source_code)
                );
                MATERIAL_CACHE[this.constructor.name] = this.program;
            }

            this.attributes = this.getAttributes(gl);
            this.uniforms = this.getUniforms(gl);
        }

        /**
         * Función que recolecta todos los atributos contenidos en el programa (shader de vértices y de fragmentos)
         * @param {*} gl Contexto de render de WebGL
         * @return Un objeto con todos los atributos de programa
         */
        getAttributes(gl) {
            // Atributos se almacenan en un objeto tipo JSon
            let attributes = {};
            let tmp_attribute_name;

            // getProgramParameter devuelve atributos en shaders de programa
            for (let i = 0, l = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES); i < l; i++) {
                // getActiveAttrib accede a un atributo en particular
                tmp_attribute_name = gl.getActiveAttrib(this.program, i).name;

                attributes[tmp_attribute_name] = gl.getAttribLocation(this.program, tmp_attribute_name);
            }

            return attributes;
        }

        /**
         * Función que recolecta todos los uniformes contenidos en el programa (shader de vértices y de fragmentos)
         * @param {*} gl Contexto de render de WebGL
         * @return Un objeto con todos los uniformes de programa
         */
        getUniforms(gl) {
            let uniforms = {};
            let tmp_uniform;

            for (let i = 0, l = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS); i < l; i++) {
                tmp_uniform = gl.getActiveUniform(this.program, i);

                // Para uniforms es necesario almacenar su tipo y tamaño
                uniforms[tmp_uniform.name] = gl.getUniformLocation(this.program, tmp_uniform.name);
                uniforms[tmp_uniform.name].type = tmp_uniform.type;
                uniforms[tmp_uniform.name].size = tmp_uniform.size;
            }

            return uniforms;
        }

        /**
         * Función que asigna un valor a un atributo, relacionando un buffer de datos con el atributo
         * @param {*} gl  El contexto de render de WebGL
         * @param {*} name  Nombre del atributo
         * @param {*} bufferData  El buffer de datos con el que se relaciona el atributo
         * @param {*} size  El tamaño o cantidad de elementos que debe tomar el atributo del buffer de datos
         * @param {*} type  El tipo de datos del buffer de datos
         * @param {*} normalized  Parámetro que determina si los datos se normalizan
         * @param {*} stride  Espaciado entre la extracción de datos
         * @param {*} offset  Desplazamiento para obtener los datos
         */
        setAttribute(gl, name, bufferData, size, type, normalized, stride, offset) {
            // Se busca que programa asociado a material cuente con el atributo a cambiar
            let attr = this.attributes[name];

            // Si existe se puede relacionar con el buffer de datos
            if (attr != undefined) {
                // Se activa búffer de datos
                gl.bindBuffer(gl.ARRAY_BUFFER, bufferData);
                // Se activa atributo
                gl.enableVertexAttribArray(attr);
                // Se indica cómo tomar info de buffer
                gl.vertexAttribPointer(attr, size, type, normalized, stride, offset);
            }
            // En otro caso no existe y no se hace asignación alguna
        }

        /**
         * Función que asigna un valor a un uniforme
         * @param {*} gl  El contexto de render de WebGL
         * @param {*} name  Nombre del uniforme
         * @param {*} data  El valor que se quiere asignar al uniforme
         */
        setUniform(gl, name, data) {
            // se busca que el programa asociado con el material cuenta con el uniforme que se quiere cambiar
            let unif = this.uniforms[name];
  
            // si el uniforme existe entonces se pude asignar el valor
            if (unif) {
                // se obtiene el tipo de dato del uniforme
                let type = unif.type;
                // se obtiene el tamaño del uniforme
                let size = unif.size;
  
                // con el tipo y el tamaño se puede llamar la función adecuada para pasar el valor al uniforme
  
                if (type === gl.FLOAT && size > 1) {
                  gl.uniform1fv(unif, data);
                }
                else if (type === gl.FLOAT && size == 1) {
                  gl.uniform1f(unif, data);
                }
                else if (type === gl.INT && size > 1) {
                  gl.uniform1iv(unif, data);
                }
                else if (type === gl.INT && size == 1) {
                  gl.uniform1i(unif, data);
                }
                else if (type === gl.SAMPLER_2D) {
                  gl.uniform1i(unif, data);
                }
                else if (type === gl.BOOL) {
                  gl.uniform1iv(unif, data);
                }
                else if (type === gl.FLOAT_VEC2) {
                  gl.uniform2fv(unif, data);
                }
                else if (type === gl.FLOAT_VEC3) {
                  gl.uniform3fv(unif, data);
                }
                else if (type === gl.FLOAT_VEC4) {
                  gl.uniform4fv(unif, data);
                }
                else if (type === gl.INT_VEC2) {
                  gl.uniform2iv(unif, data);
                }
                else if (type === gl.INT_VEC3) {
                  gl.uniform3iv(unif, data);
                }
                else if (type === gl.INT_VEC4) {
                  gl.uniform4iv(unif, data);
                }
                else if (type === gl.BOOL_VEC2) {
                  gl.uniform2iv(unif, data);
                }
                else if (type === gl.BOOL_VEC3) {
                  gl.uniform3iv(unif, data);
                }
                else if (type === gl.BOOL_VEC4) {
                  gl.uniform4iv(unif, data);
                }
                else if (type === gl.FLOAT_MAT2) {
                  gl.uniformMatrix2fv(unif, false, data);
                }
                else if (type === gl.FLOAT_MAT3) {
                  gl.uniformMatrix3fv(unif, false, data);
                }
                else if (type === gl.FLOAT_MAT4) {
                  gl.uniformMatrix4fv(unif, false, data);
                }
            }
        }
    }

    CG.Material = Material;
    return CG;
}(CG || {}));