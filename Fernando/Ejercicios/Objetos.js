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
console.log(test)
//La segunda forma se tiene que pasar la propiedad como string
let test2=persona["nombre"]
console.log(test2)
//tambien se puede actualizar datos de un objeto e igualmente se puede agregar nuevas propiedad es del objeto, ambas sintaxis son muy parecidas
persona.CosaFavorita="Pizza"
//Aqui agregamos una nueva propiedad
console.log(persona.CosaFavorita)
//y para editarla es de la siguiente manera
persona.CosaFavorita="Helado"
console.log(persona.CosaFavorita)

// Ahora haremos un ejemplo de una lista de objetos en un array que contenera una lista de 10 alumnos
var alumnos = [
    { nombre: "Juan", edad: 20 },
    { nombre: "Maria", edad: 22 },
    { nombre: "Pedro", edad: 21 },
    { nombre: "Ana", edad: 23 },
    { nombre: "Luis", edad: 24 },
]
// Ahora haremos un bucle en el que añadiremos una nueva propiedad a cada objeto del array, que sera la propiedad "promedio" y le asignaremos que sera un valor aleatorio del 1 al 10
for (let i = 0; i < alumnos.length; i++) {
    alumnos[i].promedio = Math.floor(Math.random() * 10) + 1;
}
console.log(alumnos) 
// Se puede recorrer tambien el arreglo para mostrar los datos de cada alumno, y se puede hacer con un bucle for o con un forEach
alumnos.forEach(function (alumno) {
    console.log("==================")
    console.log("Nombre: " + alumno.nombre + ", Edad: " + alumno.edad + ", Promedio: " + alumno.promedio);
});