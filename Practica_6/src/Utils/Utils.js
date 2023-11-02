var CG = (function(CG) {
    /*=======================================================*/
    // Funciones de utilería para la construcción de shaders y obtención de posición del mouse
    /*=======================================================*/

    /**
     * Función que obtiene la posición del mouse
     */
    function getMousePositionInElement(evt, element) {
        const rect = element.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        return { x: x, y: y };
    }
    
    /**
     * Función que crear un shader, dado un contexto de render, un tipo y el código fuente
     */
    function createShader(gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        
        if (success) {
          return shader;
        }
    
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    /**
   * Función que toma un shader de vértices con uno de fragmentos y construye un programa
   */
  function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
  
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  
    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
  }

  CG.getMousePositionInElement = getMousePositionInElement;
  CG.createShader = createShader;
  CG.createProgram = createProgram;
  return CG;
}(CG || {}));