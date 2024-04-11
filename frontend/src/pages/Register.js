import React, { useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from '../components/Success'
import axios from "axios";
import { Link } from 'react-router-dom'; 
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [cpasswordError, setCPasswordError] = useState("");

    async function register() {
        let isValid = true;

        // Name validation: Only characters allowed
        if (!/^[A-Za-z ]+$/.test(name)) {
            setNameError("Name can only contain alphabets and spaces");
            isValid = false;
        } else {
            setNameError("");
        }

        // Email validation: Email pattern validation
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError("Invalid email address");
            isValid = false;
        } else {
            setEmailError("");
        }

        // Password validation: Required field
        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError("");
        }

        // Confirm password validation: Match with password
        if (password !== cpassword) {
            setCPasswordError("Passwords do not match");
            isValid = false;
        } else {
            setCPasswordError("");
        }

        if (!isValid) {
            return;
        }

        const user = {
            name,
            email,
            password
        };

        try {
            setLoading(true);
            const result = await axios.post('/api/users/register', user).data;
            setLoading(false);
            setSuccess(true);
            setEmail('');
            setName('');
            setPassword('');
            setCPassword('');
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div>
            
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
                {loading && (<Loader />)}
            {success && (<Success success='User Registered Successfully' />)}
            {error && (<Error />)}
                    <div>
                        <h2>Register</h2>
                        <input required type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        {nameError && <p className="error">{nameError}</p>}
                        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <p className="error">{emailError}</p>}
                        <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className="error">{passwordError}</p>}
                        <input required type="password" placeholder="Confirm Password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                        {cpasswordError && <p className="error">{cpasswordError}</p>}
                        <button onClick={register} className="btn btn-primary rounded-pill mt-3 mb-3">REGISTER</button>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
