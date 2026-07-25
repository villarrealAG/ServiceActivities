import { useState } from 'react';

function Interactivo() {
  // 1. Estado para el contador
  const [contador, setContador] = useState(0);

  // 2. Estado para el botón de Like (Booleano: true o false)
  const [meGusta, setMeGusta] = useState(false);

  // Funciones manejadoras de eventos (onClick)
  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);
  const toggleLike = () => setMeGusta(!meGusta);

  return (
    <div style={{ textAlign: 'center', border: '2px dashed #61dafb', padding: '20px', borderRadius: '10px', margin: '20px' }}>
      <h2>Práctica de useState</h2>
      
      {/* Sección Contador */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Contador: {contador}</h3>
        <button onClick={incrementar} style={{ marginRight: '10px', padding: '8px 15px' }}>+ Incrementar</button>
        <button onClick={decrementar} style={{ padding: '8px 15px' }}>- Decrementar</button>
      </div>

      <hr />

      {/* Sección Botón Like (Toggle) */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={toggleLike}
          style={{ 
            backgroundColor: meGusta ? '#e74c3c' : '#ccc', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {meGusta ? '❤️ Te gusta esto' : '🤍 Dar Me Gusta'}
        </button>
      </div>
    </div>
  );
}

export default Interactivo;