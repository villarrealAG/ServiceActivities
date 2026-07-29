import { useState } from "react";
import "./Card.css";

function Card({ title, image, text, code, children }) {
    const [showText, setShowText] = useState(false);

    return (
        <div className="Card">
            {image && <img src={image} alt={title} className="Card-image" />}
            <h2>{title}</h2>
            {showText && (
                <div className="Card-content">
                    <p>{text}</p>
                    {code && (
                        <pre className="Card-code-container">
                            <code>{code}</code>
                        </pre>
                    )}
                    {children}
                </div>
            )}
            <button className="Card-btn" onClick={() => setShowText(!showText)}>
                {showText ? "Ocultar info" : "Saber más"}
            </button>
        </div>
    )
}

export function BotonesInteractivos() {
    const [contador, setContador] = useState(0)
    const [likeado, setLikeado] = useState(false)
    const [likesCount, setLikesCount] = useState(24) 

    const handleLikeClick = () => {
        if (likeado) {
            setLikesCount(likesCount - 1);
        } else {
            setLikesCount(likesCount + 1);
        }
        setLikeado(!likeado);
    }
    
    return (
        <div className="floating-feedback">
            <h4 className="feedback-header">¿Te gustó la página? ¡Apóyanos!</h4>
            <div className="feedback-row">
                <button 
                    onClick={handleLikeClick}
                    className={`feedback-likes-btn ${likeado ? 'active' : ''}`}
                >
                    <span>{likeado ? '❤️' : '🤍'}</span>
                    <span>{likesCount}</span>
                </button>

                <div className="feedback-counter-box">
                    <button className="feedback-counter-btn" onClick={() => setContador(contador - 1)}>-</button>
                    <span className="feedback-counter-value">{contador}</span>
                    <button className="feedback-counter-btn" onClick={() => setContador(contador + 1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default Card