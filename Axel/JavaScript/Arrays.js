    const prompt = require('prompt-sync')();

// ARRAYS

/* ¿Qué es un array?

    Un arreglo es una mega-caja que viene dividida de fábrica en compartimentos numerados. Te permite guardar una colección completa de cosas bajo un solo nombre.

    Tres características clave que lo definen:
    - Están ordenados por un índice: Cada compartimento tiene un número asignado automáticamente que empieza siempre desde el 0. 
      El primer cajón es el 0, el segundo es el 1, el tercero es el 2, y así sucesivamente. No puedes desordenar los cajones; esa estructura numérica siempre se mantiene fija.

    - Es una estructura dinámica: Imagina que el archivador es de ligas o resortes. Si creas un arreglo vacío, no ocupa espacio. 
      Si le agregas un objeto, el archivador "fabrica" el cajón 0. Si le agregas otro, fabrica el cajón 1. Puede crecer o encogerse según metas o saques cosas de él.

    - Es tolerante con lo que guarda: A nivel técnico (especialmente en JavaScript), un arreglo no es delicado. 
      En el cajón 0 puedes guardar un texto, en el cajón 1 un número, y en el cajón 2 puedes meter un booleano (verdadero/falso). 
      Guarda lo que le eches, aunque por buenas prácticas los programadores solemos meter cosas del mismo tipo (ej. una lista de puros correos electrónicos o una lista de puros precios).

*/ 

// Índices

    // Los índices son los números de los "cajones" de tu arreglo. La regla de oro absoluta en programación es: el conteo siempre empieza en 0, no en 1.

    // 1. Leer datos:
    const alumnos = ["Carlos", "Ana", "Luis", "Sofía"];
    // Índices:        [0]       [1]    [2]      [3]

    console.log(alumnos[0]); // Imprime: Carlos (Primer elemento)
    console.log(alumnos[2]); // Imprime: Luis   (Tercer elemento)

    // 2. Modificar un dato:
    let autos = ["Ferrari", "Mazda", "Toyota"];
    // Índices:     [0]        [1]       [2]

    // Cambiamos el elemento del índice 1 (Mazda por Tesla)
    autos[1] = "Tesla"; 

    console.log(autos); // Resultado: ["Ferrari", "Tesla", "Toyota"]

// Lenght 

    // La propiedad .length es un contador automático que te dice cuántos elementos hay dentro de un arreglo.

    const videojuegos = ["Zelda", "Mario", "Metroid"];

    console.log(videojuegos.length); // Imprime: 3

    // Truquito (Modificar tamaño de arreglo):
    let numeros = [10, 20, 30, 40, 50];

    numeros.length = 2; // Le ordenas que ahora solo mida 2
    console.log(numeros); // Resultado: [10, 20] (Borró el resto)

    numeros.length = 0; // Lo obligas a medir cero
    console.log(numeros); // Resultado: [] (Arreglo completamente vacío)

// Agregar / Quitar (Push y Pop) 

    // 1. PUSH
    let mascotas = ["Perro", "Gato"];

    mascotas.push("Loro"); // Agrega "Loro" al final

    console.log(mascotas); // Resultado: ["Perro", "Gato", "Loro"]

    // 2. POP
    let canciones = ["Salsa", "Rock", "Pop"];

    let eliminada = canciones.pop(); // Quita "Pop" del final y lo guarda en la variable

    console.log(canciones); // Resultado: ["Salsa", "Rock"] (Ya no tiene "Pop")
    console.log(eliminada); // Resultado: "Pop" (El dato borrado)

// Recorrer con For y For...of

    const marcas = ["Apple", "Sony", "Samsung"];

    for (let i = 0; i < marcas.length; i++) {
        console.log(`Índice ${i}: ${marcas[i]}`);
    }
    // Resultado:
    // Índice 0: Apple
    // Índice 1: Sony
    // Índice 2: Samsung

    for (const marca of marcas) {
        console.log(`Marca: ${marca}`);
    }
    // Resultado:
    // Marca: Apple
    // Marca: Sony
    // Marca: Samsung

