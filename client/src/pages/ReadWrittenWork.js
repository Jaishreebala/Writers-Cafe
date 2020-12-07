import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import profilePlaceholder from '../images/profilePlaceholder.svg'
function ReadWrittenWork() {
    const { id } = useParams();
    const [writtenWorkData, setWrittenWorkData] = useState([]);
    useEffect(() => {
        loadWrittenWork();
    })
    const loadWrittenWork = async () => {
        console.log(`/api/v1/writtenWork/${id}`)
        try {
            const response = await fetch(`/api/v1/writtenWork/${id}`)
            const data = await response.json();
            setWrittenWorkData(data.data);
        } catch (err) {
            console.log(err)
        }
    }
    console.log(writtenWorkData)
    return (
        <div className="readWrittenWork">
            <div className="readSection">
                <div className="heading">
                    <h1>{writtenWorkData.name}</h1>
                    <div className="fullscreen">
                        img Fullscreen
                </div>
                </div>
                <div className="readArea">
                    {writtenWorkData.content}
                </div>
            </div>
            <div className="description">
                <h1>{writtenWorkData.name}</h1>
                <h2>{writtenWorkData.author.firstName} {writtenWorkData.author.lastName}</h2>
                <div className="tagsArea">
                    <div className="tags">{writtenWorkData.workType}</div>
                    {writtenWorkData.genre.map(gen => <div key={gen} className="tags">{gen}</div>)}
                </div>
                <p>{writtenWorkData.description} </p>
                <div className="rating">Average Rating: {writtenWorkData.averageRating}</div>

                <div className="comments">
                    <div>
                        <h1>Comments</h1>
                        {writtenWorkData.comments.map(comment => {
                            if (comment.length > 0) {
                                <div className="comment">
                                    <div className="commentName">
                                        <img src={profilePlaceholder} alt="Profile" />
                                        {comment._id}
                                    </div>
                                    <div className="commentDesc">
                                        {comment.comment}
                                    </div>
                                </div>
                            }
                            return ''
                        }
                        )}
                    </div>
                </div>
                <div>
                    <input class="borderInput" type="text" placeholder="Leave A Comment" />
                    <div className="inputRating">
                        stars
                </div>
                </div>

            </div>
        </div>
    )
}

export default ReadWrittenWork
