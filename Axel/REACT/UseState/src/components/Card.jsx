function Card({ titulo, imagen, texto }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '250px', margin: '10px' }}>
      <img src={imagen} alt={titulo} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
      <h3 style={{ marginTop: '10px' }}>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}

export default Card;