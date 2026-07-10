/*/
--- BIENVENIDO Usuario ---
Tu saldo actual es: $1000

¿Qué deseas hacer?
1. Consultar saldo
2. Depositar dinero
3. Retirar dinero
4. Salir

Elige una opción: 3
> ¿Cuánto deseas retirar?: 1500
> ERROR: No tienes fondos suficientes.

--- BIENVENIDO AL BANCO VIRTUAL ---
...
/*/

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const preguntar = (texto) => {
    return new Promise((resolve) => {
        readline.question(texto, (respuesta) => {
            resolve(respuesta)
        })
    })
}

async function cajero() {
    let saldo = 10;
    const usuario = "Piggle";
    let ejecucion = true;

    console.log(`Bienvenido ${usuario}`);

    while (ejecucion) {
        console.clear();
        console.log(`Bienvenido ${usuario}`);
        console.log("1. Consultar saldo")
        console.log("2. Depositar dinero")
        console.log("3. Retirar dinero")
        console.log("4. Salir")

        let respuestaOpcion = Number(await preguntar("Elige una opcion: "))
        let opcion = parseInt(respuestaOpcion);

        switch (opcion) {
            case 1: {
                console.clear();
                console.log(`Tu saldo es: ${saldo}`)
                await preguntar("Presiona Enter para continuar")
                break;
            }
            case 2: {
                console.clear();
                let respuestaMonto = Number(await preguntar("¿Cuanto desea depositar?: "))
                let monto = parseInt(respuestaMonto)

                if (monto > 0) {
                    saldo += monto
                    console.log(`Saldo actual: ${saldo}`)
                } else {
                    console.log("Error: No puedes depositar dinero menor a 0")
                }
                break;
            }
            case 3: {
                console.clear();
                let respuestaRetiro = Number(await preguntar("¿Cuanto desea retirar?"))
                let retiro = parseInt(respuestaRetiro)

                if (retiro > 0 && retiro <= saldo) {
                    saldo -= retiro
                    console.log(`Saldo actual: ${saldo}`)
                } else if (retiro > saldo) {
                    console.log("Error: No tienes fondos suficientes")
                } else {
                    console.log("Error: No puedes retirar dinero menor a 0")
                }

                break;
            }
            case 4: {
                console.clear();
                console.log("Hasta luego")
                ejecucion = false;
                readline.close();
                break;
            }
            default: {
                console.log("Opcion no valida")
                break;
            }
        }
    }
}

cajero();