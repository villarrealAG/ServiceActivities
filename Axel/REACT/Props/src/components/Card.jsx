// Agregamos 'children' al destructuring
function Card({ titulo, imagen, children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '250px', margin: '10px' }}>
      <img src={imagen} alt={titulo} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
      <h3 style={{ marginTop: '10px' }}>{titulo}</h3>
      
      {/* Aquí renderizamos cualquier contenido HTML o componentes que vengan adentro de <Card>...</Card> */}
      <div style={{ color: '#555', fontSize: '14px' }}>
        {children}
      </div>
    </div>
  );
}

export default Card;