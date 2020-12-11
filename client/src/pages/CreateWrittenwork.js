import React, { useState, useRef } from 'react'
import Error from '../components/Error';

function CreateWrittenwork() {
    const [isWorkOpen, setIsWorkOpen] = useState(false);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [view, setView] = useState(false);
    const [errors, setErrors] = useState("");

    const name = useRef();
    const description = useRef();
    const workType = useRef();
    const genre = useRef();
    const visibility = useRef();
    const nsfw = useRef();
    const violence = useRef();
    const triggerwarning = useRef();
    const selectedWrittenworkHandler = () => {
        setIsWorkOpen(true)
    }
    const selectedGenreHandler = () => {
        setIsGenreOpen(true)
    }
    const submitFormHandler = async (e) => {
        e.preventDefault();
        let genreArray = genre.current.value.split(',');
        console.log(view)
        try {
            const response = await fetch("/api/v1/writtenWork", {
                method: "POST",
                body: JSON.stringify({
                    name: name.current.value,
                    description: description.current.value,
                    workType: workType.current.value,
                    genre: genreArray,
                    view,
                    nsfwContent: nsfw.current.checked,
                    violence: violence.current.checked,
                    suicideOrTriggerWarning: triggerwarning.current.checked
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setErrors("");
            } else {
                setErrors(data.error);
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="createPage">
            <div className="whitebg">
                <div className="divider">
                    <Error error={errors} />
                    <div className="searchInput">
                        <input type="text" name="text" required ref={name} />
                        <label className="label-name">
                            <span className="content-name">
                                Name *
                            </span>
                        </label>
                    </div>
                    <div className="textarea">
                        <label className="label-name"><span className="content-name">
                            Description*
                            </span>
                        </label>
                        <textarea name="description" id="description" ref={description}>
                        </textarea>
                    </div>
                    <div className="typeDropdown">
                        <div className="searchInput">
                            <input type="text" name="text" ref={workType} required onFocus={selectedWrittenworkHandler} onBlur={() => { setIsWorkOpen(false) }} />
                            <label className="label-name">
                                <span className="content-name">
                                    Work Type *
                            </span>
                            </label>

                        </div>
                        <ul className={`options ${isWorkOpen ? "expand" : ""}`}>
                            <li>Poetry</li>
                            <li>Short Story</li>
                            <li>Novel</li>
                            <li>Journal/Diary</li>
                            <li>Quotes</li>
                        </ul>
                    </div>
                    <div className="typeDropdown">
                        <div className="searchInput">
                            <input type="text" name="text" required ref={genre} onFocus={selectedGenreHandler} onBlur={() => { setIsGenreOpen(false) }} />
                            <label className="label-name">
                                <span className="content-name">
                                    Genre *
                            </span>
                            </label>
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
                </div>
                <div className="divider">
                    <div className="radio">
                        Visibility
                        <div className="radio-options">
                            <label class="container">Public
                                <input type="radio" name="visibility" value="public" onClick={() => { setView("public") }} />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Private
                                <input type="radio" name="visibility" value="private" onClick={() => { setView("private") }} />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <h2>We just need some more information so that our readers can have the best experience :)</h2>

                    <div class="checkbox-container">
                        <label class="container">18 +
                            <input type="checkbox" name="nsfw" value="nsfw" ref={nsfw} />
                            <span class="checkmark" onClick={() => { console.log(nsfw.current.checked) }}></span>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="container">Violence
                            <input type="checkbox" name="violence" value="violence" ref={violence} />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="container">Suicide/Trigger Warning
                            <input type="checkbox" name="triggerwarning" value="triggerwarning" ref={triggerwarning} />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div className="button" onClick={submitFormHandler}>Create</div>
                </div>
            </div>
        </div>
    )
}

export default CreateWrittenwork
