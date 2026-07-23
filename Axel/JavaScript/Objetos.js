const prompt = require('prompt-sync')();

// OBJETOS Y ARRAYS DE OBJETOS

/* ¿Qué es un Objeto?

    Un objeto es una estructura de datos que representa una entidad de la vida real mediante pares clave-valor (propiedad: valor).

    Tres características clave:
    - Acceso a propiedades: Puedes acceder o modificar valores usando la notación de punto (objeto.propiedad) o la de corchetes (objeto["propiedad"]).
    - Métodos: Un objeto no solo guarda datos (propiedades), también puede ejecutar funciones internas llamadas métodos.
    - Arrays de Objetos: Es la combinación de ambas estructuras. Un array donde cada elemento es un objeto completo, permitiendo modelar colecciones reales como listas de usuarios, productos o tareas.
*/

// Explicación de Objetos

    // 1. Crear y acceder a un objeto simple:
    const alumno = {
        nombre: "Ana",
        edad: 20,
        carrera: "Sistemas"
    };

    console.log(alumno.nombre); // Acceso con punto: Ana
    console.log(alumno["edad"]); // Acceso con corchetes: 20

    // 2. Modificar y agregar propiedades:
    alumno.edad = 21; // Modificar
    alumno.promedio = 9.5; // Agregar nueva propiedad

    // 3. Array de Objetos (Modelado de datos reales):
    const catalogo = [
        { nombre: "Mouse", precio: 300 },
        { nombre: "Teclado", precio: 600 }
    ];

    console.log(catalogo[0].nombre); // Imprime: Mouse

// PRÁCTICA

    /*
        Paso 1: Crea un array de objetos llamado listaProductos donde cada objeto contenga: id, nombre, precio y categoria.
        Paso 2: Usa el método .forEach() para mostrar en consola todos los productos disponibles con su precio.
        Paso 3: Usa el método .filter() para seleccionar solo los productos que pertenezcan a una categoría específica (ej. "Electrónica").
        Paso 4: Usa el método .map() para obtener una lista únicamente con los nombres de todos los productos.
    */

    // Paso 1: Array de objetos representando un catálogo de datos reales
    const listaProductos = [
        { id: 1, nombre: "Laptop", precio: 15000, categoria: "Electrónica" },
        { id: 2, nombre: "Silla Gamer", precio: 3500, categoria: "Muebles" },
        { id: 3, nombre: "Celular", precio: 8000, categoria: "Electrónica" },
        { id: 4, nombre: "Escritorio", precio: 2500, categoria: "Muebles" },
        { id: 5, nombre: "Audífonos", precio: 1200, categoria: "Electrónica" }
    ];

    // Paso 2: Mostrar todo el inventario usando .forEach()
    console.log("--- CATÁLOGO COMPLETO ---");
    listaProductos.forEach(prod => {
        console.log(`[${prod.categoria}] ${prod.nombre} - $${prod.precio}`);
    });

    // Paso 3: Filtrar productos por categoría usando .filter()
    const soloElectronica = listaProductos.filter(prod => prod.categoria === "Electrónica");

    console.log("\n--- PRODUCTOS DE ELECTRÓNICA ---");
    soloElectronica.forEach(prod => console.log(`- ${prod.nombre}: $${prod.precio}`));

    // Paso 4: Extraer solo los nombres usando .map()
    const nombresProductos = listaProductos.map(prod => prod.nombre);

    console.log("\n--- LISTA SOLO CON NOMBRES ---");
    console.log(nombresProductos);