// COSAS EXTRA

    // MÉTODOS DE BÚSQUEDA:
    const productos = ["Laptop", "Celular", "Teclado", "Mouse"];

    // 1. .includes() -> ¿Existe o no? (Devuelve true o false)
    const tieneCelular = productos.includes("Celular"); 
    console.log(tieneCelular); // true

    // 2. .indexOf() -> ¿En qué cajón está? (Devuelve el índice, o -1 si no existe)
    const posicionTeclado = productos.indexOf("Teclado");
    console.log(posicionTeclado); // 2

    // 3. .find() -> Devuelve el PRIMER elemento que cumpla una condición
    const precios = [10, 25, 45, 80, 100];
    const primerCaro = precios.find(precio => precio > 50); 
    console.log(primerCaro); // 80 (El primero mayor a 50)

    // MÉTODOS TRANSFORMADORES:
    // 1. .filter() -> El "guardia de seguridad". Solo deja pasar a los que cumplen la condición.
    const edades = [12, 18, 25, 14, 30];
    const mayoresDeEdad = edades.filter(edad => edad >= 18);

    console.log(mayoresDeEdad); // [18, 25, 30]

    // 2. .map() -> El "transformador". Pasa elemento por elemento y le hace un cambio.
    const preciosNormales = [100, 200, 300];
    const preciosConDescuento = preciosNormales.map(precio => precio * 0.9); // Quita el 10%

    console.log(preciosConDescuento); // [90, 180, 270]

    // CLONACIÓN DE ARRAYS

    let lista1 = ['A', 'B'];
    let lista2 = [...lista1];

    lista2.push('C');

    console.log(lista1)

// PRÁCTICA

    /*

        Paso 1: Crea un arreglo llamado inventario con 5 nombres de productos en texto (por ejemplo: "Laptop", "Mouse", etc.).

        Paso 2: Crea un arreglo vacío llamado carrito.

        Paso 3: Usa el método .push() para agregar 3 productos cualesquiera al carrito.

        Paso 4: Crea una función de búsqueda que reciba el nombre de un producto. Usa .includes() para verificar si el producto existe en el inventario.
        Si existe, muestra un mensaje de éxito; si no, muestra un mensaje de error.

        Paso 5: Agrega una validación extra: antes de meter un producto al carrito, revisa si ya existe dentro de él usando .includes().
        Si ya existe, muestra un aviso en consola diciendo que el producto está duplicado.

        Paso 6: Crea una función para recorrer el carrito usando un ciclo for...of e imprime cada producto en la consola.

        Paso 7: Al finalizar el ciclo anterior, utiliza la propiedad .length para mostrar un conteo total de cuántos productos hay en el carrito.

        Paso 8: Crea un arreglo numérico llamado precios que coincida exactamente con el orden y cantidad de los elementos que tienes en tu carrito.

        Paso 9: Usa un ciclo for clásico para recorrer el carrito y los precios al mismo tiempo usando el índice [i].

        Paso 10: Ve sumando el valor de cada precio en una variable acumuladora (como suma = 0) e imprime el total final de la compra en la consola.

    */

    // La tienda inicia con estos productos y sus precios fijos
    let inventario = ['Xbox', 'Pantalla', 'Celular', 'Smartwatch', 'SmartTV', 'Mouse', 'Teclado', 'Webcam'];
    let preciosInventario = [5000, 10000, 8000, 5000, 25000, 1000, 1200, 2000];

    // El usuario empieza con bolsas vacías
    let carrito = [];
    let preciosCarrito = [];

    // Validar si la tienda vende el producto
    const validarProducto = (producto) => {
        if (inventario.includes(producto)) return 'El producto se encuentra en el inventario';
        return 'El producto no se encuentra en el inventario';
    }

    const agregarAlCarrito = (producto) => {
        // 1. Verificar si la tienda tiene el producto
        if (!inventario.includes(producto)) {
            return 'Lo sentimos, no vendemos ese producto';
        }

        // Buscar qué precio le corresponde en la tienda
        let indiceInventario = inventario.indexOf(producto);
        let precioProducto = preciosInventario[indiceInventario];

        // 2. Si el producto YA ESTÁ en el carrito del cliente...
        if (carrito.includes(producto)) {
            let opcion = prompt(`El producto ${producto} ya está en tu carrito. ¿Quieres duplicarlo? Si / No`);
            
            if (opcion === 'Si') {
                carrito.push(producto);
                preciosCarrito.push(precioProducto);
                return 'Producto duplicado agregado al carrito';
            } else {
                return 'No se agregó el producto';
            }
        } 
        
        // 3. Si es la primera vez que lo agrega al carrito
        carrito.push(producto);
        preciosCarrito.push(precioProducto);
        return 'Producto agregado al carrito con éxito';
    }

    function verCarrito() {
        let suma = 0;
        console.log("--- TU CARRITO ---");
        
        // Usamos for clásico para que el índice [i] agarre el precio correcto, aunque esté duplicado
        for (let i = 0; i < carrito.length; i++) {
            console.log(`${carrito[i]} : $${preciosCarrito[i]}`);
            suma += preciosCarrito[i];
        }
        
        console.log("------------------");
        console.log(`Total de productos: ${carrito.length}`);
        console.log(`Total a pagar: $${suma}`);
    }

    // --- PRUEBAS ---
    console.log(agregarAlCarrito('Xbox'));     // Agrega el primero
    console.log(agregarAlCarrito('Xbox'));     // Pregunta si quiere duplicar (Pon "Si")
    console.log(agregarAlCarrito('Teclado'));  // Agrega otro diferente

    verCarrito();