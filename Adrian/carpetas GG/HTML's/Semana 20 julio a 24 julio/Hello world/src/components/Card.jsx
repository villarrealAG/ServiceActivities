import "./Card.css";

function Card({ title, children }) {
    return (
        <div className="Card">
            <h2>{title}</h2>
            {children}
        </div>
    )
}

export default Card