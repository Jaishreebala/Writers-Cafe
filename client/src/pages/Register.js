import React, { useRef, useState } from 'react'
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import logoNoBg from '../images/logoNoBg.svg';
function Register() {
    const [errors, setErrors] = useState("");
    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputFirstName = useRef();
    const inputLastName = useRef();
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/v1/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    firstName: inputFirstName.current.value,
                    lastName: inputLastName.current.value,
                    email: inputEmail.current.value,
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

    return (
        <div className="login">
            <img src={logoNoBg} alt="Main Logo" />
            <form className="login-form">
                <h1>Create Your Writer’s Cafe Account</h1>
                <Error error={errors} />
                <div className="searchInput">
                    <input ref={inputFirstName} type="text" name="firstName" required />
                    <label className="label-name"> <span className="content-name">
                        First Name
                    </span>
                    </label>
                </div>
                <div className="searchInput">
                    <input ref={inputLastName} type="text" name="lastName" required />
                    <label className="label-name"> <span className="content-name">
                        Last Name
                    </span>
                    </label>
                </div>
                <div className="searchInput">
                    <input ref={inputEmail} type="text" name="email" required />
                    <label className="label-name"> <span className="content-name">
                        Email
                    </span>
                    </label>
                </div>
                <div className="searchInput">
                    <input ref={inputPassword} type="password" name="password" required />
                    <label className="label-name"> <span className="content-name">
                        Password
                    </span>
                    </label>
                </div>
                <button onClick={loginHandler} className="button">Register</button>
                <div className="links borderTop">Already Have An Accout? <b>
                    <Link to="/login">Log In</Link>
                    {/* <a href="/login">Log In</a> */}
                </b></div>
            </form>
        </div>
    )
}


export default Register
