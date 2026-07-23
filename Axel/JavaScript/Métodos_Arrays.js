const prompt = require('prompt-sync')();

// MÉTODOS DE ARRAYS (forEach, map, filter) Y CALLBACKS

/* ¿Qué son los métodos de iteración?

    Son herramientas integradas en JavaScript que nos permiten procesar y recorrer arrays sin necesidad de escribir bucles manuales (como for o while).

    Conceptos clave:
    - Callback: Es una función que se pasa a otra función como argumento para que sea ejecutada internamente sobre cada elemento del array.
    - forEach (recorrer): Ejecuta una función para cada elemento. No devuelve nada (no crea un nuevo array), solo "hace algo" con cada dato.
    - map (transformar): Crea y devuelve un NUEVO array con los resultados de aplicar una función a cada uno de los elementos del array original.
    - filter (seleccionar): Crea y devuelve un NUEVO array conteniendo únicamente los elementos que cumplan con una condición (que devuelvan true en la prueba).
*/

// Explicación de Métodos de Iteración

    // 1. forEach (Recorrer sin retornar):
    const frutas = ["Manzana", "Plátano", "Cereza"];
    frutas.forEach((fruta, indice) => {
        console.log(`Fruta ${indice}: ${fruta}`);
    });

    // 2. map (Transformar elementos):
    const numeros = [1, 2, 3, 4];
    const dobles = numeros.map(num => num * 2);
    console.log(dobles); // Resultado: [2, 4, 6, 8]

    // 3. filter (Filtrar elementos por condición):
    const valores = [5, 12, 8, 130, 44];
    const mayores = valores.filter(val => val > 10);
    console.log(mayores); // Resultado: [12, 130, 44]

// PRÁCTICA

    /*
        Paso 1: Crea un array de números llamado preciosBase con al menos 5 valores distintos.
        Paso 2: Usa .map() para generar un nuevo array llamado preciosConIVA, agregándoles un 16% de impuesto a cada precio.
        Paso 3: Usa .filter() para obtener únicamente los precios de preciosConIVA que superen los $100.
        Paso 4: Usa .forEach() para mostrar en consola la lista final formateada.
    */

    // Array inicial de datos
    const preciosBase = [40, 90, 150, 30, 200];

    // Paso 2: Generar un array transformado con .map() (suma del 16% de IVA)
    const preciosConIVA = preciosBase.map(precio => precio * 1.16);

    // Paso 3: Filtrar precios mayores a $100 con .filter()
    const preciosAltos = preciosConIVA.filter(precio => precio > 100);

    // Paso 4: Mostrar los resultados en consola con .forEach()
    console.log("--- LISTA DE PRECIOS ORIGINALES ---");
    preciosBase.forEach(p => console.log(`$${p}`));

    console.log("\n--- PRECIOS CON IVA MAYORES A $100 ---");
    preciosAltos.forEach((precio, i) => {
        console.log(`Producto ${i + 1}: $${precio.toFixed(2)}`);
    });