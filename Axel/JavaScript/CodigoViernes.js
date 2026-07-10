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

    let saldoActual = 0, PIN = '1111', intentos = 1, estadoCuenta = true, historial = [];

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

    cajero: while (true) {

        // Bienvenida
        console.log('🔥 Bienvenido al Cajero Automático Virtual 🔥\nEscribe el número de la operación que desees realizar')

        // Bucle de intentos de acceso
        while (intentos <= 3) {
            console.log('Intento número ' + intentos);
            let acceso = prompt('Insertar el PIN de su tarjeta: ')
            if (acceso !== PIN) {
                intentos++
                if (intentos > 3) {
                    console.log('CUENTA BLOQUEADA - Se superó la cantidad de intentos permitida')
                    break cajero;
                }
            }
            else {
                intentos = 0;
                break;
            }
        }

        console.log('1. Ver saldo, 2. Retirar, 3. Depositar, 4. Ver historial, 5. Salir')
        let operacion = prompt();

        // switch de operaciones
        switch (operacion) {
            case '1':
                console.log('VER SALDO\nSaldo Actual: ' + saldoActual);
                break;
            case '2':
                break;
            case '3':
                break;
            case '4':
                break;
            case '5':
                while (true) {
                    let opcion = prompt('¿Terminar operación?: Si / No ');
                    if (opcion === 'Si') break cajero;
                    else if (opcion === 'No') {
                        let nuevaOpcion = prompt('¿Desea realizar una nueva operación?: Si / No ')
                        if (nuevaOpcion === 'No') {
                            console.log('Ya decidase cabrón xd');
                            continue;
                        }
                        else if (nuevaOpcion === 'Si') break;
                        else console.log('Respuesta inválida');
                    }
                    else console.log('Respuesta inválida');
                }
            default:
                console.log('Opción no disponible');
                continue;
        }
    }
    


/*
    4. Interacción con el usuario (Input)
    Como estás en la consola de Node.js, para pedir datos al usuario puedes usar funciones nativas para leer la terminal. Si no quieres enredarte instalando librerías externas como prompt-sync, puedes simular las entradas del usuario usando un array de "acciones predefinidas" al principio de tu código para simular que alguien interactúa con él, o usar process.argv para pasarle datos desde la terminal. (Elige lo que te sea más cómodo para estructurar el flujo). 
*/