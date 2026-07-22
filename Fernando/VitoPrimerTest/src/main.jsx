import './style.css'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Card } from './components/Card.jsx'
import Usuario from './usuario.jsx'
import ReactDOM from 'react-dom/client'
const usuarios = [
          { nombre: "Fernando", id:696769, FechaRe:"2024-06-01", cuentaActiva: true },
          { nombre: "Adrian", id:777, FechaRe:"2024-06-01", cuentaActiva: false },
          { nombre: "Axel", id:68686, FechaRe:"2024-06-01", cuentaActiva: true },
          ];

function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <section className="hero-section">
          <h1>Hola mundo ITESI</h1>
          <p>Componentes reutilizables reutilizables: ejemplo: Cartas</p>
        </section>
        <section className="cards-grid">
          <Card title="Carta 1" text="Test" accent={true} link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJKqD8E3AkhuTeZk4ouO1a4QLZ0iCLgrZpgxjJvkmcw&s=10" />
          <Card title="Carta 2" text="Test." accent={false} link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRR1mCrqQj6QdhQO8YP7Fu7C1iKczdVVpSzqtSKVEeg&s=10" />
          <Card title="Carta 3" text="Test." accent={true} link="https://scontent.fbjx1-3.fna.fbcdn.net/v/t39.30808-6/509428479_742057525434100_4639794182002668899_n.jpg?stp=dst-jpg_tt6&cstp=mx768x960&ctp=p168x128&_nc_cat=111&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=lYNaCwZBL_oQ7kNvwF7svJD&_nc_oc=AdoEiSTfYzsEBV1fwRQb6xj2UUDAx2_Jq4tW7Kjwbd6G7sjk_rvH_KaLG9_iD6f21SG-mCZ9zRbdUAncJBvuTltI&_nc_zt=23&_nc_ht=scontent.fbjx1-3.fna&_nc_gid=Mwv8YqJcGyWvpA1HajAEjw&_nc_ss=7b289&oh=00_AQAQlWZs5gHSb4j5JIgSraslhy7u6agGsvfyVIDIqSdxDw&oe=6A66B33A"/>
        </section>
        <p>Almacenadas en un contenedor como los que hicimos antes y es facil de añadir y entender todo.</p>
        <section id="HijosPadres">
          <p>Aqui voy a hacer uso de componentes hijos y padres y guardarlos en un arreglo para asi simular que lleguen de una base de datos y renderizar sin tener que editar el html</p>
          <section className="cards-grid">
          {usuarios.map((usuario) => (
          <Usuario
            key={usuario.id}
            nombre={usuario.nombre}
            id={usuario.id}
            FechaRe={usuario.FechaRe}
            cuentaActiva={usuario.cuentaActiva}
          />
        ))}
          </section>
        <p>Aqui pues usamos la etiqueta "creada" de usuario con varios atributos personalziados que se mandan, todo esto es funcional en cuestion de reutilizar cosas solo es cuestion de renviar la informacion que queramos que se muestre en formato</p>
        
        </section>
      </main>
      <Footer />
    </>
  )
}

const app = document.querySelector('#app')
ReactDOM.createRoot(app).render(<App />)

