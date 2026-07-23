import './App.css'
import Header from './components/Header'
import Card, { BotonesInterectavos } from './components/Card'
import Footer from './components/Footer'
import cardsData from './data/information'

function App() {
  const CardDataList = cardsData.map((v, index) => {
    return (
      <Card key={index} title={v.title} image={v.image} text={v.text} code={v.code}>
      </Card>
    )
  })

  return (
    <div className="App">
      <Header />
      <div className="cards-container">
        {CardDataList}
      </div>
      <BotonesInterectavos />
      <Footer />
    </div>
  )
}

export default App
