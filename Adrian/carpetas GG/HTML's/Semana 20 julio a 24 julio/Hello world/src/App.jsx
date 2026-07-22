import './App.css'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import cardsData from './data/information'

function App() {
  const CardDataList = cardsData.map((v, index) => {
    return <Card key={index} title={v.title}>{v.content}</Card>
  })

  return (
    <div className="App">
      <Header />
      <div className="cards-container">
        {CardDataList}
      </div>
      <Footer />
    </div>
  )
}

export default App
