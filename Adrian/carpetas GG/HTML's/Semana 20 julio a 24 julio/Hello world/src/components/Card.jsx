import "./Card.css";

function Card() {
    return (<div className="Card">
        <h2>¿Qué problema resuelve React frente a HTML/CSS/JS suelto?</h2>
        <p>Actualizar la página sin recargar: En la web tradicional, al navegar o enviar datos,
            el navegador suele recargar toda la página desde cero, lo que puede ser lento. React,
            usando una técnica llamada "Virtual DOM", identifica exactamente qué parte de la
            interfaz cambió y actualiza solamente esa parte de manera casi instantánea,
            dando una experiencia fluida e interactiva.</p>
        <p>Actualizar la página sin recargar: En la web tradicional, al navegar o enviar datos,
            el navegador suele recargar toda la página desde cero, lo que puede ser lento. React,
            usando una técnica llamada "Virtual DOM", identifica exactamente qué parte de la
            interfaz cambió y actualiza solamente esa parte de manera casi instantánea,
            dando una experiencia fluida e interactiva.</p>

        <h2>¿Qué es Node.js y npm?</h2>
        <p>Node.js: Tradicionalmente, JavaScript solo funcionaba dentro del navegador web.
            Node.js es un programa que te permite correr JavaScript directamente en tu computadora.
            Esto es esencial porque las herramientas modernas que "construyen" tu aplicación
            (como Vite) están hechas en JavaScript y necesitan correr en tu sistema.</p>
        <p>npm (Node Package Manager): Es el gestor de paquetes de Node.
            Básicamente, es una tienda gigantesca de código gratuito. En lugar de escribir todo
            desde cero, usas npm para descargar herramientas que otros ya hicieron, como React o Vite,
            además de que te ayuda a gestionar las dependencias de tu proyecto de forma automática.</p>
    </div>)
}

export default Card