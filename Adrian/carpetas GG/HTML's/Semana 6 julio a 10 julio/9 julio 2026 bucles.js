/*/
Uso de for, while, foreach

Cuando usar un while o for/foreach: Usarlo siempre que el bucle este relacionado con una coleccion o array
Cuando usar un do while y while: Cuando no va haber una coleccion o array y no requiere un numero determinado de iteraciones, y se necesita que el cuerpo del bucle se ejecute al menos una vez
Bucle while: Se usa cuando la condicion no va haber una coleccion/array y no requiere un numero determinado de iteraciones 
Bucle do while: Se usa cuando la condicion no va haber una coleccion/array y no requiere un numero determinado de iteraciones, y se necesita que el cuerpo del bucle se ejecute al menos una vez
Cuando usar un for o foreach: Usarlo siempre que el bucle este relacionado con una coleccion o array
Bucle for: Cuando se quiere iterar un rango de veces y no hay una coleccion, o si se necesita de la coleccion dentro del cuerpo del bucle
Bucle foreach: Cuando no se requiere el uso de indices
/*/

//sintaxis de while
let num = 0;

while (num <= 5) {
    console.log(num);
    num++;
}

//sintaxis de do while
let num2 = 0;
do {
    console.log(num2);
    num2++;
} while (num2 <= 5);

//sintaxis de for
for (let i = 0; i <= 5; i++) {
    console.log(i);
}

//sintaxis de forEach
const array = [0, 1, 2, 3, 4, 5];
array.forEach(function (num) {
    console.log(num);
});

/*/
¿Que es break, continue, iterar?
Break: Es una instruccion que se usa para salir de un bucle
Continue: Es una instruccion que se usa para saltar una iteracion
Iterar: Es el proceso de repetir un bloque de codigo
/*/

//Ejercicios

//secuencia de numeros pares
for (let j = 0; j <= 20; j++) {
    if (j % 2 == 0) {
        console.log(j);
    }
}

let numero = 0
while (numero <= 20) {
    if (numero % 2 === 0) {
        console.log(numero)
    }
    numero++;
}
let numero2 = 0
do {
    if (numero2 % 2 === 0) {
        console.log(numero2)
    }
    numero2++;
} while (numero2 <= 20)

//cuenta regresiva del 10 al 0
for (let q = 10; q >= 0; q--) {
    console.log(q)
}

let numeroR = 10
while (numeroR >= 0) {
    console.log(numeroR)
    numeroR--
}

//suma de valores de 1 al 100
let suma = 0
for (let l = 1; l <= 100; l++) {
    suma += l
}
console.log(suma)

//tabla de multi

let tabla = 7
for (let p = 1; p <= 10; p++) {
    console.log(`${tabla}x${p}=${tabla * p} `)
}

//Contar elementos 1 al 100 son divisibles entre 7

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
numeros.forEach(function (numero) {
    if (numero % 7 == 0) {
        console.log(numero)
    }
})

//Bucle infinito
//Bucle infinito en while
/*/
while (true) {
    console.log("Hola");
    continue
}
/*/
//Porque es un bucle infinito en while
//Porque la condicion del bucle es siempre verdadera
//no hay un incremento o decremento
//el continue hace que se repita el bucle
//Como lo solucionaria: 
//Poniendo break; dentro del bucle
//o haciendo que la condicion del bucle sea falsa
/*/ 


//Bucle infinito en for
/*/
for (; ;) {
    console.log("Hola")
    continue
}
/*/
//Porque es un bucle infinito en for
//Porque la condicion del bucle es siempre verdadera
//no hay un incremento o decremento
//el continue hace que se repita el bucle
//Como lo solucionaria:
//Poniendo break; dentro del bucle
//o haciendo que la condicion del bucle sea falsa
