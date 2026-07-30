import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import AppParte1 from './parte1/App.jsx'
import AppParte2 from './parte2/App.jsx'

function Router() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    // Inicializar la ruta basándose en el hash actual
    const hash = window.location.hash
    if (hash === '#/parte2') return 'parte2'
    return 'parte1'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#/parte2') {
        setCurrentRoute('parte2')
      } else {
        setCurrentRoute('parte1')
      }
    }

    // Escuchar el evento hashchange para reaccionar al cambio de rutas
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Renderizar la página según el hash correspondiente
  if (currentRoute === 'parte2') {
    return <AppParte2 />
  }

  return <AppParte1 />
}

const app = document.querySelector('#app')
ReactDOM.createRoot(app).render(<Router />)
