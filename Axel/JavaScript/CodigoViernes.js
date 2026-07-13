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

    // --- VARIABLES INICIALES ---
    const PIN = '1234';
    let intentos = 1;
    let saldoActual = 1000;
    let historial = ["Saldo inicial: $1000"];

    console.log('🔥 Bienvenido al Cajero Automático Virtual 🔥');

    // ==========================================
    // 1. CONTROL DE ACCESO
    // ==========================================
    while (intentos <= 3) {
        console.log(`Intento número ${intentos} de 3`);
        let acceso = prompt('Insertar el PIN de su tarjeta: ');
        
        if (acceso === PIN) {
            console.log('✅ PIN Correcto. Accediendo al sistema...\n');
            break; 
        }
        
        intentos++;
        if (intentos > 3) {
            console.log('❌ CUENTA BLOQUEADA - Se superó la cantidad de intentos permitida.');
            process.exit(); // Rompe el bucle principal e inmediatamente termina el programa
        }
    }

    // ==========================================
    // 2. MOTOR PRINCIPAL DEL CAJERO
    // ==========================================
    cajero: while (true) {
        console.log('Escribe el número de la operación que desees realizar:');
        console.log('1. Ver saldo, 2. Retirar, 3. Depositar, 4. Ver historial, 5. Salir');
        let operacion = prompt(); 

        switch (operacion) {
            case '1':
                console.log(`\n💵 VER SALDO\nSaldo Actual: $${saldoActual}\n`);
                break;
                
            case '2': // --- LÓGICA DE RETIRO CON COMISIONES Y LÍMITES ---
                console.log('\n💸 RETIRAR DINERO');
                let montoRetirar = Number(prompt('¿Cuánto dinero desea retirar?: '));
                
                // 1. Validación de monto numérico válido
                if (isNaN(montoRetirar) || montoRetirar <= 0) {
                    console.log('❌ Monto inválido.\n');
                    break;
                } 
                
                // 2. Validación de límite máximo por transacción ($500)
                if (montoRetirar > 500) {
                    console.log('❌ Operación rechazada. El límite máximo por retiro es de $500.\n');
                    break;
                }

                // 3. Cálculo de comisiones (Condicionales Cruzados)
                let comision = 0;
                let esMultiploDe50 = (montoRetirar % 50 === 0);
                
                if (!esMultiploDe50) {
                    comision = montoRetirar * 0.02; // 2% de comisión
                }
                
                let totalDebitar = montoRetirar + comision;

                // 4. Validación de fondos suficientes
                if (totalDebitar > saldoActual) {
                    console.log(`❌ Fondos insuficientes. Intenta retirar $${montoRetirar} más $${comision} de comisión. Tu saldo es de: $${saldoActual}\n`);
                    historial.push(`FALLIDO - Fondos insuficientes (Intento de retiro: $${montoRetirar})`); // Registro Dinámico de Fallo
                } else {
                    // Retiro Exitoso
                    saldoActual -= totalDebitar;
                    
                    // Registro Dinámico con formato solicitado
                    if (comision > 0) {
                        historial.push(`- $${totalDebitar} - Retiro con comisión (Monto: $${montoRetirar} + Comisión 2%: $${comision})`);
                        console.log(`✅ Retiro exitoso. Retiraste: $${montoRetirar} (Comisión de 2%: $${comision}). Saldo nuevo: $${saldoActual}\n`);
                    } else {
                        historial.push(`- $${montoRetirar} - Retiro`);
                        console.log(`✅ Retiro exitoso (Sin comisión). Retiraste: $${montoRetirar}. Saldo nuevo: $${saldoActual}\n`);
                    }
                }
                break;
                
            case '3': // --- DEPOSITAR ---
                console.log('\n💰 DEPOSITAR DINERO');
                let montoDepositar = Number(prompt('¿Cuánto dinero desea depositar?: '));
                
                if (isNaN(montoDepositar) || montoDepositar <= 0) {
                    console.log('❌ Monto inválido.\n');
                } else {
                    saldoActual += montoDepositar;
                    historial.push(`+ $${montoDepositar} - Depósito`); // Registro Dinámico de Depósito
                    console.log(`✅ Depósito exitoso. Depositaste: $${montoDepositar}. Saldo nuevo: $${saldoActual}\n`);
                }
                break;
                
            case '4':
                console.log('\n===================================');
                console.log('    📜 HISTORIAL DE MOVIMIENTOS    ');
                console.log('===================================');
                if (historial.length === 1) {
                    console.log(' No se han realizado transacciones en esta sesión.');
                } else {
                    historial.forEach((movimiento, index) => {
                        console.log(`${index + 1}. ${movimiento}`);
                    });
                }
                console.log('===================================\n');
                break; 
                
            case '5':
                while (true) {
                    let respuesta = prompt('¿Seguro que desea salir? (Si / No): ');
                    if (respuesta === 'Si') {
                        console.log('👋 Gracias por usar nuestro cajero virtual. ¡Hasta luego!');
                        break cajero; 
                    } else if (respuesta === 'No') {
                        console.log('Volviendo al menú principal...\n');
                        break; 
                    } else {
                        console.log('⚠️ Respuesta inválida. Escribe "Si" o "No".');
                    }
                }
                break;
                
            default:
                console.log('⚠️ Opción no disponible. Intenta de nuevo.\n');
                break;
        }
    }
    


/*
    4. Interacción con el usuario (Input)
    Como estás en la consola de Node.js, para pedir datos al usuario puedes usar funciones nativas para leer la terminal. Si no quieres enredarte instalando librerías externas como prompt-sync, puedes simular las entradas del usuario usando un array de "acciones predefinidas" al principio de tu código para simular que alguien interactúa con él, o usar process.argv para pasarle datos desde la terminal. (Elige lo que te sea más cómodo para estructurar el flujo). 
*/