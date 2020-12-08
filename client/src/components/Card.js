import React from 'react'
import { Link } from 'react-router-dom';
import storyImage from '../uploads/writtenWorks/placeholder-story.svg.svg'
function Card({ name, id, author, description, workType, genre, triggerWarning, nsfw, violence }) {

    return (
        <>
            {
                <Link to={`/readwrittenwork/${id}`}>
                    <div className="cards">
                        <img src={storyImage} alt="Placeholder" />
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
                </Link>
            }
        </>
    )
}

export default Card
