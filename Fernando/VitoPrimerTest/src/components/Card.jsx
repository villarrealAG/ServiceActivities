export function Card({ title, text, accent, link }) {
  return (
    <article className={`card ${accent ? 'card--accent' : ''}`}>
      <h3>{title}</h3>
      <p>{text}</p>
      <img src={link} alt={title} />
    </article>
  )
}
