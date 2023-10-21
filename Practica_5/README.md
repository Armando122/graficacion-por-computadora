## Práctica 5: Objetos Geométricos con relfexión difusa y especular

Alumno: Armando Ramírez González

Profesor: Joel Espinosa Longi

Ayudante: Jorge Barragán Argüero

### Desarrollo
Usando como base el código desarrollado en la práctica 4, correspondiente a las figuras geométricas: `PrismaRectangular.js`, `Tetraedro.js`, `Octaedro.js`, `Dodecaedro.js`,
`Icosaedro.js`, `Esfera.js`, `Cono.js`, `Cilindro.js` y `Toro.js`; se incorporó el uso de shaders para mostrar la reflexión difusa y especular.

Se agregó un checkbox al documento `index.html` de tal manera que cuando esté marcado se dibujen las figuras con reflexión difusa y especular usando el modelo de iluminación de Phong, 
en caso de que esté desactivado solo se muestra la reflexión difusa.

Para esta práctica se utilizó una luz en la posición `(0, 3, 0)`, con un color `[1, 1, 1]` y con un factor de brillo especular de `5.0`

Dibujado de figuras usando reflexión difusa

![Captura desde 2023-10-21 14-38-06](https://github.com/Armando122/graficacion-por-computadora/assets/53309070/6724c1f1-cc0a-4cf3-ab6f-51d58b295d30)

Dibujado de figuras usando relfexión difusa y especular con modelo de Phong

![Captura desde 2023-10-21 14-38-16](https://github.com/Armando122/graficacion-por-computadora/assets/53309070/21e78661-2125-4795-9ac7-aff99a689a05)


### Cambios
Se adaptó el checbox para dibujado en modo wireframe para cuando este se active desactive el botón para dubjado especular.

![Captura desde 2023-10-21 14-39-38](https://github.com/Armando122/graficacion-por-computadora/assets/53309070/5a1a77b6-605e-41bf-b8f7-138d86c8e1a8)

![Captura desde 2023-10-21 14-39-30](https://github.com/Armando122/graficacion-por-computadora/assets/53309070/e8b3c624-904c-40d4-be0c-2ed2729fcead)

