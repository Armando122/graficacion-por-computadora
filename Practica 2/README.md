### Práctica 2: Transformaciones 2D, vectores y matrices

Profesor: Joel Espinosa Longi
Ayudante: Jorge Barragán Argüero

Utilizando lo visto en la clase van a desarrollar las clases: `Vector3` y `Matrix3`, cada una de ellas definidas en su propio archivo javascript: `Vector3.js` y `Matrix3`.js`, respectivamente. Las clases a su vez estarán contenidas dentro del paquete CG.

A continuación se describen los métodos que cada clase contiene.

## Vector3
- constructor()
- static add(u, v)
- clone()
- static cross(u, v)
- static distance(u, v)
- static dot(u, v)
- static equals(u, v)
- static exactEquals(u, v)
- normalize()
- set(x, y, z)
- static squareDistance(u, v)
- zero()

## Matrix3
- constructor()
- static add(m1, m2)
- adjoint()
- clone()
- determinant()
- static equals(m1, m2)
- static exactEquals(m1, m2)
- identity()
- invert()
- static multiply(m1, m2)
- static multiplyScalar(m1, c)
- multiplyVector(v)
- static rotate(theta)
- static scale(sx, sy)
- set(a00, a01, a02, a10, a11, a12, a20, a21, a22)
- static subsctract(m1, m2)
- static translate(tx, ty)
- transpose()
