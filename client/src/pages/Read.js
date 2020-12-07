import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Card from '../components/Card';
import arrow from '../images/arrow.svg'
import cross from '../images/cross.svg'
function Read({ isLoggedIn }) {
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [isWorkOpen, setIsWorkOpen] = useState(false);
    const [writtenWorkData, setWrittenWorkData] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [selectedWrittenwork, setSelectedWrittenwork] = useState([]);
    const [query, setQuery] = useState(`api/v1/writtenWork`);
    useEffect(() => {
        readWrittenWorkHandler();
    }, [query])
    const readWrittenWorkHandler = async () => {
        try {
            const response = await fetch(query)
            const data = await response.json();
            setWrittenWorkData(data.data);
        } catch (err) {
            console.log(err)
        }
        console.log(query)
    }
    const selectedGenreHandler = async (e) => {
        let push = true;
        selectedGenre.forEach(genre => {
            if (genre === e.target.textContent) {
                push = false;
            }
        })
        if (push) {
            selectedGenre.push(e.target.textContent)
            setSelectedGenre(selectedGenre)
            if (!selectedWrittenwork.length) {
                setQuery(`api/v1/writtenWork?genre[in]=${selectedGenre}`);
            }
            else {
                setQuery(`api/v1/writtenWork?genre[in]=${selectedGenre}&workType[in]=${selectedWrittenwork}`)
            }
        }
    }
    const selectedWrittenworkHandler = async (e) => {
        let push = true;
        selectedWrittenwork.forEach(workType => {
            if (workType === e.target.textContent) {
                push = false;
            }
        })
        if (push) {
            selectedWrittenwork.push(e.target.textContent)
            setSelectedWrittenwork(selectedWrittenwork)
        }
        if (!selectedGenre.length) {
            setQuery(`api/v1/writtenWork?workType[in]=${selectedWrittenwork}`);
        }
        else {
            setQuery(`api/v1/writtenWork?genre[in]=${selectedGenre}&workType[in]=${selectedWrittenwork}`)
        }
    }
    const removeWrittenWorkHandler = (idx) => {
        let newSelectedWritten = selectedWrittenwork.filter((workType, id) => id !== idx);
        setSelectedWrittenwork(newSelectedWritten);
        updateQuery(newSelectedWritten, selectedGenre);
    }
    const removeGenreHandler = (e) => {
        let newSelectedGenre = selectedGenre.filter(genre => genre !== e.target.textContent.trim());
        setSelectedGenre(newSelectedGenre);
        updateQuery(selectedWrittenwork, newSelectedGenre);
    }
    function updateQuery(selectedTagList, selectedGenreList) {
        if (!selectedGenreList.length && !selectedTagList.length) {
            setQuery(`api/v1/writtenWork`);
        }
        else if (!selectedGenreList.length && selectedTagList.length > 0) {
            setQuery(`api/v1/writtenWork?workType[in]=${selectedTagList}`)
        }
        else if (!selectedTagList.length && selectedGenreList.length > 0) {
            setQuery(`api/v1/writtenWork?genre[in]=${selectedGenreList}`);
        }
        else {
            setQuery(`api/v1/writtenWork?genre[in]=${selectedGenreList}&workType[in]=${selectedTagList}`)
        }
    }
    return (
        <div>
            {!isLoggedIn ? <Redirect to="/read" /> : ""}
            <div className="header">
                <div className="section">
                    <div className="tagsArea">
                        {selectedWrittenwork.map((workType, idx) => <div key={workType} onClick={() => removeWrittenWorkHandler(idx)} className="tags">{workType} <img src={cross} alt="Cancel" /> </div>)}
                        {selectedGenre.map(genre => <div key={genre} onClick={removeGenreHandler} className="tags">{genre} <img src={cross} alt="Cancel" /> </div>)}
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
                        <ul onClick={selectedGenreHandler} className={`options ${isGenreOpen ? "expand" : ""}`}>
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
                        <ul onClick={selectedWrittenworkHandler} className={`options ${isWorkOpen ? "expand" : ""}`}>
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
                    writtenWorkData.map(writtenWork => <Link to={`/readwrittenwork/${writtenWork._id}`}> <Card key={writtenWork._id} name={writtenWork.name} author={`${writtenWork.author.firstName} ${writtenWork.author.lastName}`} description={writtenWork.description} workType={writtenWork.workType} genre={writtenWork.genre} nsfw={writtenWork.nsfwContent} violence={writtenWork.violence} triggerWarning={writtenWork.suicideOrTriggerWarning} /> </Link>)
                }
            </div>
        </div >
    )
}

export default Read