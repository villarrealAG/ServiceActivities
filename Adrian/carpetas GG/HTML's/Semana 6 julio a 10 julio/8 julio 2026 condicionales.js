
let edad = 18
var verificacionEdad = edad >= 18 ? "Mayor" : "Menor";
console.log(`La persona es: ${verificacionEdad} de edad`);

let numero = 5
if (numero > 0) {
    console.log("El numero es positivo");
} else if (numero == 0) {
    console.log("El numero es cero");
} else {
    console.log("El numero es negativo");
}

let tipoDesc = "c";
let precio = 1500

switch (tipoDesc) {
    case "a": {
        descuento = 20;
        console.log("Categoría A: se aplica un 20% de descuento.");
        break;
    }
    case "b": {
        descuento = 10;
        console.log("Categoría B: se aplica un 10% de descuento.");
        break;
    }
    case "c": {
        descuento = 90;
        console.log("Categoría C: se aplica un 90% de descuento.");
        break;
    }
    default: {
        descuento = 0;
        console.log("No se encontró la categoría de descuento.");
        break;
    }
}

// Cálculo del descuento y precio final
let cantidadDescuento = (precio * descuento) / 100;
let precioFinal = precio - cantidadDescuento;

console.log(`Precio original: $${precio}`);
console.log(`Ahorro por descuento: $${cantidadDescuento}`);
console.log(`Precio final a pagar: $${precioFinal}`);