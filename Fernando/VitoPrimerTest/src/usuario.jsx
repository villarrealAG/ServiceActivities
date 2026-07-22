function Usuario({ nombre, id, FechaRe, cuentaActiva }) {
  return (
    <div>
      <h3>Nombre: {nombre}</h3>
      <p>ID: {id}</p>
      <p>Fecha de registro: {FechaRe}</p>
      <p>Cuenta activa: {cuentaActiva ? "Sí" : "No"}</p>
    </div>
  )
}

export default Usuario;