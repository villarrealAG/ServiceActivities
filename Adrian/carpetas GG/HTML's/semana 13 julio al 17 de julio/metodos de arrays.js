//Recorrer sin escribir el bucle a mano

/*/
ForEach:
foreach() es un metodo que nos permite recorrer un array sin 
necesidad de escribir el bucle a mano, este metodo recibe una 
funcion como parametro, la cual se ejecuta por cada elemento del 
array. La funcion recibe tres parametros: el elemento actual, el 
indice del elemento y el array completo.

forEach() ejecuta la funcion callback una vez por cada elemento
presente en el array en orden ascendente. No es invocado para 
elementos que han sido eliminados o que no han sido asignados.

sintaxis: array.forEach(function callback(currentValue, index, array) {
    //tu iterador
}[, thisArg]);

Parametros:
callback:Funcion a ejecutar por cada elemento, que recibe tres 
elementos:
    currentValue: El elemento actual siendo procesado en el array.
    index(opcional): El indice del elemento actual siendo 
    procesado en el array.
    array(opcional): El vector en el que forEach() esta siendo 
    aplicado.
thisArg(opcional): Valor que se usara como this cuando se ejecute 
el callback.

forEach() ejecuta la funcion callback una vez por cada elemento
del array; a diferencia de map() o reduce() este siempre devuelve
el valor undefined y no es encadenable.

forEach() no muta/modifica el array desde el que es llamado(aunque
callback, si se invoca, podria hacerlo).)
/*/
const array1 = ["a", "b", "c"];

array1.forEach((element) => console.log(element));

//Ejemplos
//imprimir el contenido de un array con forEach
function logArraysElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}
[3,5, , 9].forEach(logArraysElements);

//Usando thisArg
function Counter() {
    this.sum = 0;
    this.count = 0;
}
/*/
.prototype:
Sirve para compartir metodos y propiedades entre multiples objetos
/*/
Counter.prototype.add = function(array) {
    array.forEach(function (entry) {
        this.sum += entry;
        ++this.count;
    }, this);
}

var obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count);
console.log(obj.sum);

//funcion que copia objetos
function copy(o) {
    var copy = Object.create(Object.getPrototypeOf(o));
    var propNames = Object.getOwnPropertyNames(o);

    propNames.forEach(function(name) {
        var desc = Object.getOwnPropertyDescriptor(o, name);
        Object.defineProperty(copy, name, desc);
    })

    return copy;
}

var o1 = {a: 1, b: 2};
console.log(o1);
var o2 = copy(o1);
console.log(o2);

/*/
Si el array se modifica durante la iteracion, otros elementos 
pueden ser omitidos.
/*/

var words = ["uno", "dos", "tres", "cuatro"];
words.forEach(function(word){
    console.log(word)
    if (word === "dos") {
        words.shift();
    }
})

/*/
Map().

map llama a la función callback provista una vez por elemento de 
un array, en orden, y construye un nuevo array con los resultados.
 callback se invoca sólo para los índices del array que tienen 
 valores asignados; no se invoca en los índices que han sido 
 borrados o a los que no se ha asignado valor.

Sintaxis
var nuevo_array = arr.map(function callback(currentValue, index, array) {
    // Elemento devuelto de nuevo_array
}[, thisArg])

Parámetros
callback: Función que producirá un elemento del nuevo array, 
recibe tres argumentos:
    currentValue: El elemento actual del array que se está 
    procesando.
    index: El índice del elemento actual dentro del array.
    array: El array sobre el que se llama map.
thisArg: Opcional. Valor a usar como this al ejecutar callback.
/*/

//Ejemplos
var numeros = [1,4,9]
var raices = numeros.map(Math.sqrt);
console.log(raices)

//Usando map para dar un nuevo formato a los objetos de un array
var kvArray = [
    {clave: 1, valor: 10},
    {clave:  2, valor: 20},
    {clave: 3, valor: 30}
]
var reformattedArray = kvArray.map(function(obj){
    var rObj = {}
    rObj[obj.clave] = obj.valor
    return rObj
})

console.log(reformattedArray)
console.log(kvArray)

/*/
filter()

filter() llama a la función callback sobre cada elemento del 
array, y construye un nuevo array con todos los valores para los 
cuales callback devuelve un valor verdadero. callback es invocada 
sólo para índices del array que tengan un valor asignado. No se 
invoca sobre índices que hayan sido borrados o a los que no se 
les haya asignado algún valor. Los elementos del array que no 
cumplan la condición callback simplemente los salta, y no son 
incluidos en el nuevo array.

sintaxis
var newArray = arr.filter(callback(currentValue[, index[, array]])
[, thisArg])

Parámetros
callback: Función que comprueba cada elemento del array para ver 
si cumple la condición (también llamada predicado). Retorna true 
si el elemento la cumple o en caso contrario retornará false. 
Acepta tres parámetros:
    currentValue: El elemento actual del array que está siendo 
    procesado.
    index (Opcional): El índice del elemento actual del array que 
    está siendo procesado.
    array Opcional: El array sobre el que se ha llamado filter.
thisArg Opcional (Opcional): Valor a utilizar como this cuando se 
ejecuta callback.
/*/

//Ejemplo 
function esSuficientementeGrande(elemento) {
  return elemento >= 10;
}
var filtrados = [12, 5, 8, 130, 44].filter(esSuficientementeGrande);
console.log(filtrados)