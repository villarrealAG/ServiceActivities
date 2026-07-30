import { useState, useEffect } from 'react'
import '../parte1/style.css'
import { Header } from '../parte1/components/Header.jsx'
import { Footer } from '../parte1/components/Footer.jsx'

export default function App() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=3')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al conectar con la API de Steam/CheapShark')
        }
        return response.json()
      })
      .then(data => {
        setGames(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Header />
      <main className="app-main">
        <section className="hero-section">
          <h1>Ofertas de Steam</h1>
        </section>
        <section className="task-list-section">
          <h2>Juegos en Oferta</h2>

          {!loading && !error && (
            <div className="cards-grid">
              {games.map((game) => {
                return (
                  <article key={game.dealID} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', textAlign: 'center' }}>
                    <div>
                      <img
                        src={game.thumb}
                        alt={game.title}
                        style={{ borderRadius: '8px', width: '120px', height: '60px', objectFit: 'cover', display: 'block', margin: '0 auto 1rem' }}
                      />
                      <h3 style={{ fontSize: '1rem', minHeight: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {game.title}
                      </h3>
                      <p style={{ color: '#5bb34aff', fontWeight: 'bold', margin: '0.5rem 0' }}>
                        ¡En Oferta!
                      </p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <a
                        href={`https://store.steampowered.com/app/${game.steamAppID}`}
                        target="_blank"
                      >
                        <button type="button" style={{ width: '100%', fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
                          Ver en Steam
                        </button>
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <section style={{ textAlign: 'center', margin: '2rem 0' }}>
          <a href="#/parte1">
            <button type="button">volver</button>
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
