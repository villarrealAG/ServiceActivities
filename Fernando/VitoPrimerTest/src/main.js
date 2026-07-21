import './style.css'
import { Header } from './components/Header.js'
import { Footer } from './components/Footer.js'
import { Card } from './components/Card.js'

const app = document.querySelector('#app')

app.innerHTML = `
  ${Header()}
  <main class="app-main">
    <section class="hero-section">
      <h1>Hola mundo ITESI</h1>
      <p>Componentes reutilizables reutilizables: ejemplo: Cartas</p>
    </section>

    <section class="cards-grid">
      ${Card({ title: 'Carta 1', text: 'Test', accent: true })}
      ${Card({ title: 'Carta 2', text: 'Test.', accent: false })}
      ${Card({ title: 'Carta 3', text: 'Test.', accent: false })}
    </section>
    <p>Almacenadas en un contenedor como los que hicimos antes y es facil de añadir y entender todo.</p>
  </main>
  ${Footer()}
`
