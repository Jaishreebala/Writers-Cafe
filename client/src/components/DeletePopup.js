import React from 'react'

function DeletePopup({ id }) {
    return (
        <div className="popup-bg">
            <div className="popup">
                Are you sure you wanna delete this written work?
            <div className="button">Yes</div>
                <div className="button">No</div>
            </div>
        </div>
    )
}

export default DeletePopup
