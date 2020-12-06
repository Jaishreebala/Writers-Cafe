import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Card from '../components/Card';
import arrow from '../images/arrow.svg'
function Read({ isLoggedIn }) {
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [isWorkOpen, setIsWorkOpen] = useState(false);
    const [writtenWorkData, setWrittenWorkData] = useState([]);
    useEffect(() => {
        readWrittenWorkHandler();
    }, [])
    const readWrittenWorkHandler = async () => {
        try {
            const response = await fetch("api/v1/writtenWork")
            const data = await response.json();
            console.log(data.data);
            setWrittenWorkData(data.data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {!isLoggedIn ? <Redirect to="/read" /> : ""}
            <div className="header">
                <div className="section">
                    <input type="text" placeholder="Search for Stories, Poems and more..." />
                    <div className="tagsArea">
                        <div className="tags">Romance</div>
                        <div className="tags">Romance</div>
                    </div>
                </div>
                <div className="section">
                    <div className="dropdown">
                        <div className="title" onClick={() => {
                            setIsGenreOpen(!isGenreOpen);
                            setIsWorkOpen(false)
                        }}>Genre
                        <img src={arrow} alt="arrow" className={isGenreOpen ? "rotateDown" : ""} />
                        </div>
                        <ul className={`options ${isGenreOpen ? "expand" : ""}`}>
                            <li>Fantasy</li>
                            <li>Adventure</li>
                            <li>Romance</li>
                            <li>Contemporary</li>
                            <li>Dystopian</li>
                            <li>Mystery</li>
                            <li>Horror</li>
                            <li>Thriller</li>
                            <li>Paranormal</li>
                            <li>Historical fiction</li>
                            <li>Science Fiction</li>
                            <li>Memoir</li>
                            <li>Self-help / Personal</li>
                            <li>Motivational</li>
                            <li>Guide / How-to</li>
                            <li>Humor</li>
                            <li>Children’s</li>
                            <li>Other</li>

                        </ul>
                    </div>
                    <div className="dropdown">
                        <div className="title" onClick={() => {
                            setIsWorkOpen(!isWorkOpen);
                            setIsGenreOpen(false);
                        }}>Work Type
                        <img src={arrow} alt="arrow" className={isWorkOpen ? "rotateDown" : ""} />
                        </div>
                        <ul className={`options ${isWorkOpen ? "expand" : ""}`}>
                            <li>Poetry</li>
                            <li>Short Story</li>
                            <li>Novel</li>
                            <li>Journal/Diary</li>
                            <li>Quotes</li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="cardsSection">
                {
                    writtenWorkData.map(writtenWork => <Card key={writtenWork._id} name={writtenWork.name} author={`${writtenWork.author.firstName} ${writtenWork.author.lastName}`} description={writtenWork.description} workType={writtenWork.workType} genre={writtenWork.genre} nsfw={writtenWork.nsfwContent} violence={writtenWork.violence} triggerWarning={writtenWork.suicideOrTriggerWarning} />)
                }
            </div>
        </div >
    )
}

export default Read