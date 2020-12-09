import React from 'react'
import { Link } from 'react-router-dom';
import storyImage from '../images/placeholder_writtenwork.svg'
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';

function CardAuthor({ name, id, view, rating, description, workType, genre, triggerWarning, nsfw, violence }) {
    const starRenderer = () => {
        let ratingRenderer = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.round(parseInt(rating))) {
                ratingRenderer.push(<img key={i} src={filledStar} alt="filled star" />)
            }
            else {
                ratingRenderer.push(<img src={emptyStar} alt="empty star" />)
            }
        }
        return ratingRenderer;
    }

    return (
        <>
            {
                <Link to={`/readwrittenwork/${id}`}>
                    <div className="cards">
                        <img src={storyImage} alt="Placeholder" />
                        <div className="cardText">
                            <h1>{name}</h1>
                            {view === "public" ? <div className="rating">
                                <div className="stars">
                                    {starRenderer()}
                                </div></div> : <div className="tagsArea"> <div className="tags view-tag">{view}</div> </div>}
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

export default CardAuthor
