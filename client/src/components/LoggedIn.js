import React from 'react'
import { Link, Redirect } from 'react-router-dom';

function LoggedIn({ isLoggedIn, location, setIsLoggedIn }) {
    const logOutHandler = async () => {
        {
            try {
                const response = await fetch("/api/v1/auth/logout")
                console.log(response);
                const data = await response.json();
                if (data.success) {
                    setIsLoggedIn(false);
                }
                else {
                    console.log(data)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <ul>
            {console.log(isLoggedIn)}
            <li className={location.pathname === "/read" ? "selected" : ""}><Link to="/read">Read</Link></li>
            <li className={location.pathname === "/profile" ? "selected" : ""}><Link to="/profile">Profile</Link></li>
            <li className={location.pathname === "/logout" ? "selected" : ""} onClick={logOutHandler}>Logout</li>
        </ul>
    )
}

export default LoggedIn
