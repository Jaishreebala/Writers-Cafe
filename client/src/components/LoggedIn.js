import React from 'react'
import { Link } from 'react-router-dom';

function LoggedIn({ location, setIsLoggedIn }) {
    const logOutHandler = async () => {
        {
            try {
                const response = await fetch("api/v1/auth/logout")
                const data = await response.json();
                console.log(data)
                if (data.success) {
                    setIsLoggedIn(false);
                }
                else {
                    console.log(data.error)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <ul>
            <li className={location.pathname === "/read" ? "selected" : ""}><Link to="/read">Read</Link></li>
            <li className={location.pathname === "/login" ? "selected" : ""}><Link to="/login">Profile</Link></li>
            <li className={location.pathname === "/register" ? "selected" : ""} onClick={logOutHandler}>Logout</li>
        </ul>
    )
}

export default LoggedIn
