import React from 'react'
import { Redirect } from 'react-router-dom'
import Card from '../components/Card';

function Read({ isLoggedIn }) {
    return (
        <div>
            {!isLoggedIn ? <Redirect to="/read" /> : ""}
            <div className="header">
                <div className="section">
                    <input type="text" placeholder="Search for Stories, Poems and more..." />
                    <div className="tagsArea">
                        <div className="tags">Romance</div>
                        <div className="tags">Romance</div>
                    </div>
                </div>
                <div className="section">
                    Genre
                    Work Type
                </div>
            </div>
            <div className="cardsSection">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Read