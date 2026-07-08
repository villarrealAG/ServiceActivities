// CONDICIONALES 08/07/2026

// if / else if / else

    let edad = 18 // declaramos una variable edad y le asignamos el valor querido

    if (edad > 18) { // Si es mayor de 18, imprimirá el texto de abajo
        console.log("Eres mayor de edad")
    }
    else if (edad === 18) { // Si es igual a 18, imprimirá el texto de abajo
        console.log("Tienes 18 años")
    }
    else { // Si es menor de 18, imprimirá el texto de abajo
        console.log("No eres mayor de edad")
    }

// switch / case

    let dia = 2 // declaramos una variable dia y le asignamos el valor querido

    switch (dia) { // evaluamos la variable dia
        case 1: // si el valor es 1, imprimirá el texto de abajo
            console.log("Hoy es lunes")
            break // rompe el flujo del switch
        case 2: // si el valor es 2, imprimirá el texto de abajo
            console.log("Hoy es martes")
            break
    }

// operador ternario

    let edad2 = 17;
    let mensaje = (edad2 >= 18) ? "Mayor de edad" : "Menor de edad";

    console.log(mensaje);

// Problemas con decisiones

// Semáforo y ambulancia

    let color = 'rojo'
    let hayAmbulancia = false
    let velocidadAlta = false

    if (hayAmbulancia === true) {
        console.log('Orgillarse y Detenerse')
    }
        else {
            switch (color) {
            case 'verde':
                console.log('Cruzar')
                break
            case 'amarillo':
                let mensajeVelocidad = (velocidadAlta === true) ? 'Cruzar con precaución' : 'Prepararse para detenerse'
                console.log(mensajeVelocidad)
                break
            case 'rojo':
                console.log('Detenerse')
                break
        }
    }

// Calculadora de tarifas

    let edad3 = 25;
    let esEstudiante = true;
    let temporadaAlta = false;

    let precioBase = 0;

    // 1. Determinar el PRECIO BASE según la edad
    switch (true) {
        case edad3 < 5:
            precioBase = 0;
            break;
        case edad3 >= 5 && edad3 <= 12:
            precioBase = 20;
            break;
        case edad3 >= 13 && edad3 <= 64:
            precioBase = 40;
            break;
        default: // Equivalente a edad3 >= 65
            precioBase = 25;
            break;
    }

    // 2. Calcular el PRECIO FINAL aplicando las reglas en orden
    function calcularPrecioFinal(precio, edad, alta, estudiante) {
        // Si es gratis ($0), no se le aplica nada
        if (precio === 0) return 0;

        // Regla 1: Temporada Alta (+20%)
        if (alta) {
            precio *= 1.20; // Multiplicar por 1.20 aumenta el 20% directamente
        }

        // Regla 2: Descuento Estudiante (-15% sobre el precio final actual)
        if (estudiante && edad >= 13 && edad <= 25) {
            precio *= 0.85; // Multiplicar por 0.85 resta el 15%
        }

        return precio;
    }

    let precioFinal = calcularPrecioFinal(precioBase, edad3, temporadaAlta, esEstudiante);

    console.log(precioFinal === 0 ? "Gratis" : `$${precioFinal.toFixed(2)}`);

// Validar contraseñas

    let contrasena = "abcddDs5"; // Prueba cambiando este valor

    // 1. Corregido 'length' y removida la 'ñ'
    if (contrasena.length !== 8) { 
        console.log('Tu contraseña debe tener exactamente 8 caracteres');
    } else {
        // Usamos .test() para saber si TIENE o NO TIENE lo que buscamos
        let tieneMayuscula = /[A-Z]/.test(contrasena);
        let tieneNumero = /[0-9]/.test(contrasena);

        // CASO 1: Faltan ambas cosas (Va primero por ser la más estricta)
        if (!tieneMayuscula && !tieneNumero) {
            console.log('Faltan mayúsculas y números');
        } 
        // CASO 2: Solo faltan mayúsculas
        else if (!tieneMayuscula) {
            console.log('Faltan mayúsculas');
        } 
        // CASO 3: Solo faltan números
        else if (!tieneNumero) {
            console.log('Faltan números');
        } 
        // CASO 4: Todo perfecto
        else {
            console.log('Contraseña segura');
        }
    }