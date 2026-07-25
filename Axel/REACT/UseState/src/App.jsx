// ¿Qué es el estado (State)?
// --------------------------
// El estado (state) es información que un componente guarda y que puede
// cambiar con el tiempo.
//
// Cuando el estado cambia, React vuelve a renderizar el componente para
// actualizar la interfaz automáticamente.
//
// Ejemplos de información que suele guardarse en el estado:
// - Un contador.
// - El texto de un input.
// - Si un menú está abierto o cerrado.
// - Una lista de tareas.
// - Datos obtenidos de una API.


/**
 * ¿Por qué React necesita useState en vez de una variable normal?
 * ---------------------------------------------------------------
 * Una variable normal puede cambiar de valor, pero React no detecta
 * ese cambio y, por lo tanto, no actualiza la interfaz.
 *
 * Ejemplo:
 *
 * let contador = 0;
 * contador++;
 *
 * Aunque "contador" cambie, el componente NO se vuelve a renderizar.
 *
 * En cambio, useState informa a React que el estado cambió.
 *
 * const [contador, setContador] = useState(0);
 *
 * setContador(contador + 1);
 *
 * Al usar la función "setContador", React vuelve a renderizar el
 * componente y muestra el nuevo valor automáticamente.
 */


/**
 * ¿Qué significa "re-render"?
 * ---------------------------
 * Un re-render (nuevo renderizado) ocurre cuando React vuelve a ejecutar
 * el componente para generar una versión actualizada de la interfaz.
 *
 * React realiza un re-render cuando:
 * - Cambia el estado (useState).
 * - Cambian las props.
 * - Cambia el contexto (Context API).
 *
 * React NO recarga toda la página; únicamente actualiza las partes
 * necesarias de la interfaz.
 */


/**
 * Eventos en React
 * ----------------
 * Los eventos permiten ejecutar código cuando el usuario interactúa
 * con la aplicación.
 *
 * React utiliza nombres de eventos en camelCase y recibe una función
 * como manejador del evento.
 *
 * Algunos eventos comunes:
 *
 * onClick   -> Se ejecuta al hacer clic.
 * onChange  -> Se ejecuta cuando cambia el valor de un input.
 * onSubmit  -> Se ejecuta al enviar un formulario.
 * onMouseOver -> Al pasar el cursor sobre un elemento.
 * onKeyDown -> Al presionar una tecla.
 *
 * Ejemplos:
 *
 * <button onClick={miFuncion}>Aceptar</button>
 *
 * <input
 *   type="text"
 *   onChange={manejarCambio}
 * />
 *
 * En React no se escribe:
 *
 * onclick=""
 * onchange=""
 *
 * Como en HTML, sino:
 *
 * onClick={...}
 * onChange={...}
 */

import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import Interactivo from './components/Interactivo';

function App() {
  const productos = [
    { id: 1, titulo: "Laptop Pro", imagen: "https://imgs.search.brave.com/dCkv3-qoE0vySDGYjrSOu8sPKDg1vr-oP9eR5pddtIc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDgv/NDc1LzY5NC9zbWFs/bC9tb2Rlcm4tbGFw/dG9wLWlzb2xhdGVk/LW9uLXdoaXRlLWJh/Y2tncm91bmQtd2l0/aC1jbGlwcGluZy1w/YXRoLTNkLWlsbHVz/dHJhdGlvbi1wbmcu/cG5n", texto: "Laptop potente para programación." },
    { id: 2, titulo: "Mouse Gamer", imagen: "https://imgs.search.brave.com/M6lacZoHx3iv_A2C4hSS8rtRH9kJzGSIPGxGx29talE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTgv/MjcyLzUwMS9zbWFs/bC93aXJlbGVzcy1t/b3VzZS1taW5pbWFs/aXN0LWRlc2lnbi1m/b3Itc2VhbWxlc3Mt/Y29tcHV0ZXItaW50/ZXJhY3Rpb24tZnJl/ZS1wbmcucG5n", texto: "Mouse ergonómico con luces RGB." }
  ];

  return (
    <div>
      <Header />
      <Interactivo />
      <main style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', padding: '20px' }}>
        {productos.map((prod) => (
          <Card 
            key={prod.id} 
            titulo={prod.titulo} 
            imagen={prod.imagen} 
            texto={prod.texto} 
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;