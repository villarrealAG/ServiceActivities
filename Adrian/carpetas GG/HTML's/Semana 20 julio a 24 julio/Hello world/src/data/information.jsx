const cardsData = [
  {
    title: "¿Qué problema resuelve React frente a HTML/CSS/JS suelto?",
    content: (
      <p>Actualizar la página sin recargar: En la web tradicional, al navegar o enviar datos,
        el navegador suele recargar toda la página desde cero, lo que puede ser lento. React,
        usando una técnica llamada "Virtual DOM", identifica exactamente qué parte de la
        interfaz cambió y actualiza solamente esa parte de manera casi instantánea,
        dando una experiencia fluida e interactiva.</p>
    )
  },
  {
    title: "¿Qué es Node.js y npm?",
    content: (
      <>
        <p><strong>Node.js:</strong> Tradicionalmente, JavaScript solo funcionaba dentro del navegador web.
          Node.js es un programa que te permite correr JavaScript directamente en tu computadora.
          Esto es esencial porque las herramientas modernas que "construyen" tu aplicación
          (como Vite) están hechas en JavaScript y necesitan correr en tu sistema.</p>
        <p><strong>npm (Node Package Manager):</strong> Es el gestor de paquetes de Node.
          Básicamente, es una tienda gigantesca de código gratuito. En lugar de escribir todo
          desde cero, usas npm para descargar herramientas que otros ya hicieron, como React o Vite,
          además de que te ayuda a gestionar las dependencias de tu proyecto de forma automática.</p>
      </>
    )
  },
  {
    title: "¿Qué es un componente (una función que devuelve JSX)?",
    content: (
      <p>Es la pieza fundamental en React. Piensa en él como un bloque de Lego independiente
        y reutilizable. Es una función de JavaScript que devuelve JSX (la interfaz visual).
        Permite dividir la aplicación en partes pequeñas y autónomas que son mucho más fáciles de
        mantener y entender.</p>
    )
  },
  {
    title: "¿Qué es JSX (HTML dentro de JS)?",
    content: (
      <p>JSX (JavaScript XML) es una extensión de sintaxis para JavaScript que permite escribir
        código con estructura similar a HTML dentro de tus archivos JS/JSX. Facilita la creación
        de interfaces visuales al juntar la lógica y la estructura en un mismo archivo.</p>
    )
  },
  {
    title: "Diferencias clave con HTML (className, cerrar todas las etiquetas)",
    content: (
      <p>Aunque JSX se parece a HTML, tiene reglas estrictas de JavaScript. Por ejemplo, se debe usar
        <strong> className</strong> en lugar de <em>class</em> (ya que class es una palabra reservada en JavaScript)
        y <strong> htmlFor</strong> en lugar de <em>for</em>. Además, todas las etiquetas deben cerrarse
        obligatoriamente (por ejemplo, <code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code> o <code>&lt;br /&gt;</code>).</p>
    )
  },
  {
    title: "Expresiones {} dentro de JSX",
    content: (
      <p>Dentro de JSX, cualquier código JavaScript válido que se coloque entre llaves <code>&#123;&#125;</code>
        será evaluado y renderizado dinámicamente. Esto te permite mostrar variables, realizar operaciones
        matemáticas, llamar funciones o usar operadores ternarios para condicionar lo que se ve en pantalla.</p>
    )
  }
]

export default cardsData
