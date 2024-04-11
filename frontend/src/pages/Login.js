import React, { useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import axios from "axios";
import { Link } from 'react-router-dom'; 
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loginUser() {
        const user = {
            email,
            password
        };

        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            
            // Redirect to the admin panel if the user is an admin
            if (response.data.isAdmin) {
                window.location.href='/admin';
            } else {
                window.location.href='/'; // Redirect to the home page for regular users
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setError("Invalid email or password");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error error={error} />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
                    <div>
                        <h2>Login</h2>
                        <input required type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input required type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={loginUser} className="btn btn-primary rounded-pill mt-3 mb-3">Login</button>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

// import React, { useState } from "react";
// import Error from "../components/Error";
// import Loader from "../components/Loader";
// import axios from "axios";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     async function loginUser() {
//         const user = {
//             email,
//             password
//         };

//         try {
//             setLoading(true);
//             const response = await axios.post('/api/users/login', user);
//             setLoading(false);
//             localStorage.setItem('currentUser', JSON.stringify(response.data));
            
//             window.location.href='/'// Redirect to the home page or do something else on successful login
//         } catch (error) {
//             setLoading(false);
//             if (error.response && error.response.status === 400) {
//                 setError("Invalid email or password");
//             } else {
//                 setError("An unexpected error occurred. Please try again later.");
//             }
//         }
//     }

//     return (
//         <div>
//             {loading && (<Loader />)}
//             {error && (<Error error={error} />)}
//             <div className="row justify-content-center mt-5">
//                 <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
//                     <div>
//                         <h2>Login</h2>
//                         <input required type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                         <input required type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                         <button onClick={loginUser} className="btn btn-primary rounded-pill mt-3 mb-3">Login</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;
