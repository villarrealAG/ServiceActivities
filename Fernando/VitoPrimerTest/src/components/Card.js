export function Card({ title, text, accent }) {
  return `
    <article class="card ${accent ? 'card--accent' : ''}">
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `
}
