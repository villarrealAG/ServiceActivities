/*/
¿Que es un array?

Objeto similar a una lista cuyo proposito es proporcionar metodos para efectuar operaciones de recorrido y de mutacion.
La longitud como el tipo de los elementos que contiene un array son variables. Dado que la longitud de un array puede cambiar 
en cualquier momento, y los datos se pueden almaacenar en ubicaciones no contiguas(contiguas: adyacentes, que estan una al 
lado de la otra) no hay garantia de que los array de JS sean densos.
/*/

/*/
Indeces.

Cada elemento de un array tiene un indice, que es un numero entero que indica la posicion del elemento dentro del array al cual se
le conoce como indice.

En la mayoria de lenguajes de programacion, los indices de los arrays siempre empiezan en 0, es decir, el primer elemento de un array 
tiene un indice de 0, el segundo elemento tiene un indice de 1, y asi sucesivamente.
/*/

/*/
Propiedad length.

La propiedad length de un array devuelve el numero de elementos que contiene el array. Esta propiedad es dinamica, es decir, 
si se agregan o eliminan elementos del array, la propiedad length se actualiza automaticamente para reflejar el nuevo tamaño del array.
/*/

/*/
Agregar y quitar elementos (push y pop).

Los arrays al ser dinamicos permiten agregar y quitar elementos de manera sencilla, para ello se utilizan los metodos push y pop.

push: Agrega uno o mas elementos al final de un array y devuelve la nueva longitud del array.

pop: Elimina el ultimo elemento de un array y lo devuelve. Esta propiedad cambia la longitud del array.
/*/

/*/
Recorrer un array.

Para recorrer un array se puede utilizar un bucle for, que permite iterar sobre cada elemento del array y realizar operaciones con ellos. 
Tambien se pueden utilizar otros metodos como forEach, map, filter, entre otros, que proporcionan una forma mas funcional de trabajar con arrays.

Iteracion con for: Este metodo utiliza los indices matematicamente. Se crea un contador (usalmente llamado i) que 
empieza en 0 y va sumando 1 hasta llegal final del array (array.legth). En cada iteracion se accede al elemento del array utilizando el indice i.
/*/

// Crear un array
let frutas = ["Manzana", "Banana", "Cereza", "Fresa"];

// Obtener la longitud del array
console.log(frutas.length)

//acceder a un elemento del array
console.log(frutas[0]); // Manzana
console.log(frutas[1]); // Banana
console.log(frutas[2]); // Cereza
console.log(frutas[3]); // Fresa

// Agregar un elemento al final del array
frutas.push("Mango");
console.log(frutas); // ["Manzana", "Banana", "Cereza", "Fresa", "Mango"]

// Eliminar el ultimo elemento del array
frutas.pop();
console.log(frutas); // ["Manzana", "Banana", "Cereza", "Fresa"]

// Recorrer el array con un bucle for
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}

for(let j = 0; j < frutas.length; j++){
    console.log(`El indice ${j} es la fruta: ${frutas[j]}`)
}

//Practica

// Crear un array de tareas y un array de numeros
let tareas = [ "Estudiar", "Hacer ejercicio", "Leer un libro", "Cocinar", "Limpiar la casa" ];
let numeros = [3, 7, 2, 9, 5, 4];

// Recorrer el array de tareas con un bucle for
for(let l = 0; l < tareas.length; l++){
    console.log(tareas[l]);
}

//sumar elementos
let suma = 0;
for(let n = 0; n < numeros.length; n++){
    suma += numeros[n];
}
console.log(`La suma de los numeros es: ${suma}`);

//Contar elementos
//Contar el total de elemtos
console.log(tareas.length);
console.log(numeros.length);
//Contar con una condicion
let contador = 0;
for(let c = 0; c < numeros.length; c++){
    if(numeros[c] > 5) {
        contador++;
    }
}
console.log(contador);

//Buscar un elemento
let buscar = "";
for(let b = 0; b < tareas.length; b++){
    if(tareas[b] === "Cocinar") {
        buscar = tareas[b];
        break;
    }
}
console.log(buscar);
console.log(numeros[3])

frutas[4] = "Pera";
console.log(frutas[4]);
console.log(Object.keys(frutas));