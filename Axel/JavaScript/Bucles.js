// BUCLES JAVASCRIPT

// FOR

    for (let i = 0; i <= 10; i++) {
        console.log(i)
    }

// FOR ... OF

    let palabra = 'UWU'

    for (letra of palabra) {
        console.log(letra)
    }

// FOR ... IN

    const persona = { nombre: "Ana", edad: 30, ciudad: "Madrid" };

    for (let clave in persona) {
    console.log(clave + ": " + persona[clave]);
    }

// WHILE

    let i = 0

    while (i <= 5) {
        console.log(i)
        i++
    }

// DO WHILE

    let contador = 0;

    do {
        console.log(contador)
        contador++
    } while (contador < 5)

// BREAK Y CONTINUE

    // BREAK

    let numero = 0

    externo: for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            if (i === 2 && j === 2) {
            break externo; // Sale de ambos bucles
            }
            console.log(`i: ${i}, j: ${j}`);
        }
    }

    // CONTINUE

    for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
            continue; // Salta a la siguiente iteración si es par
        }
        console.log(i);
    }

// EJERCICIOS

// IMPRIMIR SERIES

    let a = 0

    while (a <= 100) {
        let pares = (a % 2 === 0 && a !== 0) ? console.log(a) : 0
        a++
    }

// SUMAR

    let b = 0
    let suma = 0
    
    do {
        suma += b
        b++
        console.log(suma)
    } while (b <= 20)

// TABLAS DE MULTIPLICAR

    let multiplicacion = 0

    for(let i = 0; i <= 20; i++) {
        multiplicacion = i * 3
        console.log(multiplicacion)
    }

// CONTAR ELEMENTOS

    let word = 'abcdefghijklmnopqrstuvwxyz'
    let contador2 = 1

    for (words of word) {
        console.log(words + ' : ' + contador2)
        contador2++
    }

// BUCLES INFINITO

    /* Los bucles infinitos normalmente son casuados por una mala elección de restricciones dentro de los bucles.
    Comúnmente ocurren en los bucles while ya que la condición nunca se vuelve falsa.

    En este bucle while, la condición es únicamente un "true", osea, nunca cambiará a un false de ninguna forma, así que imprimirá la
    cantidad de números que el desarrollador permita hasta que termine la ejecución.

        let i = 0 
        while (true) {
            console.log(i);
            i++;
        }

    Eso es un caso muy sencillo, si en vez del true, ponemos una condición pero no agregamos el incremento de "i", la historia será la misma.
    Es muy fácil crear bucles infinitos, así que se necesitan estrategias para poder evitar algún congelamiento o desbordamiento de memoria.

    A continuación, se expondrán buenas prácticas para evitar bucles de este estilo:

        1. Priorizar Métodos de Arrays
            Usa: .map(), .filter(), .forEach(), o .reduce().

            const numeros = [1, 2, 3, 4];

            // Imposible que sea infinito, JS sabe exactamente cuándo termina el array
            const duplicados = numeros.map(n => n * 2);

        2. Implementar Interruptor de Emergencia

            let iteraciones = 0;
            const MAX_ITERACIONES = 5000; // Tu límite de seguridad

            while (condicionCompleja) {
            iteraciones++;
            
            if (iteraciones > MAX_ITERACIONES) {
                console.error("⚠️ Bucle infinito detectado por seguridad. Forzando salida.");
                break; // Rompe el bucle inmediatamente
            }
            
            // Tu lógica de negocio aquí
            }

        3. Usar "for...in" y "for...of" para colecciones

            const usuarios = ['Ana', 'Pedro', 'Luis'];

            // Correcto y seguro: extrae cada elemento automáticamente hasta el fin del array
            for (const usuario of usuarios) {
            console.log(usuario);
            }

        4. Escribir la Actualización del Bucle antes de la Lógica 

            let idActual = 10;

            while (idActual > 0) {
            // 1. Lo primero que escribes para que no se te olvide:
            idActual--; 
            
            // 2. Después desarrollas el resto de tu código aquí abajo:
            console.log(`Procesando ID: ${idActual}`);
            }
    
    */