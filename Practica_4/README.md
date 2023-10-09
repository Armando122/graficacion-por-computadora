## Práctica 4: Objetos geométricos 3D con WebGL

Alumno: Armando Ramírez González

Profesor: Joel Espinosa Longi, Ayudante: Jorge Barragán Argüero

La práctica consiste en implementar las figuras geométricas (prisma, tetraedro, octaedro, dodecaedro, icosaedro, esfera, cono, cilindro y
toro) para ser utilizadas en WebGL. Se creó un archivo de javascript para cada una de las figuras:
- `PrismaRectangular.js`
- `Tetraedro.js`
- `Octaedro.js`
- `Dodecaedro.js`
- `Icosaedro.js`
- `Esfera.js`
- `Cono.js`
- `Cilindro.js`
- `Toro.js`

### Métodos
- Cada clase cuenta con un método cosntructor que recibe:
  - Una referencia al contexto de render de WebGL
  - El color de la figura como un arreglo de cuatro elementos `[R, G, B, A]` donde `A=1` es un color opaco y `A=0` es un color transparente
  - Lo parámetro de altura, largo, ancho, radio, según se requieran para construir cada figura
  - La posición inicial del objeto, la cual será una matriz de 4x4

- Cada objeto cuenta con un método `draw` para dibujarse en WebGL
- Cada objeto cuenta con un método `drawWireframe` para dibujarse en modo wireframe.

### Función
El archivo `main.js` dibuja cada una de las figuras implementadas y se muestran en el navegador
![Captura desde 2023-10-08 19-25-37](https://github.com/Armando122/graficacion-por-computadora/assets/53309070/38a4b116-6572-45ce-b441-0302188838cd)

También se cuenta con un checkbox `wireframe` que permite ver el modo wireframe de cada figura construida
![image](https://github.com/Armando122/graficacion-por-computadora/assets/53309070/5520cd66-4341-4451-b495-90fb10135d34)
