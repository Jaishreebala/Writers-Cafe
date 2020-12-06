import React from 'react'
import placeholder_writtenwork from '../images/placeholder_writtenwork.svg';

function Card({ name, author, description, workType, genre, triggerWarning, nsfw, violence }) {
    return (
        <div className="cards">
            <img src={placeholder_writtenwork} alt="Placeholder" />
            <div className="cardText">
                <h1>{name}</h1>
                <h2>{author}</h2>
                <p>{description}</p>
                <div className="tagsArea">
                    <div className="tags">{workType}</div>
                    {genre.map(gen => <div key={gen} className="tags">{gen}</div>)}
                    {triggerWarning ? <div className="warning-tag">Trigger Warning</div> : ''}
                    {nsfw ? <div className="warning-tag">18+</div> : ''}
                    {violence ? <div className="warning-tag">Violence</div> : ''}
                </div>
            </div>
        </div>
    )
}

export default Card
