import React, { useEffect, useState, useRef } from 'react'
import { Redirect, Link } from 'react-router-dom'
import authorImage from '../images/profilePlaceholder.svg'
import Card from '../components/CardAuthor';
import add from '../images/plus.svg';

function Profile({ isLoggedIn }) {
    const [query, setQuery] = 'api/v1/auth/me';
    const [profileData, setProfileData] = useState([]);
    const [editAddress, setEditAddress] = useState();
    const [addressFields, setAddressFields] = useState(false);
    const [profileLocation, setProfileLocation] = useState({});
    const [rerender, setRerender] = useState(false);
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const [nearbyAuthors, setNearbyAuthors] = useState();
    const miles = useRef();
    let addressLine = "";
    let addressCountry = "";
    let addressCity = "";
    let addressZipcode = "";
    useEffect(() => {
        getMyProfileHandler()
    }, [query, rerender])
    const getMyProfileHandler = async () => {
        try {
            const response = await fetch("api/v1/auth/me")
            const data = await response.json();
            setProfileData(data.data);
            if (data.data.location) {
                setProfileLocation(data.data.location)
            }

        } catch (err) {
            console.log(err)
        }
    }
    const addAddressHandler = async () => {
        try {
            const response = await fetch(`/api/v1/auth/me`, {
                method: "PUT",
                body: JSON.stringify({
                    address: `${addressLine} ${addressCity} ${addressCountry} ${addressZipcode}`.trim()
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json();
            if (data.data.location) {
                setProfileLocation(data.data.location)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const findAuthorsNearbyHandler = async () => {
        if (miles.current.value) {
            console.log(profileLocation.zipcode.trim())
            try {
                const response = await fetch(`api/v1/users/radius/${profileLocation.zipcode}/${miles.current.value}`)
                const data = await response.json();
                setNearbyAuthors(data.data);
                console.log(data);

            } catch (err) {
                console.log(err)
            }
        }
    }
    return (

        <>
            {
                profileData.writtenworks &&
                <div className={`profilePage ${showAddressPopup ? "freezePage" : ""}`}>
                    {!isLoggedIn ? <Redirect to="/login" /> : ""}
                    <div className={`popup-bg ${showAddressPopup ? 'showBlock' : ""}`}>
                        <div className="popup-address popup">
                            <div className="popup-header">
                                {console.log(nearbyAuthors)}
                                Find Authors Near Me
                            </div>
                            <div className="popup-body">
                                <p>Your address: {profileLocation.formattedAddress} </p>
                                <p>Find authors within radius (in miles): <input ref={miles} type="number" min="0" step="0.01" onChange={() => miles.current.value ? console.log(miles.current.value) : console.log(miles)} /></p>
                                {nearbyAuthors ? nearbyAuthors.users.map(user => { return <div className="nearbyaddress"><span> {user.firstName} {user.lastName}: </span> <span>{user.location.formattedAddress}</span></div> }) : console.log("noe")}
                            </div>
                            <div className="popup-footer">
                                <div className="cancel" onClick={() => { setShowAddressPopup(false); setNearbyAuthors() }}>Cancel</div>
                                <div className="find" onClick={findAuthorsNearbyHandler}>Find</div>
                            </div>
                        </div>
                    </div>
                    <div className="header">
                        <div className="section">
                            <div>
                                <img src={authorImage} alt="Profile Icon" />
                            </div>
                            <div>
                                <h1>{profileData.firstName} {profileData.lastName}</h1>
                                <div className="hoverBlendWhiteButton">{profileLocation.formattedAddress ?
                                    <div> {profileLocation.formattedAddress}</div> :
                                    addressFields ?
                                        <div className="addAddressArea">
                                            <input type="text" name="text" placeholder="Address" onChange={(e) => { addressLine = e.target.value }} />
                                            <input type="text" name="text" placeholder="City" onChange={(e) => { addressCity = e.target.value }} />
                                            <input type="text" name="text" placeholder="Country" onChange={(e) => { addressCountry = e.target.value }} />
                                            <input type="text" name="text" placeholder="Zipcode" onChange={(e) => { addressZipcode = e.target.value }} />
                                            <div onClick={addAddressHandler} className="button">Add</div>
                                        </div> :
                                        <div onClick={() => { setAddressFields(true) }}><img src={add} alt="Plus" /> Add Address</div>}</div>

                            </div>
                        </div>
                        <div className="section">
                            <div className="button" onClick={() => { setShowAddressPopup(true) }}>Find Authors Near Me</div>
                            <Link to="/createWrittenWork"><div className="button">+ New Written Work</div></Link>
                        </div>
                    </div>
                    <div className="cardsSection">
                        {profileData.writtenworks.map(writtenWork => { return <Card key={writtenWork._id} id={writtenWork._id} rerender={rerender} setRerender={setRerender} rating={writtenWork.averageRating} view={writtenWork.view} name={writtenWork.name} photo={writtenWork.photo} description={writtenWork.description} workType={writtenWork.workType} genre={writtenWork.genre} nsfw={writtenWork.nsfwContent} violence={writtenWork.violence} triggerWarning={writtenWork.suicideOrTriggerWarning} /> })}
                    </div>
                </div>
            }
        </>
    )
}

export default Profile
