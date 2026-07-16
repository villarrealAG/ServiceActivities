//Aqui hacemos uso de el map para sacar la raiz de cada cosa  (Numero)
function pordos(numbers) {
  return numbers.map(function (x) {
    return x * 2;
  });
}
// Tambien se pueden hacer otro tipo de crear un nuevo arreglo que sea los que cumplan con ciertas condiciones, para eso usamos el filter
function mayoresQueCinco(numbers) {
  return numbers.filter(function (x) {
    return x > 5;
  });
}
var numbers = [1, 5, 10, 15];
var doubles = pordos(numbers);
var mayores = mayoresQueCinco(doubles);

console.log(numbers, doubles, mayores);

//Ahora el callback es una funcion que se pasa como argumento a otra funcion, y se ejecuta dentro de esa funcion, es decir, es una funcion que se ejecuta dentro de otra funcion, y se puede usar para hacer cosas asincronas, es decir, que se ejecuten despues de cierto tiempo, o cuando se cumpla cierta condicion, o cuando se haga click en un boton, etc.
function callbackExample() {
  console.log("Antes del callback");
    setTimeout(function () {
    console.log("Dentro del callback");
  }, 2000);
  console.log("Despues del callback");
}
callbackExample();


