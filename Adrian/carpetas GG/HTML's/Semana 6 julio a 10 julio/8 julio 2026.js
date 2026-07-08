let precio = 1500
let descuento = 20
let edad = 18
let numero = 5

var verificacionEdad = edad >= 18 ? "Mayor" : "Menor";
console.log(`La persona es: ${verificacionEdad} de edad`);

if (numero > 0) {
    console.log("El numero es positivo");
} else if (numero == 0) {
    console.log("El numero es cero");
} else {
    console.log("El numero es negativo");
}

let categoria = "b"; // Categoría de descuento ('a' o 'b')

switch (categoria) {
    case "b": {
        descuento = 20; // 20% de descuento para categoría b
        console.log("Categoría B: se aplica un 20% de descuento.");
        break;
    }
    case "a": {
        descuento = 10; // 10% de descuento para categoría a
        console.log("Categoría A: se aplica un 10% de descuento.");
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