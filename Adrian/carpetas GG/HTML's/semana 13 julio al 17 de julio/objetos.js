/*
Objetos
Un objeto contiene propiedades, o pares de clave-valor. 

Ejemplo
const escritorio = {
    altura: "1 metro",
    peso: "15  kg",
    color: "marron",
    material : "madera"
};

El objeto escritorio tiene 4 propiedades. Cada propiedad tiene un 
nombre, al que se le llama clave y el cual tiene su valor 
correspondiente.

A diferencia de los arrays, que no es recomendable poner valores 
diferentes tipos de datos.  como enteros, booleanos y strings,
en los objetos si se puede hacer.
*/

//Editar una propiedad
const persona = {
    nombre: "Gerardo",
    edad: 23,
    comidaFavorita: "Tacos",
}; 
let edad = persona.edad;
console.log(edad);
persona.edad = 25;
console.log(persona);

// Para agregar una nueva variable
/*
Es una sintaxis similar a editar una propiedad, con la diferencia
de que en la llave tiene que ser una nueva que no este en el 
objeto
*/
persona.deporteFav = "ballet";
console.log(persona); 

//Borrar una propiedad solo se agrega la palbra clave delete
delete persona.deporteFav;
console.log(persona)

/*
Recorrer un objeto/iterar un objeto:

Se usa la palabra clave for, luego se crea una variable temporal
por cada propiedad que va a guardad cada valor de la llave(el 
nombre de la propiedad) no guardar los valores.

Luego se usa la palabra clave in, para decirle a que objeto nos 
estamos refiriendo
*/

for (let key in persona){
    console.log(key) //escribe unicamente el nombre de la clave
    console.log(key, persona[key])
}

// Creacion de un array de objetos

const alumnos = [
    {
        noControl: "IS230457",
        nombreAlumno: "Jose",
        carrera: "Industrial",
        Promedio: 7,
    },
    {
        noControl: "IS240785",
        nombreAlumno: "Fernando",
        carrera: "Sistemas Computacionales",
        Promedio: 9,
    },
    {
        noControl: "IS251934",
        nombreAlumno: "Pablo",
        carrera: "Automotriz",
        Promedio: 8,
    }
]
const listaTareas = [
    {
        id: 1, 
        descripcion: "Configurar el entorno vitual",
        completada: true,
    },
    {
        id: 2,
        descripcion: "Seperar el css del html",
        completada: false,
    },
    {
        id: 3,
        descripcion: "Conectar API",
        completada: true,
    }
];
const listaProductos = [
    {
        sku: "TEC-001",
        nombre: "Mouse Asus Rog Gladius II",
        precio: 1390.00,
        stock: 22,
    },
    {
        sku: "MON-027",
        nombre: "Monitor Rog Strix OLED XG27AQMES",
        precio: 9800.00,
        stock: 2,
    },
    {
        sku: "MOU-005",
        nombre: "Teclado ROG Azoth Extreme Edicion 20 Aniversario",
        precio: 13000.00,
        stock: 0,
    }
];

/*
for...in⁠ es para las llaves (keys) de los Objetos, y ⁠for...of⁠ es 
para los valores de los Arrays.
*/

for(let producto of listaProductos){
    if(producto.stock > 0){
        console.log(`Disponible: ${producto.nombre} a ${producto.precio}`)
    }
}   


/*
Práctica: modelar una tienda con un array de objetos y recorrerlo
para mostrar y filtrar información usando métodos de arrays.
*/
console.log("Lista de productos:");
listaProductos.forEach((producto) => {
    console.log(`${producto.sku} - ${producto.nombre} | $${producto.precio} | Stock: ${producto.stock}`);
});

const productosDisponibles = listaProductos.filter((producto) => producto.stock > 0);
console.log("Productos disponibles:");
productosDisponibles.forEach((producto) => {
    console.log(`${producto.nombre} - ${producto.stock} en stock`);
});

const productosTecnologia = listaProductos.filter((producto) => producto.precio < 2000);
console.log("Productos economicos:");
productosTecnologia.forEach((producto) => {
    console.log(`${producto.nombre} - $${producto.precio}`);
});

const nombresProductos = listaProductos.map((producto) => producto.nombre);
console.log("Nombres de productos:", nombresProductos);