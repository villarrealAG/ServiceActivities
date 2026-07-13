/* 
qué es una función y para qué (reutilizar y organizar). Declaración, parámetros, return, llamada. Scope (variable local vs global). Intro a arrow functions. 
Práctica: convertir en funciones los ejercicios sueltos de la W27 (una función que valide una edad, otra que calcule un total, etc.). 
*/

// ¿Qué es una función? y ¿Para qué sirve? (reutilizar y organizar)

// Una función es simplemente un bloque de código con un nombre que hace una tarea específica. Piensa en ella como el botón de "Silencio" (Mute) en tu control remoto.

/*
    ¿Para qué sirve?
    Organizar: En lugar de tener un código largo y confuso, lo divides en "cajitas" con nombres claros (ej. encender_pantalla(), subir_volumen()).

    Reutilizar: Escribes las instrucciones del botón una sola vez. Cada vez que lo presionas, la tarea se ejecuta automáticamente sin tener que volver a programarla.
*/

// Declaración, parámetros, return, llamada

/*/ 
    Declaración:
    function nombreDeLaFuncion() { // Se usa la palabra reservada "function", el nombre de la funcion, incluyendo paréntesis y se abren llaves
        instrucciones...;
    }
        
    Parámetros
    function nombreDeLaFuncion(numero1, numero2) { // Dentro de los paréntesis van los parámetros
        numero3 = numero1 + numero2
        console.log(numero3); // instrucciones
    }

    Return:
    function nombreDeLaFuncion(numero) {
        return numero * 2; // Regresa un valor listo para usarse con la palabra reservada "return"
    }

    Llamada:
    function nombreDeLaFuncion(numero) {
        return numero * 2;
    }
    
    let miResultado = nombreDeLaFuncion(5);
/*/

// Scope (variable local vs global)

/* 
    Variable local: Se declaran dentro de alguna función. Solo la función puede ver la variable. Solo vive cuando la función se ejecuta, después de eso, muere (se borra de la memoria).

    function saludar() {
        let saludo = "¡Hola!"; // LOCAL
        console.log(saludo);   // Funciona aquí dentro
    }

    console.log(saludo); // ❌ ERROR: "saludo" no existe fuera de la función

    Variable global: Se declaran fuera de cualquier función. Todo mundo puede verla y modificarla. Únicamente vive cuando el código está corriendo.

    let nombreHotel = "Hotel Central"; // GLOBAL

    function mostrarHotel() {
        console.log(nombreHotel); // Funciona, porque es global
    }

*/

// Intro an arrow function

/*
    // ❌ Traditional Function
    function double(number) {
        return number * 2;
    }

    //  Arrow Function (Compact)
    const double = number => number * 2;

    // Multiline version 
    const calculateInvoice = (price, tax) => {
        const totalTax = price * tax;
        const grandTotal = price + totalTax;
        return grandTotal; // Explicit return required!
    };

*/

// Prácticas

// Condicionales

// Semáforo y ambulancia

    const semaforoEstado = (color, hayAmbulancia, velocidadAlta) => {
        if (hayAmbulancia) return 'Orillarse y Detenerse';

        const acciones = {
            verde: 'Cruce.',
            rojo: 'Deténgase.',
            amarillo: velocidadAlta ? 'Cruce con precaución.' : 'Prepárese para detenerse.'
        };

        return `El semáforo está en ${color}: ${acciones[color]}`;
    };

    console.log(semaforoEstado('amarillo', false, false)); 

// Calculadora de tarifas

    const calcularEntrada = (edad, esEstudiante, temporadaAlta) => {
        // 1. Determinar precio base (más limpio que el switch)
        let precio = 40; // Por defecto adultos
        if (edad < 5) return "Gratis";
        if (edad <= 12) precio = 20;
        if (edad >= 65) precio = 25;

        // 2. Aplicar reglas (Alta y Estudiante)
        if (temporadaAlta) precio *= 1.20;
        if (esEstudiante && edad >= 13 && edad <= 25) precio *= 0.85;

        return `$${precio.toFixed(2)}`;
    };

    console.log(calcularEntrada(25, false, true));
    console.log(calcularEntrada(4, false, true));

// Validar contraseñas

    const validarContrasena = (pass) => {
        if (pass.length !== 8) return 'Tu contraseña debe tener exactamente 8 caracteres';

        let errores = [];
        if (!/[A-Z]/.test(pass)) errores.push('mayúsculas');
        if (!/[0-9]/.test(pass)) errores.push('números');

        if (errores.length === 0) return 'Contraseña segura';
        return `Faltan ${errores.join(' y ')}`;
    };

    // --- Prueba del código ---
    console.log(validarContrasena("abcddDs5")); // Contraseña segura
    console.log(validarContrasena("abc"));      // Tu contraseña debe tener exactamente 8 caracteres
    console.log(validarContrasena("abcdefgh")); // Faltan mayúsculas y números
    console.log(validarContrasena("abcdeFgh")); // Faltan números

// Bucles

// IMPRIMIR SERIES

    const listarPares = (limite) => {
        for (let a = 2; a <= limite; a += 2) console.log(a);
    };

    listarPares(10);

// SUMAR

    const sumar = (limite) => {
        let suma = 0
        for (let i = 0; i <= limite; i++) console.log(suma += i);
    }

    sumar(20)

// TABLAS DE MULTIPLICAR

    const tablaMultiplicar = (numero, limite) => {
        let multiplicacion = 0
        for(let i = 0; i <= limite; i++) console.log(multiplicacion = i * numero);
    }

    tablaMultiplicar(3, 20)

// CONTAR ELEMENTOS

    const numerarLetras = (palabra) => {
        for (let i = 0; i < palabra.length; i++) console.log(`${palabra[i]} : ${i + 1}`);
    };

    numerarLetras('abcdefghijklmnopqrstuvwxyz');