import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import storyImage from '../images/placeholder_writtenwork.svg'
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';
import editIcon from '../images/edit.svg';
import deleteIcon from '../images/delete.svg'

function CardAuthor({ name, id, rerender, setRerender, view, rating, description, workType, genre, triggerWarning, nsfw, violence }) {

    const [isDeleteRequested, setIsDeleteRequested] = useState(false);
    const deleteWrittenWorkHanlder = async () => {
        try {
            const response = await fetch(`/api/v1/writtenWork/${id}`, {
                method: "DELETE"
            })
            const data = await response.json();
            setRerender(!rerender)
        } catch (err) {
            console.log(err)
        }
    }
    const starRenderer = () => {
        let ratingRenderer = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.round(parseInt(rating))) {
                ratingRenderer.push(<img key={i} src={filledStar} alt="filled star" />)
            }
            else {
                ratingRenderer.push(<img key={i} src={emptyStar} alt="empty star" />)
            }
        }
        return ratingRenderer;
    }

    return (
        <>

            {
                <div className="cardLink">
                    <div className={`deleteOverlay ${isDeleteRequested ? 'showOpacity' : ''}`}>
                        Are you sure you want to delete your written work - "{name}"?
                        <div className="buttons">
                            <div className="button" onClick={deleteWrittenWorkHanlder}>Yes</div>
                            <div className="button" onClick={() => { setIsDeleteRequested(false) }}>No</div>
                        </div>
                    </div>
                    <div className="cardOverlay">
                        <Link to={`/editwrittenwork/${id}`}>
                            <div className={`toolTip ${isDeleteRequested ? '' : 'showzindex'}`} tooltip={"Edit Your Written Work"} >
                                <img src={editIcon} alt="Edit" />
                            </div>
                        </Link>
                        <div className={`toolTip ${isDeleteRequested ? '' : 'showzindex'}`} tooltip={"Delete This Written Work"} onClick={() => { setIsDeleteRequested(true) }}>
                            <img src={deleteIcon} alt="Delete" />
                        </div>
                    </div>
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
                </div>
            }
        </>
    )
}

export default CardAuthor
