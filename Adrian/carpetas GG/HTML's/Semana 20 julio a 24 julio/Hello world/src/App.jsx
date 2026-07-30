import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Card, { BotonesInteractivos } from './components/Card'
import Footer from './components/Footer'
import cardsData from './data/information'

function App() {
  const [filter, setFilter] = useState('todas')

  const filteredCards = cardsData.filter((v) => filter === 'todas' || v.type === filter)

  const CardDataList = filteredCards.map((v, index) => {
    return (
      <Card key={index} title={v.title} image={v.image} text={v.text} code={v.code} type={v.type}>
        {/* Tabla explicativa de dependencias para useEffect */}
        {v.title.includes("useEffect") && (
          <div className="tabla-container">
            <table className="tabla-useEffect">
              <thead>
                <tr>
                  <th>Dependencias</th>
                  <th>Descripción</th>
                  <th>Montaje</th>
                  <th>En cada renderizado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>[]</code></td>
                  <td>Sólo se ejecuta la primera vez (montaje).</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td><code>[dep1]</code></td>
                  <td>Se ejecuta primera vez y al cambiar.</td>
                  <td>✅</td>
                  <td>🟧 Cuando cambia dep1</td>
                </tr>
                <tr>
                  <td><code>[dep1, dep2]</code></td>
                  <td>Se ejecuta primera vez y al cambiar.</td>
                  <td>✅</td>
                  <td>🟧 Cuando cambian dep1 y/o dep2</td>
                </tr>
                <tr>
                  <td><code>Sin array de dependencias</code></td>
                  <td>Se ejecuta primera vez y en cada renderizado.</td>
                  <td>✅</td>
                  <td>✅ Siempre</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    )
  })

  return (
    <div className="App">
      <Header />
      
      {/* Botones de Filtro Premium */}
      <div className="filter-container">
        <button 
          className={`filter-btn ${filter === 'todas' ? 'active' : ''}`}
          onClick={() => setFilter('todas')}
        >
          Todas
        </button>
        <button 
          className={`filter-btn ${filter === 'investigacion' ? 'active' : ''}`}
          onClick={() => setFilter('investigacion')}
        >
          Investigaciones
        </button>
        <button 
          className={`filter-btn ${filter === 'actividad' ? 'active' : ''}`}
          onClick={() => setFilter('actividad')}
        >
          Actividades
        </button>
      </div>

      <div className="cards-container">
        {CardDataList}
      </div>
      <BotonesInteractivos />
      <Footer />
    </div>
  )
}

export default App
