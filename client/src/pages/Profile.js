import React from 'react'
import { Redirect } from 'react-router-dom'

function Profile({ isLoggedIn }) {
    return (
        <div>
            {!isLoggedIn ? <Redirect to="/read" /> : ""}

            Profile Page
        </div>
    )
}

export default Profile
