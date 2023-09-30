window.addEventListener("load", function(evt) {
    let canvas = document.getElementById("the_canvas");
    let context = canvas.getContext("2d");
  
    // se definen los vertices del cubo utilizando vectores de 4 dimensiones
    let vertices = [
      new CG.Vector4(1, 1, 1, 1),
      new CG.Vector4(1, -1, 1, 1),
      new CG.Vector4(-1, -1, 1, 1),
      new CG.Vector4(-1, 1, 1, 1),
      new CG.Vector4(1, 1, -1, 1),
      new CG.Vector4(1, -1, -1, 1),
      new CG.Vector4(-1, -1, -1, 1),
      new CG.Vector4(-1, 1, -1, 1)
    ];
  
    // las caras se definen igual que antes, utilizando indices
    let faces = [
      [0, 1, 2],
      [3, 0, 2],
      [4, 5, 6],
      [7, 4, 6],
      [0, 5, 1],
      [4, 5, 0],
      [7, 6, 2],
      [7, 2, 3],
      [7, 4, 0],
      [7, 0, 3],
      [6, 5, 1],
      [6, 1, 2]
    ];
  
    // los colores de cada cara
    let colors = [
      "1abc9c",
      "#16a085",
      "#2ecc71",
      "#27ae60",
      "#3498db",
      "#2980b9",
      "#f1c40f",
      "#f39c12",
      "#e67e22",
      "#d35400",
      "#e74c3c",
      "#c0392b"
    ]
  
    // se define la posición de la cámara (o el observador o el ojo)
    let camera = new CG.Vector3(3, 2, 4);
    // se define la posición del centro de interés, hacia donde observa la cámara
    let coi = new CG.Vector3(0, 0, 0);
    // se crea una matriz de cámara (o vista)
    let viewMatrix = CG.Matrix4.lookAt(camera, coi, new CG.Vector3(0, 1, 0));
  
    let aspect = canvas.width / canvas.height;
    let w = 3;
  
    // se crea una matriz de proyección de perspectiva con un campo de visión (fov) de 75 grados, una distancia cercana de 0.1 y una lejana de 2000 (unidades)
    let projectionMatrix = CG.Matrix4.perspective(
      (75 * Math.PI) / 180,
      aspect,
      0.1,
      2000
    );
  
    // quitar el comentario en el siguiente bloque para obtener el ejemplo de proyección en perspectiva por medio del frustrum
    /**
    let projectionMatrix = CG.Matrix4.frustum(
      -w, w,                // left, right
      -w/aspect, w/aspect,  // bottom, top
      3, 100                // near, far
    );
    */
  
    // quitar el comentario en el siguiente bloque para obtener el ejemplo de proyección ortográfica
    /**
    let projectionMatrix = CG.Matrix4.orthographic(
      -w, w,               // left, right
      -w/aspect, w/aspect, // bottom, top
      0.1, 100             // near, far
    );
    */
  
    // se crea una matrix que conjunta las transformaciones de la cámara y de la proyección
    // hay que recordar que primero se realiza la transformación de la cámara y luego la de la perspectiva
    let projectionViewMatrix = CG.Matrix4.multiply(projectionMatrix, viewMatrix);
  
    /**
     * Esta función en necesaria ya que estamos usando 2D para dibujar los objetos 3D
     * Cuando veamos WebGL esta transformación desaparece, ya que WebGL realiza la transformación automáticamente
     */
    function imageTransform(w, h, v) {
      // hay que notar que las coordenadas de los puntos se dividen entre su componente w, lo que es necesario para aplicar de forma completa la transformación de proyección
      return {
        x: ((v.x / v.w) * w) / 2 + w / 2,
        y: ((-v.y / v.w) * h) / 2 + h / 2,
        z: v.z / v.w
      };
    }
  
    let vertex;
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // se ordenan las caras, para dibujar de mejor forma los polígonos
    let new_faces = faces.sort(function(a, b) {
      let tmp_a = (vertices[a[0]].z + vertices[a[1]].z + vertices[a[2]].z) / 3;
      let tmp_b = (vertices[b[0]].z + vertices[b[1]].z + vertices[b[2]].z) / 3;
      return tmp_a - tmp_b;
    });
  
    // se itera sobre cada una de las caras
    new_faces.forEach((face, face_index) => {
      // se asigna el color a la cara en base a su indice
      // usualmente los colores se asignan a los vertices, por ejemplo en WebGL
      context.fillStyle = colors[face_index];
  
      context.beginPath();
      face.forEach((vertex_index, index) => {
        // transformamos los vértices con la matriz de vista y proyección, realizando simplemente una multiplicación
        vertex = projectionViewMatrix.multiplyVector(vertices[vertex_index]);
  
        // transformamos los vértices a coordenadas de pantalla para dibujarlos
        vertex = imageTransform(canvas.width, canvas.height, vertex);
  
        if (index === 0) {
          context.moveTo(vertex.x, vertex.y);
        } else {
          context.lineTo(vertex.x, vertex.y);
        }
      });
      context.closePath();
      context.fill();
    });
  });