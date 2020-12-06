import React from 'react'
import placeholder_writtenwork from '../images/placeholder_writtenwork.svg';

function Card() {
    return (
        <div className="cards">
            <img src={placeholder_writtenwork} alt="Placeholder" />
            <div className="cardText">
                <h1>Tale of two lonesome cities</h1>
                <h2>John green</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, modi!</p>
                <div className="tagsArea">
                    <div className="tags">Romance</div>
                    <div className="tags">Dystopian</div>
                </div>
            </div>
        </div>
    )
}

export default Card
