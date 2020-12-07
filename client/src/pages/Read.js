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
        // console.log(newSelectedWritten)
        // // newSelectedWritten = newSelectedWritten.filter((workType, id) => id !== idx);
        // newSelectedWritten = newSelectedWritten.slice(idx);
        // console.log(newSelectedWritten)
        // console.log(selectedWrittenwork)

        setSelectedWrittenwork(newSelectedWritten);
        // console.log(newSelectedWritten)
        // console.log(e.target.textContent)
        // newSelectedWritten = selectedWrittenwork.slice(idx)

        // newSelectedWritten.forEach((workType, index) => {
        //     if (workType === e.target.textContent.trim())
        //         newSelectedWritten.splice(index, 1)
        // })
        console.log(newSelectedWritten)
        // console.log(selectedWrittenwork)
        // setSelectedWrittenwork(selectedWrittenwork.splice(idx, 1));

        updateQuery();
    }
    const removeGenreHandler = (e) => {
        setSelectedGenre(selectedGenre.filter(genre => genre !== e.target.textContent.trim()));
        updateQuery();
    }
    function updateQuery() {
        if (!selectedGenre.length && !selectedWrittenwork.length) {
            console.log("1")
            setQuery(`api/v1/writtenWork`);
        }
        else if (!selectedGenre.length && selectedWrittenwork.length > 0) {
            console.log("2")

            setQuery(`api/v1/writtenWork?workType[in]=${selectedWrittenwork}`)
        }
        else if (!selectedWrittenwork.length && selectedGenre.length > 0) {
            console.log("3")

            setQuery(`api/v1/writtenWork?genre[in]=${selectedGenre}`);
        }
        else {
            console.log("4")
            setQuery(`api/v1/writtenWork?genre[in]=${selectedGenre}&workType[in]=${selectedWrittenwork}`)
        }
        console.log(`query: ${query}`)
    }
    return (
        <div>
            {!isLoggedIn ? <Redirect to="/read" /> : ""}
            {console.log(selectedWrittenwork)}
            <div className="header">
                <div className="section">
                    {/* <input type="text" placeholder="Search for Stories, Poems and more..." /> */}
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