window.addEventListener("load", function() {
    let canvas = document.getElementById("the_canvas");
    let context = canvas.getContext("2d");
    
    context.fillStyle = "#2c3e50";
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    let tmp_v;

    let m1 = new CG.Matrix3(1,1,2, 2,4,5, 2,7,3);
    let m2 = new CG.Matrix3(1,1,1, 1,1,1, 1,1,1);
    let dum = new CG.Matrix3(1,1,2, 2,4,5, 2,7,3);
    console.log(CG.Matrix3.exactEquals(m1,m2));
  
    let obj = {
      vertices : [
        new CG.Vector3(50, 50, 1),
        new CG.Vector3(0, -80, 1),
        new CG.Vector3(-100, 50, 1)
      ]
    }
  
    context.fillStyle = "#2ecc71";
    context.beginPath();
    context.moveTo(obj.vertices[0].x, obj.vertices[0].y);
    for (let i=1; i<obj.vertices.length; i++) {
      context.lineTo(obj.vertices[i].x, obj.vertices[i].y);
    }
    context.closePath();
    context.fill();
  
    let translateM = CG.Matrix3.translate(200, 300);
    context.fillStyle = "#3498db";
    context.beginPath();
    tmp_v = translateM.multiplyVector(obj.vertices[0]);
    context.moveTo(tmp_v.x, tmp_v.y);
    for (let i=1; i<obj.vertices.length; i++) {
      tmp_v = translateM.multiplyVector(obj.vertices[i]);
      context.lineTo(tmp_v.x, tmp_v.y);
    }
    context.closePath();
    context.fill();
  
    let t2M = CG.Matrix3.translate(500, 200);
    let scaleM = CG.Matrix3.scale(3, -2);
    context.fillStyle = "#f1c40f";
    context.beginPath();
    tmp_v = t2M.multiplyVector(scaleM.multiplyVector(obj.vertices[0]));
    context.moveTo(tmp_v.x, tmp_v.y);
    for (let i=1; i<obj.vertices.length; i++) {
      tmp_v = t2M.multiplyVector(scaleM.multiplyVector(obj.vertices[i]));
      context.lineTo(tmp_v.x, tmp_v.y);
    }
    context.closePath();
    context.fill();
  
    let t3M = CG.Matrix3.translate(700, 500);
    let rotateM = CG.Matrix3.rotate(Math.PI/8);
    context.fillStyle = "#ecf0f1";
    context.beginPath();
    tmp_v = t3M.multiplyVector(rotateM.multiplyVector(obj.vertices[0]));
    context.moveTo(tmp_v.x, tmp_v.y);
    for (let i=1; i<obj.vertices.length; i++) {
      tmp_v = t3M.multiplyVector(rotateM.multiplyVector(obj.vertices[i]));
      context.lineTo(tmp_v.x, tmp_v.y);
    }
    context.closePath();
    context.fill();
  });