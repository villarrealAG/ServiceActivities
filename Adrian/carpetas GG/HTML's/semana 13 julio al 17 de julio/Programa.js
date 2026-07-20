const AdministradorTareas = [
    {
        nombre: "Microsoft Edge",
        Estado: "Ahorro de energia",
        CPU: "0 %",
        Memoria: "875.9 MB",
        Consumo: "Alto"
    },
    {
        nombre: "Visual Studio Code",
        Estado: "En ejecución",
        CPU: "5 %",
        Memoria: "420.3 MB",
        Consumo: "Moderado"
    },
    {
        nombre: "Spotify",
        Estado: "Activo",
        CPU: "1 %",
        Memoria: "210.8 MB",
        Consumo: "Bajo"
    },
    {
        nombre: "Explorador de archivos",
        Estado: "En espera",
        CPU: "0 %",
        Memoria: "95.4 MB",
        Consumo: "Muy bajo"
    }
]

function leerArray(arreglo){
    console.log("\nDetalle de tareas")
    arreglo.forEach((tareas, indice) => {
        console.log(`\nTarea #${indice + 1}: ${tareas.nombre}`)
        console.log(`Estado: ${tareas.Estado}`)
        console.log(`CPU: ${tareas.CPU}`)
        console.log(`Memoria: ${tareas.Memoria}`)
        console.log(`Consumo: ${tareas.Consumo}`)
    })
    console.log("---------------------------")
}

function add(arreglo, nuevoObjeto) {
    arreglo.push(nuevoObjeto)
}

function filtrarConsumo(nivelConsumo) {
    const TareasFiltradas = AdministradorTareas.filter((tarea) => tarea.Consumo === nivelConsumo)
    return TareasFiltradas
}

function listarTareas(arreglo) {
    arreglo.forEach((tarea, indice) => {
        console.log(`${indice + 1}. ${tarea.nombre} (Consumo: ${tarea.Consumo})`)
    })
}


// --- EJECUCIÓN DEL PROGRAMA ---

leerArray(AdministradorTareas)

console.log("\nlista resumida")
listarTareas(AdministradorTareas)

let nuevaApp = {
    nombre: "Nueva tarea",
    Estado: "Pendiente",
    CPU: "0 %",
    Memoria: "0 MB",
    Consumo: "Bajo"
}

// Agregamos y volvemos a leer
add(AdministradorTareas, nuevaApp)
leerArray(AdministradorTareas)

// Filtramos y mostramos (Corregido: nombre de la función listarTareas)
const tareasAltas = filtrarConsumo("Alto")
console.log("\n--- TAREAS CON CONSUMO ALTO ---")
listarTareas(tareasAltas)
