import { useState, useEffect } from 'react'
import { DigimonCards } from './components/DigimonCards'

function App() {
  const [digimonData, setDigimonData] = useState([])
  
  // Estados controlados para el formulario
  const [name, setName] = useState('')
  const [type, setType] = useState('Vaccine')
  const [imageUrl, setImageUrl] = useState('')

  const base_url = 'https://digi-api.com/api/v1/digimon'

  // Carga inicial de Digimons
  const fetchAllDigimons = async () => {
    try {
      const promises = []
      // Traemos los primeros 9 Digimons inicialmente
      for (let i = 1; i <= 9; i++) {
        promises.push(
          fetch(`${base_url}/${i}`).then((response) => response.json())
        )
      }
      const results = await Promise.all(promises)
      setDigimonData(results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllDigimons()
  }, [])

  // Agregar Digimon localmente
  const addDigimon = (e) => {
    e.preventDefault()
    if (name.trim() === '') return

    const newDigimon = {
      // Usamos timestamp para ID local único y evitar colisiones
      id: Date.now(),
      name: name.trim(),
      images: [
        {
          href: imageUrl.trim() || 'https://digi-api.com/images/digimon/w/Agumon.png'
        }
      ],
      types: [
        {
          type: type
        }
      ]
    }

    // Lo agregamos al principio de la lista
    setDigimonData([newDigimon, ...digimonData])

    // Limpiamos el formulario
    setName('')
    setType('Vaccine')
    setImageUrl('')
  }

  // Eliminar Digimon localmente
  const deleteDigimon = (id) => {
    setDigimonData(digimonData.filter((digimon) => digimon.id !== id))
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-850 font-sans p-6'>
      <div className='max-w-4xl mx-auto'>
        <header className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-slate-900 tracking-tight mb-1'>
            Digimon API & CRUD
          </h1>
          <p className='text-slate-500 text-xs'>
            Carga de API y manipulación local mediante formularios controlados
          </p>
        </header>

        {/* Formulario controlado minimalista */}
        <section className='bg-white border border-slate-200/60 rounded-xl p-5 mb-8 shadow-sm max-w-sm mx-auto'>
          <h2 className='text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5'>
            <span>Nuevo Digimon</span>
          </h2>
          <form onSubmit={addDigimon} className='space-y-3.5'>
            <div>
              <label className='block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1'>
                Nombre
              </label>
              <input
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Ej. Patamon'
                className='w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition'
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1'>
                  Tipo / Atributo
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className='w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition'
                >
                  <option value='Vaccine'>Vaccine</option>
                  <option value='Data'>Data</option>
                  <option value='Virus'>Virus</option>
                  <option value='Free'>Free</option>
                </select>
              </div>

              <div>
                <label className='block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1'>
                  Imagen (URL)
                </label>
                <input
                  type='url'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder='Opcional...'
                  className='w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full py-2 bg-slate-900 hover:bg-slate-850 text-white font-semibold rounded-lg text-xs transition duration-150 cursor-pointer shadow-sm'
            >
              Agregar a la lista
            </button>
          </form>
        </section>

        {/* Grid de Digimons */}
        <section>
          <div className='flex items-center justify-between mb-4 border-b border-slate-200 pb-2'>
            <h2 className='text-sm font-bold text-slate-700 uppercase tracking-wider'>
              Catálogo ({digimonData.length})
            </h2>
          </div>

          {digimonData.length === 0 ? (
            <div className='text-center py-16 bg-white border border-slate-200 rounded-xl'>
              <p className='text-slate-400 text-xs font-medium'>No hay Digimons en la lista.</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {digimonData.map((digimon) => (
                <DigimonCards 
                  key={digimon.id} 
                  digimonData={digimon} 
                  onDelete={deleteDigimon}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
