import React, { useEffect, useState, useRef } from 'react'
import { Redirect, Link } from 'react-router-dom'
import authorImage from '../images/profilePlaceholder.svg'
import Card from '../components/CardAuthor';
import add from '../images/plus.svg';
import DeletePopup from '../components/DeletePopup';

function Profile({ isLoggedIn }) {
    const [query, setQuery] = 'api/v1/auth/me';
    const [profileData, setProfileData] = useState([]);
    const [editAddress, setEditAddress] = useState();
    const [addressFields, setAddressFields] = useState(false);
    const [profileLocation, setProfileLocation] = useState({});
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    let addressLine = "";
    let addressCountry = "";
    let addressCity = "";
    let addressZipcode = "";
    useEffect(() => {
        getMyProfileHandler()
    }, [query])
    const getMyProfileHandler = async () => {
        try {
            const response = await fetch("api/v1/auth/me")
            const data = await response.json();
            // console.log(data)
            setProfileData(data.data);
            if (data.data.location) {
                setProfileLocation(data.data.location)
            }

        } catch (err) {
            console.log(err)
        }
        // console.log(profileData.writtenworks)
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
            // console.log(data);
            if (data.data.location) {
                setProfileLocation(data.data.location)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (

        <>
            {
                profileData.writtenworks &&
                <div className="profilePage">
                    {/* <DeletePopup showDeletePopup={showDeletePopup} setShowDeletePopup={setShowDeletePopup} id={'none'} /> */}

                    {!isLoggedIn ? <Redirect to="/read" /> : ""}
                    <div className="header">
                        <div className="section">
                            <div>
                                <img src={authorImage} alt="Profile Icon" />
                            </div>
                            <div>
                                <h1>{profileData.firstName} {profileData.lastName}</h1>
                                {console.log(profileLocation)}
                                <div className="hoverBlendWhiteButton">{profileLocation.formattedAddress ?
                                    <div> 1{profileLocation.formattedAddress}</div> :
                                    addressFields ?
                                        <div className="addAddressArea">
                                            2
                                            <input type="text" name="text" placeholder="Address" onChange={(e) => { addressLine = e.target.value }} />
                                            <input type="text" name="text" placeholder="City" onChange={(e) => { addressCity = e.target.value }} />
                                            <input type="text" name="text" placeholder="Country" onChange={(e) => { addressCountry = e.target.value }} />
                                            <input type="text" name="text" placeholder="Zipcode" onChange={(e) => { addressZipcode = e.target.value }} />
                                            <div onClick={addAddressHandler} className="button">Add</div>
                                        </div> :
                                        <div onClick={() => { setAddressFields(true) }}>3 <img src={add} alt="Plus" /> Add Address</div>}</div>

                            </div>
                        </div>
                        <div className="section">
                            {/* <div className="button">Find Authors Near Me</div> */}
                            <Link to="/createWrittenWork"><div className="button">+ New Written Work</div></Link>
                        </div>
                    </div>
                    <div className="cardsSection">
                        {profileData.writtenworks.map(writtenWork => { return <Card key={writtenWork._id} id={writtenWork._id} rating={writtenWork.averageRating} view={writtenWork.view} name={writtenWork.name} photo={writtenWork.photo} description={writtenWork.description} workType={writtenWork.workType} genre={writtenWork.genre} nsfw={writtenWork.nsfwContent} violence={writtenWork.violence} triggerWarning={writtenWork.suicideOrTriggerWarning} /> })}
                    </div>
                </div>
            }
        </>
    )
}

export default Profile
