const cardsData = [
  {
    title: "¿Qué problema resuelve React frente a HTML/CSS/JS suelto?",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=80",
    text: "Actualizar la página sin recargar: En la web tradicional, al navegar o enviar datos, el navegador suele recargar toda la página desde cero, lo que puede ser lento. React, usando una técnica llamada \"Virtual DOM\", identifica exactamente qué parte de la interfaz cambió y actualiza solamente esa parte de manera casi instantánea, dando una experiencia fluida e interactiva.",
    code: `// Vanilla JS: Re-renderiza todo el elemento
const elemento = document.getElementById("mensaje");
elemento.innerHTML = "<p>Contador: " + contador + "</p>";

// React: Solo actualiza el nodo de texto que cambió
return <p>Contador: {contador}</p>;`,
    type: "investigacion"
  },
  {
    title: "¿Qué es Node.js y npm?",
    image: "https://images.unsplash.com/photo-1627399270231-7d36245355a9?w=400&auto=format&fit=crop&q=80",
    text: "Node.js es un entorno de ejecución que permite correr JavaScript directamente en tu computadora (fuera del navegador). npm es su gestor de paquetes, una tienda gigantesca de código gratuito que te ayuda a descargar herramientas (como React o Vite) y gestionar dependencias de forma automática.",
    code: `# Instalar React y react-dom en tu proyecto local
npm install react react-dom

# Iniciar el servidor de desarrollo de Vite
npm run dev`,
    type: "investigacion"
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
}`,
    type: "investigacion"
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
);`,
    type: "investigacion"
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
/> // <-- Obligatorio cerrar la etiqueta auto-conclusiva`,
    type: "investigacion"
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
);`,
    type: "investigacion"
  },
  {
    title: "¿Qué es un estado (useState)?",
    image: "",
    text: "Es la memoria a corto plazo de un componente. Cuando este valor cambia, React automáticamente vuelve a dibujar (re-renderiza) el componente para reflejar el nuevo valor. Se declara usando el hook useState.",
    code: `import { useState } from 'react';

// Declaración de un estado contador con valor inicial 0
const [contador, setContador] = useState(0);

