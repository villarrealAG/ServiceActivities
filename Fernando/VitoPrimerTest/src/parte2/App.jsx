import { useState, useEffect } from 'react'
import '../parte1/style.css'
import { Header } from '../parte1/components/Header.jsx'
import { Footer } from '../parte1/components/Footer.jsx'

function useSteamDeals() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=9&sortBy=DealRating')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo conectar con la API')
        return res.json()
      })
      .then((data) => { setDeals(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [])

  return { deals, loading, error }
}

function useWishlist() {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (game) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.steamAppID === game.steamAppID)
      if (exists) return prev
      return [...prev, { steamAppID: game.steamAppID, title: game.title }]
    })
  }

  const removeFromWishlist = (steamAppID) => {
    setWishlist((prev) => prev.filter((item) => item.steamAppID !== steamAppID))
  }

  return { wishlist, addToWishlist, removeFromWishlist }
}

export default function App() {
  const { deals, loading, error } = useSteamDeals()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  return (
    <>
      <Header />
      <main className="app-main">

        <section className="hero-section">
          <h1>Ofertas de Steam</h1>
          <p>Cargadas con <code>useEffect</code> desde CheapShark</p>
        </section>

        <section className="task-list-section">
          <h2>Juegos en oferta</h2>

          {loading && <p>Cargando ofertas...</p>}
          {error && <p>⚠️ {error}</p>}

          {!loading && !error && (
            <div className="cards-grid">
              {deals.map((game) => {
                const enWishlist = wishlist.some((w) => w.steamAppID === game.steamAppID)
                return (
                  <article key={game.dealID} className="card">
                    <img
                      src={game.thumb}
                      alt={game.title}
                      style={{ borderRadius: '4px', width: '100%', height: '60px', objectFit: 'cover' }}
                    />
                    <h3>{game.title}</h3>
                    <p>
                      <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '0.5rem' }}>
                        ${game.normalPrice}
                      </span>
                      <strong>${game.salePrice}</strong>
                      {'  '}
                      <span className="priority-badge priority-baja">
                        -{Math.round(game.savings)}%
                      </span>
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <a
                        href={`https://store.steampowered.com/app/${game.steamAppID}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button type="button">Ver en Steam</button>
                      </a>
                      <button
                        type="button"
                        onClick={() => addToWishlist(game)}
                        disabled={enWishlist}
                        style={{ opacity: enWishlist ? 0.5 : 1 }}
                      >
                        {enWishlist ? '✓ En wishlist' : '+ Wishlist'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {/* ── Wishlist local ── */}
        <section className="task-list-section">
          <h2>Mi Wishlist</h2>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Guardada localmente con <code>useState</code>. Los cambios no van a la API.
          </p>

          {wishlist.length === 0 && (
            <p style={{ color: '#999' }}>No hay juegos en tu wishlist. Agrégalos desde las tarjetas de arriba.</p>
          )}

          <ul className="task-list">
            {wishlist.map((item) => (
              <li key={item.steamAppID} className="task-item">
                <span>{item.title}</span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <a
                    href={`https://store.steampowered.com/app/${item.steamAppID}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button type="button">Ir a Steam</button>
                  </a>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.steamAppID)}
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ textAlign: 'center', margin: '2rem 0' }}>
          <a href="#/parte1">
            <button type="button">← Volver a parte 1</button>
          </a>
        </section>

      </main>
      <Footer />
    </>
  )
}
