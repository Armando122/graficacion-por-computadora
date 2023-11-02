var CG = (function(CG) {
    class TrackballCamera {
        /**
         * @param {Vector3} pos Posición de la camára
         * @param {Vector3} coi Centro de Interés
         * @param {Vector3} up Vector hacia arriba
         */
        constructor (pos = new CG.Vector3(0,0,1), coi = new CG.Vector3(0,0,0), up = new CG.Vector3(0,1,0)) {
            this.pos = pos;
            this.coi = coi;
            this.up = up;

            // Parámetros para construir esfera de la vista construyendo una esfera de radio
            // igual a la distancia entre la camara y el punto de interés
            this.radius = CG.Vector3.distance(this.pos, this.coi);

            let direction = CG.Vector3.substract(this.pos, this.coi);
            // ancho
            this.theta = Math.atan2(direction.z, direction.x);
            // altura
            this.phi = Math.atan2(direction.y, direction.z);
        }

        /**
         * Función para obtener la matriz de la vista
         */
        getMatrix() {
            return CG.Matrix4.lookAt(this.pos, this.coi, this.up);
        }

        /**
         * Función para obtener el movimiento final que tendrá la camára
         * después de una actualización.
         */
        finishMove(init_mouse, current_mouse) {
            let angles = this.getAngles(init_mouse, current_mouse);

            this.theta = angles.theta;
            this.phi = angles.phi;
        }

        /**
         * Obtener una rotación
         */
        rotate(init_mouse, current_mouse) {
            let angles = this.getAngles(init_mouse, current_mouse);

            this.pos.set(
                this.radius * Math.cos(angles.phi) * Math.cos(angles.theta),
                this.radius * Math.sin(angles.phi),
                this.radius * Math.cos(angles.phi) * Math.sin(angles.theta)
            );
        }

        /**
         * Función para calcular los ángulos theta y phi de la esfera de visión
         */
        getAngles(init_mouse, current_mouse) {
            let theta = this.theta + (current_mouse.x - init_mouse.x)/100;
            let phi = Math.min(
                Math.max(
                    this.phi + (current_mouse.y - init_mouse.y)/100,
                    -Math.PI/2),
                Math.PI/2
                );

            return {
                theta: theta, 
                phi: phi
            };
        }

        /**
         * Función que modifica los parametros de dibujado relacionados con la camára
         */
        setDrawParams(dibujado, val_esp, coef_amb, mat, valor_alpha) {
            this.dibujado = dibujado;
            this.val_esp = val_esp;
            this.coef_amb = coef_amb;
            this.mat = mat;
            this.valor_alpha = valor_alpha;
        }

        /**
         * Función que registra los eventos que ocurren con el mouse
         */
        registerMouseEvents(canvas/*, draw_callback*/) {
            let initial_mouse_position = null;

            canvas.addEventListener("mousedown", (evt) => {
                initial_mouse_position = CG.getMousePositionInElement(evt, canvas);
                window.addEventListener("mousemove", mousemove);
            });

            window.addEventListener("mouseup", (evt) => {
                if (initial_mouse_position != null) {
                    this.finishMove(initial_mouse_position, CG.getMousePositionInElement(evt, canvas));
                    window.removeEventListener("mousemove", mousemove);
                }
                initial_mouse_position = null;
            });

            let mousemove = (evt) => {
                this.rotate(initial_mouse_position, CG.getMousePositionInElement(evt, canvas));
                //draw_callback(this.val_esp, this.coef_amb, this.mat, this.valor_alpha);
                let dib = this.dibujado;
                dib(this.val_esp, this.coef_amb, this.mat, this.valor_alpha);
            }

            /*window.addEventListener("keydown", (evt) => {
                if (evt.key == "ArrowUp") {
                    this.pos = new CG.Vector3(this.pos.x, this.pos.y+0.5, this.pos.z);
                    this.coi = new CG.Vector3(this.coi.x, this.coi.y+0.5, this.coi.z);

                    this.radius = CG.Vector3.distance(this.pos, this.coi);
                    let direction = CG.Vector3.substract(this.pos, this.coi);
                    this.theta = Math.atan2(direction.z, direction.x);
                    this.phi = Math.atan2(direction.y, direction.z);
                    window.addEventListener("keydown", keymove);
                }
                if (evt.key == "ArrowDown") {
                    this.pos = new CG.Vector3(this.pos.x, this.pos.y-0.5, this.pos.z);
                    this.coi = new CG.Vector3(this.coi.x, this.coi.y-0.5, this.coi.z);

                    // Parámetros para construir esfera de la vista construyendo una esfera de radio
                    // igual a la distancia entre la camara y el punto de interés
                    this.radius = CG.Vector3.distance(this.pos, this.coi);

                    let direction = CG.Vector3.substract(this.pos, this.coi);
                    // ancho
                    this.theta = Math.atan2(direction.z, direction.x);
                    // altura
                    this.phi = Math.atan2(direction.y, direction.z);
                    window.addEventListener("keydown", keymove);  
                }
                if (evt.key == "ArrowLeft") {
                    this.pos = new CG.Vector3(this.pos.x-0.5, this.pos.y, this.pos.z);
                    this.coi = new CG.Vector3(this.coi.x-0.5, this.coi.y, this.coi.z);

                    // Parámetros para construir esfera de la vista construyendo una esfera de radio
                    // igual a la distancia entre la camara y el punto de interés
                    this.radius = CG.Vector3.distance(this.pos, this.coi);

                    let direction = CG.Vector3.substract(this.pos, this.coi);
                    // ancho
                    this.theta = Math.atan2(direction.z, direction.x);
                    // altura
                    this.phi = Math.atan2(direction.y, direction.z);
                    window.addEventListener("keydown", keymove);   
                }
                if (evt.key == "ArrowRight") {
                    this.pos = new CG.Vector3(this.pos.x+0.5, this.pos.y, this.pos.z);
                    this.coi = new CG.Vector3(this.coi.x+0.5, this.coi.y, this.coi.z);

                    // Parámetros para construir esfera de la vista construyendo una esfera de radio
                    // igual a la distancia entre la camara y el punto de interés
                    this.radius = CG.Vector3.distance(this.pos, this.coi);

                    let direction = CG.Vector3.substract(this.pos, this.coi);
                    // ancho
                    this.theta = Math.atan2(direction.z, direction.x);
                    // altura
                    this.phi = Math.atan2(direction.y, direction.z);
                    window.addEventListener("keydown", keymove); 
                }
              });

              window.addEventListener("keyup", (evt) => {
                window.removeEventListener("keydown", keymove);
              });

              let keymove = (evt) => {
                let dib = this.dibujado;
                dib(this.val_esp, this.coef_amb, this.mat, this.valor_alpha);
              }*/
        }
    }

    CG.TrackballCamera = TrackballCamera;
    return CG;
}(CG || {}));