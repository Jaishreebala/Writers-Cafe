import React from 'react'
import { Link } from 'react-router-dom';

function NotLoggedIn({ location }) {
    return (
        <ul>
            <li className={location.pathname === "/" ? "selected" : ""}><Link to="/">Home</Link></li>
            <li className={location.pathname === "/read" ? "selected" : ""}><Link to="/read">Read</Link></li>
            <li className={location.pathname === "/login" ? "selected" : ""}><Link to="/login">Log In</Link></li>
            <li className={location.pathname === "/register" ? "selected" : ""}><Link to="/register">Sign Up</Link></li>
        </ul>
    )
}

export default NotLoggedIn
