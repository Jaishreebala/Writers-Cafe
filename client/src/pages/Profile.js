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
    return (

        <>
            {
                profileData.writtenworks &&
                <div className="profilePage">
                    {!isLoggedIn ? <Redirect to="/login" /> : ""}
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
                            {/* <div className="button">Find Authors Near Me</div> */}
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
