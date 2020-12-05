import React from 'react'
import NotLoggedIn from './NotLoggedIn';
import LoggedIn from './LoggedIn';
import logoLightBg from '../images/logoLightBg.svg';
import { useLocation } from 'react-router-dom';

function Nav({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();


    return (
        <div className="nav">
            <div id="logo">
                <img src={logoLightBg} alt="Logo" />
                Writer's Cafe
            </div>
            <nav>
                {isLoggedIn ? <LoggedIn location={location} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <NotLoggedIn location={location} />}
            </nav>
        </div>

    )
}

export default Nav