// Para actualizar: setContador(nuevoValor)`,
    type: "investigacion"
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
const clickState = () => { setClicksState(clicksState + 1); };`,
    type: "investigacion"
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
}`,
    type: "investigacion"
  },
  {
    title: '¿Qué es un "efecto secundario" en React?',
    image: "",
    text: "Se le llama efecto secundario (o side-effect) a cualquier acción que realiza nuestro código (en el interior de una función, por ejemplo) y afecta a algo que se encuentra fuera del ámbito de esa función, es decir, que estamos alterando algo no relacionado directamente con lo que devolvemos en la función.",
    code: `//Efectos secundarios
let counter = 0;

function incrementCounter() {
  counter++; // Modifica la variable global (efecto secundario)
}

incrementCounter();
console.log(counter); // 1


//Funciones puras
let counter = 0;

function incrementCounter(counter) {
  return counter + 1;
}

counter = incrementCounter(counter);
console.log(counter); // 1
`,
    type: "investigacion"
  },
  {
    title: '¿Qué es useEffect, su sintaxis básica, el arreglo de dependencias [] y por qué existe?',
    image: "",
    text: `Es una función de React diseñada para gestionar efectos secundarios (side-effects) de forma controlada y predecible.

Ejemplos de efectos secundarios: Peticiones a una API, suscripciones a eventos, temporizadores (setInterval / setTimeout), o modificación manual del DOM.`,
    code: `// Sintaxis básica
useEffect(() => {
  // 1. Código a ejecutar (Montaje / Actualización)

  return () => {
    // 2. Función de limpieza (Desmontaje / Antes de re-ejecutar)
  };
}, [/* 3. Array de dependencias */]);`,
    type: "investigacion"
  },
  {
    title: "¿Qué es fetch?",
    image: "",
    text: "Es una función nativa de JavaScript que se utiliza para hacer peticiones HTTP a recursos remotos (como APIs o archivos). Devuelve una Promise que se resuelve con el objeto Response. Es la forma moderna de hacer peticiones HTTP en JavaScript, reemplazando a XMLHttpRequest.",
    code: `// Sintaxis básica
const [users, setUsers] = useState([]);

const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  setUsers(data);
}  

useEffect(() => {
  getUsers();
}, []);

const HTMLUser = users.map((user) => (
  <div key={user.id}>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
));

return (
  <div>
    {HTMLUser}
  </div>
);  `,
    type: "investigacion"
  },
  {
    title: "¿Qué es un formulario controlado en React?",
    image: "",
    text: "Un formulario controlado es aquel en el que el valor de los campos de entrada está controlado por el estado de React. Es decir, el estado de React es la 'fuente de la verdad' para los valores de los campos del formulario. ",
    code: `import { useState } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    console.log('Nombre enviado:', nombre);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}`,
    type: "investigacion"
  },
  {
    title: "Concepto: useEffect + fetch juntos",
    image: "",
    text: "En React, las peticiones HTTP se consideran efectos secundarios (side-effects) porque interactúan con el exterior del componente. Para ejecutar fetch al cargar un componente, se envuelve la llamada dentro de useEffect con un arreglo de dependencias vacío []. De esta manera, garantizamos que la petición se realice únicamente una vez en el montaje inicial, evitando peticiones duplicadas en cada re-renderizado.",
    code: `// fetch se ejecuta únicamente al montar el componente
useEffect(() => {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => setData(data));
}, []); // <-- Importante: arreglo de dependencias vacío`,
    type: "investigacion"
  },
  {
    title: "Práctica: Traer datos de API y mostrarlos con .map()",
    image: "",
    text: "Consumiendo una API pública real (Digimon API). En el montaje inicial (useEffect con []), realizamos un fetch para cada ID del 1 al 11 y actualizamos el estado 'digimonData' agregando cada nuevo Digimon. En el JSX, recorremos este arreglo mediante .map() para pasar la información a cada componente <DigimonCards />.",
    code: `const [digimonData, setDigimonData] = useState([])
const base_url = 'https://digi-api.com/api/v1/digimon'

const fetchDigimon = async (id) => {
  try {
    const response = await fetch(\`\${base_url}/\${id}\`)
    const data = await response.json()
    setDigimonData((prevData) => [...prevData, data])
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  for (let i = 1; i <= 11; i++) {
    fetchDigimon(i)
  }
}, []); // <-- Se ejecuta una sola vez al montar el componente

return (
  <div className='grid grid-cols-3 gap-4'>
    {digimonData.map((digimon, index) => (
      <DigimonCards key={index} digimonData={digimon}/>
    ))}
  </div>
);`,
    type: "actividad"
  },
  {
    title: "Análisis: Provocar Bucle Infinito (olvidar [])",
    image: "",
    text: "Si olvidamos colocar el arreglo de dependencias [] en el useEffect de nuestra aplicación de Digimon, el efecto se ejecutará en cada render. Al montarse la página, se llama a fetchDigimon, el cual modifica el estado mediante setDigimonData. Como setDigimonData altera el estado de React, el componente se re-renderiza y ejecuta nuevamente fetchDigimon de forma indefinida, saturando el navegador y al servidor de la API.",
    code: `// ⚠️ BUCLE INFINITO (OLVIDAR []):
useEffect(() => {
  // Se ejecuta en cada renderizado por falta de []
  for (let i = 1; i <= 11; i++) {
    fetchDigimon(i) // <-- Llama a setDigimonData internamente
  }
}); // <-- ¡Omitido el arreglo []!
// Ciclo: Render -> Corre efecto -> fetchDigimon -> setDigimonData -> Re-render -> Corre efecto...`,
    type: "actividad"
  },
  {
    title: "Concepto: value + onChange ligados a useState",
    image: "",
    text: "En React, los formularios controlados vinculan el valor de un campo de entrada directamente a una variable de estado. Para poder escribir o interactuar con el campo, se requiere una función manejadora de eventos (onChange) que capture cada cambio del usuario y actualice el estado correspondiente. De esta manera, el estado de React es siempre la fuente de verdad única.",
    code: `const [texto, setTexto] = useState('');

return (
  <input 
    type="text" 
    value={texto} 
    onChange={(e) => setTexto(e.target.value)} 
  />
);`,
    type: "investigacion"
  },
  {
    title: "Práctica: Formulario Controlado con Prioridad",
    image: "",
    text: "Convertimos el campo de entrada de la lista de tareas en un formulario controlado, y añadimos un segundo campo desplegable (<select>) para asignar una prioridad ('Alta', 'Media', 'Baja') a cada tarea. Al enviar el formulario con onSubmit, se previene el refresco por defecto, se crea el objeto de la tarea con su texto y prioridad, y se limpian los estados de los campos.",
    code: `const [text, setText] = useState("");
const [priority, setPriority] = useState("media");

const addTask = (e) => {
  e.preventDefault();
  if (text.trim() === "") return;

  const newTask = {
    id: Date.now().toString(),
    text: text.trim(),
    priority: priority,
    completed: false
  };

  setTasks([newTask, ...tasks]);
  setText("");
  setPriority("media");
};`,
    type: "actividad"
  },
  {
    title: "Análisis: ¿Por qué sin onChange el input 'no deja escribir'?",
    image: "",
    text: "Al definir la propiedad 'value' de un input ligada a un estado de React sin asociar un controlador 'onChange', el navegador bloquea la escritura. Cada vez que presionas una tecla, el navegador intenta actualizar el input, pero como el estado no cambia (ya que no hay onChange que llame a la función set), React re-renderiza inmediatamente el input forzándolo a mostrar el valor actual del estado (vacío o inicial). Esto hace que parezca congelado.",
    code: `// ⚠️ INPUT BLOQUEADO (SIN ONCHANGE):
const [texto, setTexto] = useState("");

return (
  <input 
    type="text" 
    value={texto} // React obliga a que el valor siempre sea el estado "texto"
    // Sin onChange={(e) => setTexto(e.target.value)}
  />
);
// Al teclear, el estado sigue siendo "" y React vuelve a pintar el input vacío.`,
    type: "actividad"
  }
]

export default cardsData
