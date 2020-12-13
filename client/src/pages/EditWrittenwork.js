import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import expand from '../images/expand.svg';
import about from '../images/about.svg';
import speech from '../images/speech.svg';
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';
import profilePlaceholder from '../images/profilePlaceholder.svg';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function EditWrittenwork({ isLoggedIn }) {
    const { id } = useParams();
    const [query, setQuery] = useState(`/api/v1/writtenWork/${id}`);
    const [writtenWorkData, setWrittenWorkData] = useState([]);
    const [isDescFocus, setIsDescFocus] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [lastText, setLastText] = useState("");
    const [text, setText] = useState("");
    const [lastDescText, setLastDescText] = useState("");
    const [descText, setDescText] = useState("");
    const textRef = useRef();
    const descRef = useRef();
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (lastText != text) {
                try {
                    await fetch(`/api/v1/writtenWork/${id}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            content: text
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
                setLastText(text);
            }
        }, 3000)
        return () => clearTimeout(timer);
    }, [text])
    useEffect(() => {
        const timerForDesc = setTimeout(async () => {
            if (lastDescText != descText) {
                try {
                    await fetch(`/api/v1/writtenWork/${id}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            description: descText
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
                setLastDescText(descText);
            }
        }, 3000)
        return () => clearTimeout(timerForDesc);
    }, [descText])
    const { transcript, resetTranscript } = useSpeechRecognition()
    const handle = useFullScreenHandle();
    const speechHandler = () => {
        console.log(isListening);
        setIsListening(!isListening);
        console.log(isListening);
        if (!isListening) {
            if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
                console.log("No support for browser")
            }
            else {
                SpeechRecognition.startListening({ continuous: true })

            }
        }
        else {
            SpeechRecognition.stopListening();
            SpeechRecognition.abortListening();
        }
        // console.log(`${writtenWorkData.content} ${transcript}`)
        // console.log(transcript)
        // writtenWorkData.content = `${writtenWorkData.content} ${transcript}`;
        let test = { ...writtenWorkData };
        test.content = `${writtenWorkData.content} ${transcript}`;
        console.log(transcript)
        console.log(`${writtenWorkData.content} ${transcript}`)
        console.log(test.content);
        setRerender(!rerender);
        setWrittenWorkData(test);
    }

    useEffect(() => {
        loadWrittenWork();
    }, [query, rerender])
    const loadWrittenWork = async () => {
        try {
            const response = await fetch(query)
            const data = await response.json();
            setWrittenWorkData(data.data);

        } catch (err) {
            console.log(err)
        }
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
        <> {
            writtenWorkData.author && writtenWorkData.genre && writtenWorkData.comments &&
            <div className="readWrittenWork">
                {console.log(writtenWorkData)}
                {!isLoggedIn ? <Redirect to="/login" /> : ""}
                <div className="readSection">
                    <div className="heading">
                        <h1>{writtenWorkData.name}</h1>
                        <div className="options">
                            <div className="fullscreen" onClick={speechHandler}>
                                <img src={speech} alt="Speech" /> Start Dictation
                            </div>
                            <div onClick={handle.enter} className="fullscreen">
                                <img src={expand} alt="Expand" /> Fullscreen
                            </div>
                            <div className="fullscreen">
                                <img src={about} alt="About" /> About
                            </div>
                        </div>
                    </div>
                    <FullScreen handle={handle} style={{ color: '#fff' }}>
                        <textarea className="readArea" ref={textRef} onChange={(e) => { setText(textRef.current.value) }} >
                            {writtenWorkData.content}
                        </textarea>
                    </FullScreen>
                </div>
                <div className="description">
                    <div className="padding">
                        <h1>{writtenWorkData.name}</h1>
                        <h2>{writtenWorkData.author.firstName} {writtenWorkData.author.lastName}</h2>
                        <div className="tagsArea">
                            <div className="tags">{writtenWorkData.workType}</div>
                            {writtenWorkData.genre.map(gen => <div key={gen} className="tags">{gen}</div>)}
                        </div>
                        <p>
                            {/* <textarea  name="description" id="description" className={`descArea ${isDescFocus ? 'editting' : ''}`} ref={descRef} onChange={(e) => { setDescText(descRef.current.value) }} onBlur={() => { setIsDescFocus(false) }} onFocus={() => { setIsDescFocus(true) }}>
                                {writtenWorkData.description}
                            </textarea> */}
                            <div
                                contentEditable className={`descArea ${isDescFocus ? 'editting' : ''}`} ref={descRef} onInput={(e) => { setDescText(descRef.current.textContent) }} onBlur={() => { setIsDescFocus(false) }} onFocus={() => { setIsDescFocus(true) }}>
                                {writtenWorkData.description}
                            </div>
                        </p>
                        {writtenWorkData.view === "public" ? <div className="rating">
                            <div className="stars">
                                {starRenderer()}
                            </div></div> : <div className="tagsArea"> <div className="tags view-tag">{writtenWorkData.view}</div> </div>}
                    </div>

                    <div className="comments">

                        <div className="padding">
                            <h1>Comments</h1>
                            {writtenWorkData.view === "public" ?
                                <> {
                                    writtenWorkData.comments.map(comment => {
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
                                    )
                                }</>
                                : <h2>No Comments For Private Written Works</h2>}
                        </div>
                    </div>

                </div>
            </div>}</>
    )
}

export default EditWrittenwork
