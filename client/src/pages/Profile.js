import React from 'react'
import { Redirect } from 'react-router-dom'

function Profile({ isLoggedIn }) {
    return (
        // const createWrittenWorkHandler = async (e) => {
        //     e.preventDefault();
        //     try {
        //         const response = await fetch("api/v1/auth/me")
        //         const data = await response.json();
        //         console.log(data)
        //         if (data.success) {
        //             setErrors("");
        //         }
        //         else {
        //             setErrors(data.error);
        //         }
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
        <div>
            {!isLoggedIn ? <Redirect to="/read" /> : ""}

            Profile Page
        </div>
    )
}

export default Profile
