import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router';
import profilePlaceholder from '../images/profilePlaceholder.svg';
import expand from '../images/expand.svg';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';
import about from '../images/about.svg';
import Error from '../components/Error';
import { useHistory } from 'react-router-dom'


function ReadWrittenWork({ isLoggedIn }) {
    const { id } = useParams();
    const history = useHistory()

    const [writtenWorkData, setWrittenWorkData] = useState([]);
    const [query, setQuery] = useState(`/api/v1/writtenWork/${id}`);
    const [userRating, setUserRating] = useState([0, 0, 0, 0, 0]);
    const [errors, setErrors] = useState("");
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const handle = useFullScreenHandle();
    useEffect(() => {
        loadWrittenWork();
    }, [query])
    const commentRef = useRef();
    const loadWrittenWork = async () => {
        try {
            const response = await fetch(query)
            const data = await response.json();
            setWrittenWorkData(data.data);
        } catch (err) {
            console.log(err)
        }
    }
    const submitCommentHandler = async () => {
        if (isLoggedIn) {
            if (commentRef.current.value.length) {
                try {
                    const response = await fetch(`/api/v1/writtenWork/${id}/comments`, {
                        method: "POST",
                        body: JSON.stringify({
                            comment: commentRef.current.value
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    const data = await response.json();
                    setErrors("");
                    if (data.success) {
                        setQuery(query)
                    }
                    else {
                        setErrors(data.error)
                    }

                } catch (err) {
                    setErrors(err)
                }
            }
            else {
                setErrors("Comments can't be empty")
            }
            commentRef.current.value = ""
        }
        else {
            history.push("/login");
        }
    }
    const submitReviewHandler = async (rating) => {
        if (isLoggedIn) {
            try {
                const response = await fetch(`/api/v1/writtenWork/${id}/comments`, {
                    method: "POST",
                    body: JSON.stringify({
                        rating: rating
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await response.json();
                if (data.success) {
                    // setQuery(`/api/v1/writtenWork/${}`)
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            history.push("/login");
        }
    }
    const mouseOverStar = (index) => {
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                userRating[i] = 1;
            }
            else {
                userRating[i] = 0;
            }
        }
        setUserRating(userRating)
    }

    const starRenderer = () => {
        let ratingRenderer = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.round(parseInt(writtenWorkData.averageRating))) {
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
                writtenWorkData.author && writtenWorkData.genre && writtenWorkData.comments && < div className="readWrittenWork">
                    <div className={`readSection ${isDescriptionOpen ? "marginRight" : ""}`}>
                        <div className="heading">
                            <h1>{writtenWorkData.name}</h1>
                            <div className="options">
                                <div onClick={handle.enter} className="fullscreen">
                                    <img src={expand} alt="expand" /> Fullscreen
                                </div>
                                <div onClick={() => { setIsDescriptionOpen(!isDescriptionOpen); console.log(isDescriptionOpen) }} className={`fullscreen ${isDescriptionOpen ? 'selectedState' : ""}`}>
                                    <img src={about} alt="expand" /> About
                                </div>
                            </div>
                        </div>
                        <FullScreen handle={handle} style={{ color: '#fff' }}>
                            <textarea className="readArea" readOnly>
                                {writtenWorkData.content}
                            </textarea>
                        </FullScreen>
                    </div>
                    <div className={`description ${isDescriptionOpen ? "slideIn" : ""}`}>
                        <div className="padding">
                            <h1>{writtenWorkData.name}</h1>
                            <h2>{writtenWorkData.author.firstName} {writtenWorkData.author.lastName}</h2>
                            <div className="tagsArea">
                                <div className="tags">{writtenWorkData.workType}</div>
                                {writtenWorkData.genre.map(gen => <div key={gen} className="tags">{gen}</div>)}
                            </div>
                            <p>{writtenWorkData.description} </p>
                            <div className="rating">
                                <div className="stars">
                                    {starRenderer()}
                                </div>
                            </div>
                        </div>
                        <div className="comments">

                            <div className="padding">
                                <h1>Comments</h1>
                                {writtenWorkData.comments.map(comment => {
                                    if (comment.comment) {
                                        return <div key={comment._id} className="comment">
                                            <div className="commentName">
                                                <img src={profilePlaceholder} alt="Profile" />
                                                {comment.user.firstName} {comment.user.lastName}
                                            </div>
                                            <div className="commentDesc">
                                                {comment.comment}
                                            </div>
                                        </div>
                                    }
                                    return "";
                                }
                                )}
                            </div>
                        </div>
                        <div className="userInputSection">
                            <Error error={errors} />
                            <div className="borderInput">
                                <input type="text" placeholder="Leave A Comment" ref={commentRef} />
                                <div onClick={submitCommentHandler}>Post</div>
                            </div>

                            <div className="inputRating">
                                <span>Leave A Rating:</span>

                                {userRating.map((rating, i) =>
                                    <img onClick={() => submitReviewHandler(i + 1)}
                                        onMouseOver={() => mouseOverStar(i)} key={i} src={rating ? filledStar : emptyStar}
                                        alt="empty star" />)
                                }
                            </div>
                        </div>

                    </div>
                </div>}
        </>
    )
}


export default ReadWrittenWork
