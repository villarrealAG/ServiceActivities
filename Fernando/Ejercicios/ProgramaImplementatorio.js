// Rogue Like de un dado 
// Tienes que conseguir 100 en la sumatoria de tu array 

let dado=[]
let SumaTotal=0
let SumaTotal2=0
let SumaTotal3=0
for(i=0;i<5;i++){
let =aditamiento =Math.floor(Math.random()*10)
    dado.push(aditamiento)
    SumaTotal = dado.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
}    
console.log("Primera tirada:")
console.log(SumaTotal)
console.log("Si tu numero es menor a 50, se multiplicara por 2 y daras otra tirada de 3 dados, si es mayor a 50 dos veces más")

if(SumaTotal<=50){
    SumaTotal=SumaTotal*2
    for(i=0;i<3;i++){
        let =aditamiento =Math.floor(Math.random()*10)
            dado.push(aditamiento)
            SumaTotal2 = dado.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        } 
    console.log(SumaTotal,"+",SumaTotal2,"=",SumaTotal+SumaTotal2)
    
}else{
    SumaTotal=SumaTotal*2
    for(i=0;i<3;i++){
        let =aditamiento =Math.floor(Math.random()*10)
            dado.push(aditamiento)
            SumaTotal2 = dado.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        } 
    console.log(SumaTotal,"+",SumaTotal2,"=",SumaTotal+SumaTotal2)       


}       
