var CG = (function(CG) {
    let g_width, g_height, g_length;
  
    class PrismaRectangular extends CG.GenericGeometry {
      /**
       * @param {WebGLRenderingContext} gl
       * @param {Number[]} color
       * @param {Number} width
       * @param {Number} height
       * @param {Number} length
       * @param {Matrix4} initial_transform
       * @param {Boolean} Smooth
       */
      constructor(gl, color, width, height, length, initial_transform) {
        g_width  = (width  || 1)/2;
        g_height = (height || 1)/2;
        g_length = (length || 1)/2;

        super(gl, color, initial_transform);
      }

      /**
       * Función que devuelve los vértices para el modo wireframe
       */
      getVerticesW() {
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
       * Función que devuelve un arreglo con los vértices de la figura
       */
      getVertices() {
        return [
          g_width,  g_height, -g_length,  g_width, -g_height,  g_length,  g_width, -g_height, -g_length,
          g_width,  g_height, -g_length,  g_width,  g_height,  g_length,  g_width, -g_height,  g_length,
  
          g_width, -g_height,  g_length,  -g_width,  g_height,  g_length,  -g_width, -g_height,  g_length,
          g_width, -g_height,  g_length,  g_width,  g_height,  g_length,  -g_width,  g_height,  g_length,
  
          -g_width, -g_height,  g_length,  -g_width,  g_height, -g_length,  -g_width, -g_height, -g_length,
          -g_width, -g_height,  g_length,  -g_width,  g_height,  g_length,  -g_width,  g_height, -g_length,
  
          -g_width,  g_height, -g_length,  g_width, -g_height, -g_length,  -g_width, -g_height, -g_length,
          -g_width,  g_height, -g_length,  g_width,  g_height, -g_length,  g_width, -g_height, -g_length,
  
          -g_width,  g_height,  g_length,  g_width,  g_height, -g_length,  -g_width,  g_height, -g_length,
          -g_width,  g_height,  g_length,  g_width,  g_height,  g_length,  g_width,  g_height, -g_length,
  
          g_width, -g_height, -g_length,  -g_width, -g_height,  g_length,  -g_width, -g_height, -g_length,
          g_width, -g_height, -g_length,  g_width, -g_height,  g_length,  -g_width, -g_height,  g_length,
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