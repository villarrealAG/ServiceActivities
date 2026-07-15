// que son los arreglos? son una estructura de datos que nos permite almacenar muchos valores en una sola variable, estos valores pueden ser de cualquier tipo de dato, y se acceden mediante un indice, en js empieza en 0.

//Declaracion de un arreglo
let arreglo = [1,2,3]
console.log(arreglo)
//cita con indices
console.log(arreglo[0])
console.log(arreglo[1])
console.log(arreglo[2])
//modificar un valor del arreglo
arreglo[0]=10
console.log(arreglo)
// hay funciones en js que permiten modificar los arreglos de cierta manera, como push, pop, shift, unshift, splice, slice
// El push es una funcion que permite agregar un elemento al final del arreglo
arreglo.push(4)
console.log(arreglo)
// el pop es una funcion que permite eliminar el ultimo elemento del arreglo
arreglo.pop()
console.log(arreglo)
// El shift es una funcion que permite eliminar el primer elemento del arreglo
arreglo.shift()
console.log(arreglo)
// El unshift como es de intuir es una funcion que permite agregar un elemento al inicio del arreglo
arreglo.unshift(0)
console.log(arreglo)
//El splice es una funcion que permite eliminar o agregar elementos en cualquier posicion del arreglo, esta recibe 3 parametros,
// el primero es la posicion donde se va a eliminar o agregar, el segundo es el numero de elementos que se van a eliminar, y el tercero es el elemento 
// que se va a agregar , si no se agrega ningun elemento, solo elimina pero para eso mejor usar otros como pop y shift
arreglo.splice(1, 1,1,2,3,4)
console.log(arreglo)
//El slice es una funcion que permite crear un nuevo arreglo a partir de un arreglo existente, esta recibe 2 parametros, el primero es la posicion donde se va a empezar a copiar, y el segundo es la posicion donde se va a terminar de copiar
let nuevoArreglo = arreglo.slice(1,4)
console.log(nuevoArreglo)
// Se puede recorrer un arreglo con un for, un for of, un while, un do while, y con el metodo forEach
// for
for(let i=0; i<arreglo.length; i++){
    console.log(arreglo[i])
}
// for of
for(let valorP of arreglo){
    console.log(valorP)
}
// while
let i = 0;  
while(i<arreglo.length){
    console.log(arreglo[i])
    i++
}
// do while
let j = 0; 
do{
    console.log(arreglo[j])
    j++
}while(j<arreglo.length)

// forEach
arreglo.forEach(function(valorP){
    console.log(valorP)
})
//ahora vamos a crear una lista de de numeros grandes aleatorios, y vamos a recorrerla con un forEach, y vamos a sumar todos los valores del arreglo, y vamos a mostrar el resultado en consola
let numerosGrandes = []
for(let i=0; i<10; i++){
    numerosGrandes.push(Math.floor(Math.random()*10))
}
let suma = 0;
numerosGrandes.forEach(function(valor){
    suma += valor;
})
console.log(suma)
// ahora a contar cuantas veces se repite un numero en el arreglo, en este caso vamos a contar cuantas veces se repite el numero 5
let contador = 0;
numerosGrandes.forEach(function(valor){
    if(valor === 5){
        contador++
    }
})
console.log(numerosGrandes)
console.log(contador)      
// esto cueneta como buscar un valor en un arreglo, pero si queremos buscar un valor y obtener su posicion, podemos usar el metodo indexOf
let indices = [];
let element = 5;
let idx = numerosGrandes.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = numerosGrandes.indexOf(element, idx+1);
}
console.log(indices);

