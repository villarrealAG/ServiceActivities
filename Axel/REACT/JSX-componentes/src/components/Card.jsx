function Card() {
  const nombreCurso = "Curso de React desde cero";

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '15px' }}>
      <h3>{nombreCurso}</h3>
      <p>Esta es una tarjeta creada como un componente independiente usando JSX.</p>
    </div>
  );
}

export default Card;