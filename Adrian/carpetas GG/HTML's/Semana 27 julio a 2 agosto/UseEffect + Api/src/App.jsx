import { useState, useEffect } from 'react'
import { DigimonCards } from './components/DigimonCards'

function App() {
  const [digimonData, setDigimonData] = useState([])
  const base_url = 'https://digi-api.com/api/v1/digimon'

  const fetchDigimon = async (id) => {
    try {
      const response = await fetch(`${base_url}/${id}`)
      const data = await response.json()
      setDigimonData((prevDigimonData) => [...prevDigimonData, data])
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllDigimons = () => {
    for (let i = 1; i <= 11; i++) {
      fetchDigimon(i)
    }
  }

  useEffect(() => {
    fetchAllDigimons()
  }, [])

  useEffect(() => {
    console.log(digimonData);
  }, [digimonData])

  return (
    <>
      <h1 className='text-4xl text-white my-6'>Digimon Api</h1>
      <div className='px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {digimonData.map((digimon, index) => (
            <DigimonCards key={index} digimonData={digimon}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
