// Ahora voy a hacer la creacion de objetos, que son una forma de agrupar datos y funciones relacionadas en una sola "entidad". Los objetos se crean usando llaves {} y se pueden acceder a sus propiedades usando el operador punto .
// Aqui creo un objeto llamado persona con propiedades nombre, edad y una funcion saludar
var persona = {
    nombre: "Juan", edad: 30,
    saludar: function () {
        console.log("Hola, mi nombre es " + this.nombre + " y tengo " + this.edad + " años.");
    }
}
//Hay varias formas de acceder a las propiedades de un objeto, una es usando el operador punto, y otra es usando corchetes []
let test=persona.nombre
//console.log(test)
//La segunda forma se tiene que pasar la propiedad como string
let test2=persona["nombre"]
//console.log(test2)
//tambien se puede actualizar datos de un objeto e igualmente se puede agregar nuevas propiedad es del objeto, ambas sintaxis son muy parecidas
persona.CosaFavorita="Pizza"
//Aqui agregamos una nueva propiedad
//console.log(persona.CosaFavorita)
//y para editarla es de la siguiente manera
persona.CosaFavorita="Helado"
//console.log(persona.CosaFavorita)

// Ahora haremos un ejemplo de una lista de objetos en un array que contenera una lista de 10 alumnos
var alumnos = [
    { nombre: "Agus", edad: 22 },
    { nombre: "Antonela", edad: 45 },
    { nombre: "Messi", edad: 66 },
    { nombre: "Jesus", edad: 64 },
    { nombre: "De nasaret", edad: 34 },
    { nombre: "Adrianeta", edad: 18 },
    { nombre: "Im in love with the coco", edad: 22 },
]
// Ahora haremos un bucle en el que añadiremos una nueva propiedad a cada objeto del array, que sera la propiedad "promedio" y le asignaremos que sera un valor aleatorio del 1 al 10
for (let i = 0; i < alumnos.length; i++) {
    alumnos[i].promedio = Math.floor(Math.random() * 10) + 1;
}
 
// Se puede recorrer tambien el arreglo para mostrar los datos de cada alumno, y se puede hacer con un bucle for o con un forEach
console.log("==================")
console.log("TODOS LOS ALUMNOS: ")
alumnos.forEach(function (alumno) {
    console.log("Nombre: " + alumno.nombre + ", Edad: " + alumno.edad + ", Promedio: " + alumno.promedio);
});
// Filtrar resultados funciona tambien, se pueden filtrar los alumnos que tengan un promedio menor a 5
var alumnosReprobados = alumnos.filter(function (alumno) {
    return alumno.promedio < 5;
});
console.log("==================")
console.log("ALUMNOS REPROBADOS:     ");
alumnosReprobados.forEach(function (alumno) {
    console.log("Nombre: " + alumno.nombre +", Promedio: "+ alumno.promedio);
})

// Se puede hacer el filtrado de otra manera, por ejemplo, se pueden filtrar los alumnos que tengan una edad mayor a 18
var alumnosMayores = alumnos.filter(function (alumno) {
    return alumno.edad <20;
});
console.log("===================================")
console.log("ALUMNOS MENORES DE 20: ");
alumnosMayores.forEach(function (alumno) {
    console.log("Nombre: " + alumno.nombre +", Edad: "+ alumno.edad);
})
// Taembien se pueden filtrar otros tipos de datos pero generalmente se querran filtrar numeros, pero todo depende de la necesidad que se necesite cubrir.
// Un pequeño ejemplo de como se puede filtrar un arreglo de objetos que contengan una propiedad que sea un string, y que contenga una letra en particular, por ejemplo, que contenga la letra "a"
var alumnosConA = alumnos.filter(function (alumno) {
    return alumno.nombre.includes("a");
});
    console.log("===================================")

console.log("ALUMNOS CON LA LETRA A: ");
alumnosConA.forEach(function (alumno) {
    console.log("Nombre: " + alumno.nombre);
})