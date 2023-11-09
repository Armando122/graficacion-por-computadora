var CG = (function(CG) {

    class WireframeMaterial extends CG.Material {
      /**
       * Constructor para wireframe material
       */
      constructor(gl) {
        let vertex_shader = `
        attribute vec4 a_position_w;
  
        uniform mat4 u_PVM_matrix_w;
        
        void main() {
          gl_Position = u_PVM_matrix_w * a_position_w;
        }`;

        let fragment_shader = `
        precision mediump float;
  
        uniform vec4 u_color_w;
      
        void main() {
          gl_FragColor = u_color_w;
        }`;
  
        super(gl, vertex_shader, fragment_shader);
      }
    }
  
    CG.WireframeMaterial = WireframeMaterial;
    return CG;
  }(CG || {}));