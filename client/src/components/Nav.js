import React from 'react'
import logoLightBg from '../images/logoLightBg.svg';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
    const location = useLocation();
    return (
        <div className="nav">
            <div id="logo">
                <img src={logoLightBg} alt="Logo" />
                Writer's Cafe
            </div>
            <nav>
                <ul>
                    <li className={location.pathname === "/" ? "selected" : ""}><Link to="/">Home</Link></li>
                    <li className={location.pathname === "/read" ? "selected" : ""}><Link to="/read">Read</Link></li>
                    <li className={location.pathname === "/login" ? "selected" : ""}><Link to="/login">Log In</Link></li>
                    <li className={location.pathname === "/register" ? "selected" : ""}><Link to="/register">Sign Up</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav
