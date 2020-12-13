import React from 'react'
import logoNoBg from '../images/logoNoBg.svg';
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="login home">
            <img src={logoNoBg} alt="Main Logo" />
            <div className="description">
                <h1>Get your creative juices flowing by joining Writer’s Cafè.</h1>
                <div className="buttons">
                    <div className="button">Start Reading</div>
                    <div className="button">Sign Up Now</div>
                </div>
            </div>
        </div>
    )
}

export default Home
