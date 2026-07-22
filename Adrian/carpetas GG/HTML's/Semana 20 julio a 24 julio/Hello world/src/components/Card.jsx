import { useState } from "react";
import "./Card.css";

function Card({ title, image, text, children }) {
    const [showText, setShowText] = useState(false);

    return (
        <div className="Card">
            {image && <img src={image} alt={title} className="Card-image" />}
            <h2>{title}</h2>
            {showText && <p>{text}</p>}
            <button className="Card-btn" onClick={() => setShowText(!showText)}>
                {showText ? "Ocultar info" : "Saber más"}
            </button>
            {children}
        </div>
    )
}

export default Card