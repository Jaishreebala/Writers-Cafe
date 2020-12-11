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
                    <input type="radio" name="visibility" id="Public" />
                        <label htmlFor="Public">Public</label>
                        <input type="radio" name="visibility" id="Private" />
                        <label htmlFor="Private">Private</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" name="nsfw"
                            value="nsfw" />
                        <span class="checkmark"></span>
                        <label htmlFor="nsfw">18 +</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" name="violence"
                            value="violence" />
                        <span class="checkmark"></span>
                        <label htmlFor="violence">Violence</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" name="triggerwarning"
                            value="triggerwarning" />
                        <span class="checkmark"></span>
                        <label htmlFor="triggerwarning">Suicide/Trigger Warning</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWrittenwork
