const usuario = "Adrian"
const nivel = "998"
const sistema = "Linux"
const modoBlack = true
const procesos = 3

//console.log(`El usuario ${usuario} está a punto de alcanzar el nivel ${nivel + 1}.`)
//console.log(`Interfaz configurada en modo ${modoBlack ? "Oscuro" : "Claro"} corriendo sobre ${sistema}.`)
/*/console.log(`--- REPORTE DE SISTEMA ---
Administrador: ${usuario}
Carga del procesador: ${procesos * 15}%
---------------------------`)/*/
//console.log(`Estado de alerta: ${procesos > 5 ? "Crítico" : "Estable"}. Procesos restantes para límite: ${10 - procesos}.`)
console.log(`Diagnóstico de ${sistema}: ${procesos > 0 ? `Se detectaron ${procesos} procesos activos del usuario ${usuario}.` : `No hay actividad registrada.`}`)