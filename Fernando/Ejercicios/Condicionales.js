// Clasificar un número
console.log('Numero del 0 al 1 clasificado con:')
let num=Math.random()
if(num<=0.5){console.log(`If: Numero menor a 0.5 " ${num}"`)}
else if(num>0.5 && num<0.75){console.log(`Else If: Numero entre 0.5 y 0.75" ${num}"`)}
else{console.log(`Else: Numero que no haya sido cubierto por las otras condiciones " ${num}"`)}

switch(true){
    case num<0.25: console.log(`Switch case 0-0.25`)
        break;
    case num<0.50: console.log(`Switch case 0.25-0.50`)
        break;
    case num<0.75: console.log(`Switch case 0.50-0.75`)
        break;
    default: console.log(`Default case: si ninguna condicional lo cubre este sera`)
        break;  
}

(num>0.5) ?  (console.log(`Ternario: Mayor a 0.5`)) :(console.log(`Ternario: menor a 0.5`))

// validar edades:
let min = 10;
let max = 30;
let edad = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(edad)
//validacion con if else if
if(edad<18){    
    console.log("Apaga cam")
} else if(edad==16){console.log("Prende Cam")}
else{console.log("Acceso permitodo")}
 

switch(true){
    case edad<18: console.log(`Switch case menor 18`)
        break;
    case edad>=18&&edad<29: console.log(`Swtich case mayor o igual 18`)
        break;
    case edad>=29: console.log(`Switch case mayor 29`)
        break;
    default: console.log(`Default case: si ninguna condicional lo cubre este sera`) 
        break;  
}

(edad>18) ? (console.log("Bien")) : (console.log("mal"))
                      
//descuento segun condiciones Vendemos tamales, cada uno vale 15 pesos 
// El momento en el que compres más de 10 tamales, habra 10% de descuento, esto acomulable hasta 5 veces

let tamalespre=15;
let descuento=0.10;
let limite=5;

DesApli(5)

function DesApli(NumeroTamales){
    if(NumeroTamales>=10&&NumeroTamales<=50){
        PivDescuentos=Math.floor(NumeroTamales/10)
        console.log(PivDescuentos)
        Total=(NumeroTamales*tamalespre)-(PivDescuentos*0.10*(NumeroTamales*tamalespre))
    }else if(NumeroTamales>=10&&NumeroTamales>50){
        Total=(NumeroTamales*tamalespre)-(0.5*(NumeroTamales*tamalespre)) 
    }else{
        Total=NumeroTamales*tamalespre}
    return console.log(Total)
}

// En este caso en particular no conviene que usemos el switch ni la ternera a mi parecer ya que es más complejo de lo que una ternera puede tener
// aun asi con anidados haria dificil la lectura del codigo, y del switch podria funcionar pero me parece más facil la lectura de esto
// yo usaria los switches más para elecciones manuales.
