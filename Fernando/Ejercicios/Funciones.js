// Las funciones son bloques de codigo que se ejecutan cuando son invocadas, pueden recibir parametros y retornar valores
//Funciones practicas, Primera: Validar edad
function validarEdad(edad){
    switch(true){
        case edad>=100:
            console.log("Edad Invalida")
            break;
        case edad>=18 && edad<100:
            console.log("Eres mayor de edad")
            break;
        case edad<18:
            console.log("Tas muy chiquillo")
            break;
        default:
            console.log("El valor ingresado es un invalido")
    }
}
//Se puede hacer funciones de bucles
function muchosHolasfor(){
    for(i=1;i<10;i++ ){
        console.log("hola")
    }
}
let tamalespre=15;
let descuento=0.10;
let limite=5;
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
//Aplicando las funciones
DesApli(5)
validarEdad(80)
muchosHolasfor()