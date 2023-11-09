let gl, program, programW;

window.addEventListener("load", async function(evt) {
    // se obtiene una referencia al canvas
    let canvas = document.getElementById("the_canvas");
    let checkboWire = document.getElementById("wire_ckbx");
    let checkboEspec = document.getElementById("especular_ckbx");
    let checkboTexture = document.getElementById("texture_ckbx");
  
    // se obtiene una referencia al contexto de render de WebGL
    gl = canvas.getContext("webgl");
  
    // si el navegador no soporta WebGL la variable gl no está definida y se lanza una excepción
    if (!gl) throw "WebGL no soportado";
  
    // se crean y posicionan los modelos geométricos, uno de cada tipo
    geometry = [
      new CG.Cilindro(
        gl, 
        [1, 0, 0, 1], 
        2, 2, 16, 16, 
        CG.Matrix4.translate(new CG.Vector3(-5, 0, -5))
      ),
      new CG.Cono(
        gl, 
        [0, 1, 0, 1], 
        2, 2, 16, 16, 
        CG.Matrix4.translate(new CG.Vector3(0, 0, -5))
      ),
      new CG.Dodecaedro(
        gl, 
        [0, 0, 1, 1], 
        2, 
        CG.Matrix4.translate(new CG.Vector3(5, 0, -5))
      ),
      new CG.Esfera(
        gl, 
        [0, 1, 1, 1],
        2, 16, 16, 
        CG.Matrix4.translate(new CG.Vector3(-5, 0, 0))
      ),
      new CG.Icosaedro(gl, 
        [1, 0 , 1, 1], 
        2, 
        CG.Matrix4.translate(new CG.Vector3(0, 0, 0))
      ),
      new CG.Octaedro(
        gl, 
        [1, 1, 0, 1], 
        2, 
        CG.Matrix4.translate(new CG.Vector3(5, 0, 0))
      ),
      new CG.PrismaRectangular(
        gl, 
        [1, 0.2, 0.3, 1], 
        2, 3, 4, 
        CG.Matrix4.translate(new CG.Vector3(-5, 0, 5)),
      ),
      new CG.Tetraedro(
        gl, 
        [0.5, 0.5, 0.5, 1],
        2, 
        CG.Matrix4.translate(new CG.Vector3(0, 0, 5))
      ),
      new CG.Toro(
        gl,
        [0.25, 0.25, 0.25, 1], 
        4, 1, 16, 16, 
        CG.Matrix4.translate(new CG.Vector3(5, 0, 5))
      ),
    ];

    // Configuración de texturas
    geometry[0].setTexture(await CG.loadImage("texturas/PavingStones133_2K-PNG_Color.png")); // Cilindro 
    geometry[1].setTexture(await CG.loadImage("texturas/Tiles074_1K-PNG_Color.png")); // Cono 
    geometry[2].setTexture(await CG.loadImage("texturas/Tiles074_1K-PNG_Color.png")); // Dodecaedro 
    geometry[3].setTexture(await CG.loadImage("texturas/Grass004_2K-PNG_Color.png")); // Esfera 
    geometry[4].setTexture(await CG.loadImage("texturas/Gravel023_2K-PNG_AmbientOcclusion.png")); // Icosaedro 
    geometry[5].setTexture(await CG.loadImage("texturas/Tiles093_2K-PNG_Color.png")); // Octaedro 
    geometry[6].setTexture(await CG.loadImage("texturas/Bricks086_1K-PNG_Color.png")); // Prisma rectangular 
    geometry[7].setTexture(await CG.loadImage("texturas/WoodFloor051_2K-PNG_Color.png")); // Tetraedro 
    geometry[8].setTexture(await CG.loadImage("texturas/PavingStones133_2K-PNG_Color.png")); // Toro 

    // se determina el color con el que se limpia la pantalla, en este caso un color negro transparente
    gl.clearColor(0, 0, 0, 0);
    // se activa la prueba de profundidad, esto hace que se utilice el buffer de profundidad para determinar que píxeles se dibujan y cuales se descartan
    gl.enable(gl.DEPTH_TEST);
  
    /* ============= Camara ============= */
    let aspect = canvas.width/canvas.height;
    let zNear = 1;
    let zFar = 2000;
    let projectionMatrix = CG.Matrix4.perspective(75*Math.PI/180, aspect, zNear, zFar);
    // Se construye la camára
    let camera = new CG.TrackballCamera(
      new CG.Vector3(0, 11, 7), //pos
      new CG.Vector3(0, 0, 0),  //coi
      new CG.Vector3(0, 1, 0)   //up
    );

    let viewMatrix;
    // Se construye la posición de la luz
    let lightPosition = new CG.Vector4(0, 3, 0, 1);
    let lightPosView;

    
    /* ============= Camara ============= */
  
    // se encapsula el código de dibujo en una función
    function draw(especular, coef_env, material, alpha_s) {
      camera.setDrawParams(draw, especular, coef_env, material, alpha_s);
  
      // se le indica a WebGL cual es el tamaño de la ventana donde se despliegan los gráficos
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
      // se limpian tanto el buffer de color, como el buffer de profundidad
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      viewMatrix = camera.getMatrix();
      lightPosView = viewMatrix.multiplyVector(lightPosition);
  
      // se itera sobre cada objeto geométrico definido
      for (let i=0; i<geometry.length; i++) {
        let figura = geometry[i];

        figura.draw(
          gl, // referencia al contexto de render de WebGL
          material,
          projectionMatrix,
          viewMatrix,
          lightPosView,
          coef_env,
          1, // Coeficiente difuso
          especular,
          alpha_s
          );
      }
    }

    /*================== MODO WIREFFRAME ==================*/
    // se encapsula el código de dibujo en una función
    function wireframe() {

      camera.setDrawParams(wireframe);

      // se define una matriz que combina las transformaciones de la vista y de proyección
      let viewProjectionMatrixW = CG.Matrix4.multiply(projectionMatrix, camera.getMatrix());

      // se le indica a WebGL cual es el tamaño de la ventana donde se despliegan los gráficos
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // se limpian tanto el buffer de color, como el buffer de profundidad
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // se itera sobre cada objeto geométrico definido
      for (let i=0; i<geometry.length; i++) {
        // se dibuja la geometría
        geometry[i].drawWireframe(
          gl, // referencia al contexto de render de WebGL
          viewProjectionMatrixW // la matriz de transformación de la vista y proyección
        );
      }
    }
    /*=====================================================*/
  
    // se dibujan los objetos
    draw(0,0.0685, new CG.DiffuseMaterial(gl), 0);
    
    camera.registerMouseEvents(canvas/*, draw, val_esp, coef_amb, mat, valor_alpha*/);
    //camera.registerKeyboardEvents(canvas);
    
    /*=== Eventos para dibujar las figuras en diferentes modos ===*/
    checkboWire.addEventListener("change", function() {
      if (checkboWire.checked) {
        checkboEspec.disabled = true;
        checkboTexture.disabled = true;
        wireframe();
      } else {
        checkboEspec.disabled = false;
        checkboTexture.disabled = false;
        // Se regresa al estado seleccionado
        if (checkboEspec.checked) {
          draw(1, 0.0685, new CG.PhongMaterial(gl), 5.0);  // Dibujado difuso y especular
        } else {
          if (checkboTexture.checked) {
            draw(0,0.0685, new CG.TextureMaterial(gl), 0);  // texturas
          } else {
            draw(0, 0.0685, new CG.DiffuseMaterial(gl));  // Dibujado solo difuso
          }
        }
      }
    });
    
    checkboEspec.addEventListener("change", function() {
      if (checkboEspec.checked) {
        draw(1, 0.0685, new CG.PhongMaterial(gl), 5.0);  // Dibujado difuso y especular
      } else {
        draw(0, 0.0685, new CG.DiffuseMaterial(gl));  // Dibujado solo difuso
      }
    });

    checkboTexture.addEventListener("change", function() {
      if (checkboTexture.checked) {
        checkboEspec.disabled = true;
        draw(0,0.0685, new CG.TextureMaterial(gl), 0);  // texturas
      } else {
        checkboEspec.disabled = false;
        if (checkboEspec.checked) {
          draw(1, 0.0685, new CG.PhongMaterial(gl), 5.0);  // Dibujado difuso y especular
        } else {
          draw(0, 0.0685, new CG.DiffuseMaterial(gl));  // Dibujado solo difuso
        }
      }
    });
    
  });
