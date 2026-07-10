// Librería

    const prompt = require('prompt-sync')();

/* 
    1. Variables y Estructuras de Datos (La Base)
    No uses un solo valor suelto. Tienes que definir al inicio:
    * Una forma de almacenar el saldo actual del usuario.
    * El PIN secreto (un número de 4 dígitos).
    * Un contador para los intentos fallidos del PIN.
    * Una variable booleana que controle si la cuenta está bloqueada o no.
    * Un historial de transacciones (puedes usar un string largo que vayas acumulando o pensar en cómo estructurar una lista de movimientos).
*/

/*
    2. El Bucle Principal (El Motor)
    Todo el programa debe ejecutarse dentro de un bucle (un while es ideal aquí).

    El bucle no debe terminar hasta que el usuario elija explícitamente la opción de "Salir" o hasta que el sistema lo bloquee por seguridad.

    En cada "vuelta" del bucle, el programa debe mostrar un menú de opciones en la consola (Ej: 1. Ver saldo, 2. Retirar, 3. Depositar, 4. Ver historial, 5. Salir).
*/

/*
    3. La Lógica Difícil: Condicionales Cruzados
    Aquí es donde tu compañero va a tener que rascarse la cabeza para entender tu código. Debes programar estas reglas:

    Control de Acceso: Antes de permitir cualquier operación del menú, el usuario debe ingresar su PIN. Si falla 3 veces seguidas, el bucle principal se rompe inmediatamente (break) y el programa muestra un mensaje de "CUENTA BLOQUEADA".

    Lógica de Retiro con Comisiones: Al retirar dinero, no dejes que sea tan fácil como saldo - retiro. Añade estas condiciones:

    No se puede retirar más dinero del que hay en el saldo.

    Si el usuario retira una cantidad que es múltiplo de 50, no cobres comisión. Si no es múltiplo de 50, cóbrale una comisión del 2% sobre el total retirado.

    Pon un límite máximo de retiro por transacción (por ejemplo, no más de $500 de golpe).

    Historial Dinámico: Cada vez que un retiro o depósito sea exitoso, debes guardar un registro en tu variable de historial (Ej: "+ $100 - Depósito" o "- $202 - Retiro con comisión"). Si la transacción falla por falta de fondos, también debe registrarse como "FALLIDO - Fondos insuficientes".
*/

    // --- VARIABLES INICIALES FALTANTES ---
    const PIN = '1234';          // PIN simulado de la tarjeta (en formato String)
    let intentos = 1;            // El contador empieza en el intento 1
    let saldoActual = 1000;      // Saldo inicial simulado
    let historial = ["Saldo inicial: $1000"]; // Historial de movimientos
    let repetir = true;          // Controla el bucle del menú (motor)

    cajero: while (true) {

        // Bienvenida
        console.log('🔥 Bienvenido al Cajero Automático Virtual 🔥\nEscribe el número de la operación que desees realizar');

        // Bucle de intentos de acceso
        while (intentos <= 3) {
            console.log('Intento número ' + intentos);
            let acceso = prompt('Insertar el PIN de su tarjeta: ');
            if (acceso !== PIN) {
                intentos++;
                if (intentos > 3) {
                    console.log('CUENTA BLOQUEADA - Se superó la cantidad de intentos permitida');
                    break cajero;
                }
            }
            else {
                intentos = 1; // Reseteamos a 1 para futuras validaciones si fuera necesario
                break;
            }
        }

        motor: while (repetir) {
            let mensaje = '';

            console.log('1. Ver saldo, 2. Retirar, 3. Depositar, 4. Ver historial, 5. Salir');
            // Mantuviste los casos como Strings ('1', '2'...), así que el prompt directo funciona bien
            let operacion = prompt(); 

            // switch de operaciones
            switch (operacion) {
                case '1':
                    console.log('VER SALDO\nSaldo Actual: $' + saldoActual);
                    break;
                    
                case '2': // --- COMPLETADO: RETIRAR ---
                    console.log('RETIRAR DINERO');
                    let montoRetirar = Number(prompt('¿Cuánto dinero desea retirar?: '));
                    
                    if (isNaN(montoRetirar) || montoRetirar <= 0) {
                        console.log('Monto inválido.');
                    } else if (montoRetirar > saldoActual) {
                        console.log('Fondos insuficientes. Tu saldo es de: $' + saldoActual);
                    } else {
                        saldoActual -= montoRetirar; // Restamos al saldo
                        historial.push(`Retiro: -$${montoRetirar}`); // Registramos en el historial
                        console.log(`Retiro exitoso. Retiraste: $${montoRetirar}. Saldo nuevo: $${saldoActual}`);
                    }
                    break;
                    
                case '3': // --- COMPLETADO: DEPOSITAR ---
                    console.log('DEPOSITAR DINERO');
                    let montoDepositar = Number(prompt('¿Cuánto dinero desea depositar?: '));
                    
                    if (isNaN(montoDepositar) || montoDepositar <= 0) {
                        console.log('Monto inválido.');
                    } else {
                        saldoActual += montoDepositar; // Sumamos al saldo
                        historial.push(`Depósito: +$${montoDepositar}`); // Registramos en el historial
                        console.log(`Depósito exitoso. Depositaste: $${montoDepositar}. Saldo nuevo: $${saldoActual}`);
                    }
                    break;
                    
                case '4':
                    console.log('\n===================================');
                    console.log('    📜 HISTORIAL DE MOVIMIENTOS    ');
                    console.log('===================================');
                    
                    // Si solo tiene el saldo inicial, significa que no hay movimientos aún
                    if (historial.length === 1) {
                        console.log(' No se han realizado transacciones en esta sesión.');
                    } else {
                        // Recorremos el historial y lo numeramos limpiamente
                        historial.forEach((movimiento, index) => {
                            console.log(`${index + 1}. ${movimiento}`);
                        });
                    }
                    console.log('===================================\n');
                    
                    // Quitamos los prompts molestos de aquí adentro. 
                    // Un break simple cierra el caso y el ciclo 'motor' te regresa al menú principal en automático.
                    break;
                    
                case '5':
                    while (true) {
                        let opcion = prompt('¿Terminar operación?: Si / No ');
                        if (opcion === 'Si') {
                            break cajero;
                        }
                        else if (opcion === 'No') {
                            let nuevaOpcion = prompt('¿Desea realizar una nueva operación?: Si / No ');
                            if (nuevaOpcion === 'No') {
                                console.log('Ya decidase cabrón xd'); // Mantuve tu joya de mensaje jajaja
                                continue;
                            }
                            else if (nuevaOpcion === 'Si') {
                                break; // Rompe este minibucle del caso 5 para volver al menú de opciones
                            }
                            else console.log('Respuesta inválida');
                        }
                        else console.log('Respuesta inválida');
                    }
                    break; // Rompe el caso 5 del switch
                    
                default:
                    console.log('Opción no disponible');
                    continue;
            }
        }
    }
    


/*
    4. Interacción con el usuario (Input)
    Como estás en la consola de Node.js, para pedir datos al usuario puedes usar funciones nativas para leer la terminal. Si no quieres enredarte instalando librerías externas como prompt-sync, puedes simular las entradas del usuario usando un array de "acciones predefinidas" al principio de tu código para simular que alguien interactúa con él, o usar process.argv para pasarle datos desde la terminal. (Elige lo que te sea más cómodo para estructurar el flujo). 
*/