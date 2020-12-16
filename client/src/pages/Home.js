import React from 'react'
import logoNoBg from '../images/logoNoBg.svg';
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="login home">
            <section className="main">
                <img src={logoNoBg} alt="Main Logo" />
                <div className="description">
                    <h1>Get your creative juices flowing by joining Writer’s Cafè.</h1>
                    <div className="buttons">
                        <Link to="/read"><div className="button">Start Reading</div></Link>
                        <Link to="/register"><div className="button">Sign Up Now</div></Link>
                    </div>
                </div>
            </section>
            <section className="features">
                <div className="pills-bg"></div>
                <div className="features-area">
                    <h1>Features</h1>
                    <div className="feature-content">
                        <div className="feature-circle">Write Stories, Poetry, Novels, Quotes. <h2>Public/Private</h2></div>
                        <div className="feature-circle">Read other people’s public written works :)</div>
                        <div className="feature-circle">Find authors nearby to connect. <h2>(if they have the find me option enabled)</h2></div>
                        <div className="feature-circle">Speech recognition to take in voice input instead of traditional typing</div>
                    </div>
                    <div className="buttons">
                        <Link to="/read"><div className="button">Start Reading</div></Link>
                        <Link to="/register"> <div className="button">Sign Up</div></Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
