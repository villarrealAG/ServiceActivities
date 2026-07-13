// ¿Que es una funcino?
/*/
Una funcion es un bloque de codigo que se puede reutilizar y ejecutar cuando sea necesario. Se define con la palabra clave "function" seguida de un nombre, paréntesis y llaves que contienen el código a ejecutar. Las funciones pueden recibir parámetros y devolver valores. 
Le damos un nombre a la funcion para poder llamarla y ejecutarla en cualquier parte del codigo. Las funciones son fundamentales en la programación, ya que permiten organizar el código, evitar la repetición y mejorar la legibilidad.

Como es una funcion 
Definicion: Es el proceso de crear una funcion, incluye escrbir todo el bloque de codigo: nombre, paramaetros y instrucciones que ejecutar.
Cabeza: Primera linea de la definicion. Actua como un DNI de la funcion, especificando su nombre y los parametros que recibe.
LLamada: Es el proceso de ejecutar la funcion, se hace escribiendo su nombre seguido de paréntesis y pasando los argumentos necesarios.

Reutilizacion: Una vez definida, una funcion puede ser llamada y ejecutada en cualquier parte del codigo, lo que permite reutilizar el mismo bloque de codigo sin tener que escribirlo nuevamente.
Organizacion: Las funciones ayudan a organizar el codigo en bloques logicos, facilitando la comprension y el mantenimiento del mismo.
Flexibilidad: Las funciones pueden recibir diferentes argumentos y devolver distintos valores, lo que las hace muy flexibles y adaptables a diferentes situaciones.
/*/

/*/
Declaracion paramaetros, return, llamada

La sintaxis de la definición de una función:

tipo_de_dato  nombre_funcion (tipo_de_argumento argumento1, tipo_de_argumento argumento2, . . . , tipo_de_argumento argumento_n)

{

    definición de variables locales;

     sentencias;

     return;

}

donde:

tipo_de_dato. Tipo de dato devuelto por la función.
nombre_funcion. El nombre con que se identifica la función para mandarla llamar.
tipo_de_argumento. Listado de variables, que conforman los datos que se pasaran a la función.
sentencias. Estructura de código que ejecutara una tarea especifica.
El tipo de dato de retorno puede ser omitido, por default devuelve un entero.
/*/
function suma(x, y){
    let suma = x + y;
    return suma;
}

console.log(suma(5, 10));

/*/
Scope(Alcance): Variable Local vs Global

Scope; Se puede definir como el alcance de una variable, es decir, 
el contexto en el que una variable es accesible y puede ser utilizada. 
El scope determina la visibilidad y la vida útil de una variable dentro del código.

Variable local: Es aquella que se declara dentro de una funcion y solo puede ser utilizada dentro de esa funcion. No es accesible desde fuera de la funcion.
Variable global: Es aquella que se declara fuera de cualquier funcion y puede ser utilizada en cualquier parte del codigo, incluyendo dentro de las funciones.
/*/

//Scope Local
function platzi(){
    const soyEstudiante = true;
    console.log(soyEstudiante);
}
platzi();
// console.log(soyEstudiante); // Esto generara un error, ya que soyEstudiante es una variable local y no es accesible fuera de la funcion platzi.

//Scope global
const soyEstudiante2 = true;
function platzi2(){
    console.log(soyEstudiante2);
}
platzi2();
console.log(soyEstudiante2); 

/*/
Arrow functions.

Una expresion de funcion flecha es una alternativa compacta a una expresion de funcion tradicional, pero es limitada y no puede ser utilizada en todos los contextos. Las funciones flecha son anonimas y no tienen su propio "this", "arguments", "super" o "new.target". Son ideales para funciones cortas y callbacks.
Sintaxis de una funcion flecha:

const nombreFuncion = (parametros) => {
    // cuerpo de la funcion
};

Cuando usarlo:
- Cuando necesitas una función corta y simple.
- Como callback para métodos como `map()`, `filter()`, o `forEach()`.

Diferencias entre funciones tradicionales y flecha:
Funciones tradicionales:
- Tienen su propio contexto de `this`.
- Pueden ser utilizadas como constructores con `new`.
- Pueden tener un nombre.
Funciones flecha:
- No tienen su propio contexto de `this`, heredan el de su entorno.
- No pueden ser utilizadas como constructores.
- Son anónimas, aunque pueden ser asignadas a variables.

Ejemplo de una funcion flecha que suma dos numeros:
/*/
const suma2 = (x, y) => {
    return x + y;
}
console.log(suma2(5, 16));

//Comparacion de funciones tradicionales con funciones flecha
/*/
// Función tradicional
function (a, b){
  return a + b + 100;
}

// Función flecha
(a, b) => a + b + 100;

// Función tradicional (sin argumentos)
let a = 4;
let b = 2;
function (){
  return a + b + 100;
}

// Función flecha (sin argumentos)
let a = 4;
let b = 2;
() => a + b + 100;
/*/
// Función tradicional
function bob1(a) {
  return a + 100;
}
console.log(bob1(5)); 

// Función flecha
let bob2 = (a) => a + 100;
console.log(bob2(5)); 

//Practica:
// Usamos una función tradicional
function clasificarNumero(numero) {
  if (numero > 0) {
    return `El número ${numero} es positivo.`; // Usando template literals de tu temario
  } else if (numero < 0) {
    return `El número ${numero} es negativo.`;
  } else {
    return "El número es cero.";
  }
}

// Pruebas (Llamadas a la función)
console.log(clasificarNumero(5));   // Imprime: El número 5 es positivo.
console.log(clasificarNumero(-12)); // Imprime: El número -12 es negativo.
console.log(clasificarNumero(0));   // Imprime: El número es cero.


// Arrow function que recibe el precio y el tipo de cliente
const calcularDescuento = (precioBase, tipoCliente) => {
  let descuento = 0;

  switch (tipoCliente) {
    case "VIP":
      descuento = 0.20; // 20% de descuento
      break;
    case "FRECUENTE":
      descuento = 0.10; // 10% de descuento
      break;
    default:
      descuento = 0; // Sin descuento
  }

  const total = precioBase - (precioBase * descuento);
  return total;
};

// Pruebas
console.log("Total cliente VIP: $" + calcularDescuento(1000, "VIP")); // $800
console.log("Total cliente normal: $" + calcularDescuento(1000, "NUEVO")); // $1000

// Retorna un booleano (true o false) dependiendo de si es mayor de 18
const esMayorDeEdad = (edad) => edad >= 18 ? true : false;

// O incluso más simple (ya que la condición en sí misma devuelve true/false):
// const esMayorDeEdad = (edad) => edad >= 18;

if (esMayorDeEdad(21)) {
    console.log("Puedes entrar al sistema.");
} else {
    console.log("No tienes acceso.");
}

function imprimirTabla(numero) {
  console.log(`--- Tabla del ${numero} ---`);
  
  // La variable 'i' tiene un Scope (alcance) local dentro de este bucle for
  for (let i = 1; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
  }
}

// Ahora puedes imprimir cualquier tabla fácilmente:
imprimirTabla(7); 
// imprimirTabla(3);
