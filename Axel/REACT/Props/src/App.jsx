import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';

function App() {
  const productos = [
    {
      id: 1,
      titulo: "Laptop Pro",
      imagen: "https://imgs.search.brave.com/dCkv3-qoE0vySDGYjrSOu8sPKDg1vr-oP9eR5pddtIc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDgv/NDc1LzY5NC9zbWFs/bC9tb2Rlcm4tbGFw/dG9wLWlzb2xhdGVk/LW9uLXdoaXRlLWJh/Y2tncm91bmQtd2l0/aC1jbGlwcGluZy1w/YXRoLTNkLWlsbHVz/dHJhdGlvbi1wbmcu/cG5n",
      texto: "Laptop potente para programación y diseño.",
      oferta: true
    },
    {
      id: 2,
      titulo: "Mouse Gamer",
      imagen: "https://imgs.search.brave.com/M6lacZoHx3iv_A2C4hSS8rtRH9kJzGSIPGxGx29talE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTgv/MjcyLzUwMS9zbWFs/bC93aXJlbGVzcy1t/b3VzZS1taW5pbWFs/aXN0LWRlc2lnbi1m/b3Itc2VhbWxlc3Mt/Y29tcHV0ZXItaW50/ZXJhY3Rpb24tZnJl/ZS1wbmcucG5n",
      texto: "Mouse ergonómico con luces RGB.",
      oferta: false
    }
  ];

  return (
    <div>
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', padding: '20px' }}>
        {productos.map((prod) => (
          <Card key={prod.id} titulo={prod.titulo} imagen={prod.imagen}>
            {/* TODO LO QUE VAYA AQUÍ ADENTRO ES props.children */}
            <p>{prod.texto}</p>
            {prod.oferta && (
              <span style={{ backgroundColor: 'green', color: 'white', padding: '3px 8px', borderRadius: '4px' }}>
                ¡En Descuento!
              </span>
            )}
          </Card>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;