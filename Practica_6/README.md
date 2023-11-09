## Práctica 6: Objetos geométricos con texturas

Alumno: Armando Ramírez González

Profesor: Joel Espinosa Longi

Ayudante: Jorge Barragán Argüero

### Desarrollo
En la práctica se agregaron coordenadas de textura para cada una de las figuras desarrolladas previamente (`PrismaRectangular.js`, `Tetraedro.js`, `Octaedro.js`, `Dodecaedro.js`, `Icosaedro.js`,
`Esfera.js`, `Cono.js`, `Cilindro.js` y `Toro.js`)

Las imágenes de textura fueron obtenidas de:
- https://ambientcg.com

También se implementó la clase `TrackballCamera.js` que permite observar las figuras desde otros ángulos utilizando el mouse.

### Ejecución
Para poder ver las imágenes con las texturas es necesario ejecutar el archivo index en un servidor, para ello se montó un servidor local en python3 utilizando el comando:
```
python3 -m http.server
```

Una vez montado se ingresa al puerto donde está montando el servidor y nos permitirá ver las figuras con las texturas implementadas.
