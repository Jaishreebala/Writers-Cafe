import React from 'react'

function CreateWrittenwork() {
    return (
        <div className="createPage">
            <div className="whitebg">
                <div className="divider">
                    <div className="searchInput">
                        <input type="text" name="text" required />
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
                        <textarea name="description" id="description">
                        </textarea>
                    </div>
                    <div className="searchInput">
                        <input type="text" name="text" required />
                        <label className="label-name">
                            <span className="content-name">
                                Work Type *
                            </span>
                        </label>
                    </div>
                    <div className="searchInput">
                        <input type="text" name="text" required />
                        <label className="label-name">
                            <span className="content-name">
                                Genre *
                            </span>
                        </label>
                    </div>
                </div>
                <div className="divider">
                    <div className="radio">
                        Visibility
                        <div className="radio-options">
                            <label class="container">Public
                                <input type="radio" name="visibility" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Private
                                <input type="radio" name="visibility" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <h2>We just need some more information so that our readers can have the best experience :)</h2>

                    <div class="checkbox-container">
                        <label class="container">18 +
                            <input type="checkbox" name="nsfw" value="nsfw" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="container">Violence
                            <input type="checkbox" name="violence" value="violence" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="container">Suicide/Trigger Warning
                            <input type="checkbox" name="triggerwarning" value="triggerwarning" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWrittenwork
