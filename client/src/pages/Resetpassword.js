import React, { useState, useRef } from 'react'
import Error from '../components/Error';
import { Link } from 'react-router-dom'
import logoNoBg from '../images/logoNoBg.svg';
import { useParams } from 'react-router';

function Resetpassword() {
    const { resettoken } = useParams();
    const [errors, setErrors] = useState("");
    const inputPassword = useRef();
    const resetHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/auth/resetpassword/${resettoken}`, {
                method: "PUT",
                body: JSON.stringify({
                    password: inputPassword.current.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json();
            console.log(data.success)
            if (data.success) {
                setErrors("");
                console.log("Logging in...")
            }
            else {
                setErrors(data.error);
            }
            console.log(errors)
        } catch (err) {
            console.log(err)
        }

    }
    console.log(resettoken)
    return (
        <div className="login">
            <img src={logoNoBg} alt="Main Logo" />
            <form className="login-form">
                <h1>Reset Account Password</h1>
                <Error error={errors} />

                <div className="searchInput">
                    <input ref={inputPassword} type="password" name="password" required />
                    <label className="label-name"> <span className="content-name">
                        New Password
                </span>
                    </label>
                </div>
                <button onClick={resetHandler} className="button marginTop">Reset Password</button>
                <div className="links borderTop">Back to<b>
                    <Link to="/login">Log In</Link>
                </b></div>
            </form>
        </div>
    )
}

export default Resetpassword
