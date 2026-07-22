const cardsData = [
  {
    title: "¿Qué problema resuelve React frente a HTML/CSS/JS suelto?",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=80",
    text: "Actualizar la página sin recargar: En la web tradicional, al navegar o enviar datos, el navegador suele recargar toda la página desde cero, lo que puede ser lento. React, usando una técnica llamada \"Virtual DOM\", identifica exactamente qué parte de la interfaz cambió y actualiza solamente esa parte de manera casi instantánea, dando una experiencia fluida e interactiva."
  },
  {
    title: "¿Qué es Node.js y npm?",
    image: "https://images.unsplash.com/photo-1627399270231-7d36245355a9?w=400&auto=format&fit=crop&q=80",
    text: "Node.js es un entorno de ejecución que permite correr JavaScript directamente en tu computadora (fuera del navegador). npm es su gestor de paquetes, una tienda gigantesca de código gratuito que te ayuda a descargar herramientas (como React o Vite) y gestionar dependencias de forma automática."
  },
  {
    title: "¿Qué es un componente (una función que devuelve JSX)?",
    image: "https://i.sstatic.net/eHRPf.png",
    text: "Es la pieza fundamental en React. Piensa en él como un bloque de Lego independiente y reutilizable. Es una función de JavaScript que devuelve JSX (la interfaz visual). Permite dividir la aplicación en partes pequeñas y autónomas que son mucho más fáciles de mantener y entender."
  },
  {
    title: "¿Qué es JSX (HTML dentro de JS)?",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=80",
    text: "JSX (JavaScript XML) es una extensión de sintaxis para JavaScript que permite escribir código con estructura similar a HTML dentro de tus archivos JS/JSX. Facilita la creación de interfaces visuales al juntar la lógica y la estructura en un mismo archivo."
  },
  {
    title: "Diferencias clave con HTML (className, cerrar todas las etiquetas)",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&auto=format&fit=crop&q=80",
    text: "Aunque JSX se parece a HTML, tiene reglas estrictas de JavaScript. Por ejemplo, se debe usar className en lugar de class (ya que class es una palabra reservada en JavaScript) y htmlFor en lugar de for. Además, todas las etiquetas deben cerrarse obligatoriamente."
  },
  {
    title: "Expresiones {} dentro de JSX",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80",
    text: "Dentro de JSX, cualquier código JavaScript válido que se coloque entre llaves {} será evaluado y renderizado dinámicamente. Esto te permite mostrar variables, realizar operaciones matemáticas, llamar funciones o usar operadores ternarios para condicionar lo que se ve en pantalla."
  }
]

export default cardsData
