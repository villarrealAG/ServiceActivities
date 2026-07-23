const cardsData = [
  {
    title: "¿Qué problema resuelve React frente a HTML/CSS/JS suelto?",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=80",
    text: "Actualizar la página sin recargar: En la web tradicional, al navegar o enviar datos, el navegador suele recargar toda la página desde cero, lo que puede ser lento. React, usando una técnica llamada \"Virtual DOM\", identifica exactamente qué parte de la interfaz cambió y actualiza solamente esa parte de manera casi instantánea, dando una experiencia fluida e interactiva.",
    code: `// Vanilla JS: Re-renderiza todo el elemento
const elemento = document.getElementById("mensaje");
elemento.innerHTML = "<p>Contador: " + contador + "</p>";

// React: Solo actualiza el nodo de texto que cambió
return <p>Contador: {contador}</p>;`
  },
  {
    title: "¿Qué es Node.js y npm?",
    image: "https://images.unsplash.com/photo-1627399270231-7d36245355a9?w=400&auto=format&fit=crop&q=80",
    text: "Node.js es un entorno de ejecución que permite correr JavaScript directamente en tu computadora (fuera del navegador). npm es su gestor de paquetes, una tienda gigantesca de código gratuito que te ayuda a descargar herramientas (como React o Vite) y gestionar dependencias de forma automática.",
    code: `# Instalar React y react-dom en tu proyecto local
npm install react react-dom

# Iniciar el servidor de desarrollo de Vite
npm run dev`
  },
  {
    title: "¿Qué es un componente (una función que devuelve JSX)?",
    image: "https://i.sstatic.net/eHRPf.png",
    text: "Es la pieza fundamental en React. Piensa en él como un bloque de Lego independiente y reutilizable. Es una función de JavaScript que devuelve JSX (la interfaz visual). Permite dividir la aplicación en partes pequeñas y autónomas que son mucho más fáciles de mantener y entender.",
    code: `// Un componente simple que recibe propiedades (props)
function Saludo({ nombre }) {
  return (
    <div className="saludo-box">
      <h1>¡Hola, {nombre}!</h1>
    </div>
  );
}`
  },
  {
    title: "¿Qué es JSX (HTML dentro de JS)?",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=80",
    text: "JSX (JavaScript XML) es una extensión de sintaxis para JavaScript que permite escribir código con estructura similar a HTML dentro de tus archivos JS/JSX. Facilita la creación de interfaces visuales al juntar la lógica y la estructura en un mismo archivo.",
    code: `// JSX se compila a JavaScript puro por debajo
const elemento = (
  <section className="hero">
    <h1>Bienvenidos a React</h1>
    <p>Empecemos a programar.</p>
  </section>
);`
  },
  {
    title: "Diferencias clave con HTML (className, cerrar todas las etiquetas)",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&auto=format&fit=crop&q=80",
    text: "Aunque JSX se parece a HTML, tiene reglas estrictas de JavaScript. Por ejemplo, se debe usar className en lugar de class (ya que class es una palabra reservada en JavaScript) y htmlFor en lugar de for. Además, todas las etiquetas deben cerrarse obligatoriamente.",
    code: `// HTML: <input class="form-input" disabled>
// JSX equivalente en React:
<input 
  className="form-input" 
  disabled={true} 
  type="text" 
/> // <-- Obligatorio cerrar la etiqueta auto-conclusiva`
  },
  {
    title: "Expresiones {} dentro de JSX",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80",
    text: "Dentro de JSX, cualquier código JavaScript válido que se coloque entre llaves {} será evaluado y renderizado dinámicamente. Esto te permite mostrar variables, realizar operaciones matemáticas, llamar funciones o usar operadores ternarios para condicionar lo que se ve en pantalla.",
    code: `const usuario = { nombre: "Adrian", edad: 20 };

return (
  <div>
    <h2>Usuario: {usuario.nombre.toUpperCase()}</h2>
    <p>Acceso: {usuario.edad >= 18 ? "Permitido ✅" : "Restringido ❌"}</p>
  </div>
);`
  },
  {
    title: "¿Qué es un estado (useState)?",
    image: "",
    text: "Es la memoria a corto plazo de un componente. Cuando este valor cambia, React automáticamente vuelve a dibujar (re-renderiza) el componente para reflejar el nuevo valor. Se declara usando el hook useState.",
    code: `import { useState } from 'react';

// Declaración de un estado contador con valor inicial 0
const [contador, setContador] = useState(0);

// Para actualizar: setContador(nuevoValor)`
  },
  {
    title: "¿Por qué React necesita useState en vez de una variable normal (re-render)?",
    image: "",
    text: "Cuando una variable normal cambia en JavaScript, el navegador no se entera automáticamente. React necesita que le 'avises' de forma explícita cuando algo ha cambiado para poder actualizar la interfaz. useState es esa herramienta que le comunica a React: 'Oye, este valor cambió, actualiza la pantalla'. Si usaras una variable normal, podrías cambiar el valor en el código, pero la página seguiría mostrando el valor antiguo.",
    code: `// VARIABLE NORMAL: no avisa a React de cambios
let clicks = 0;
const clickNormal = () => { clicks += 1; }; // No pasa nada en pantalla

// CON STATE: React re-renderiza y muestra el nuevo valor
const [clicksState, setClicksState] = useState(0);
const clickState = () => { setClicksState(clicksState + 1); };`
  },
  {
    title: "Eventos en React (on click, on change)",
    image: "",
    text: "Los eventos en React son muy similares a los de HTML, pero se escriben con notación 'camelCase' (como onClick, onChange) y reciben una función como manejador en lugar de un string de texto.",
    code: `function ManejadorEventos() {
  const alHacerClick = () => alert("¡Hiciste click!");
  
  return (
    <button onClick={alHacerClick}>
      Presióname
    </button>
  );
}`
  }
]

export default cardsData
