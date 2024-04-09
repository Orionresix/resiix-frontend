import { React, useState, useEffect } from 'react'
import './Signin.css';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
// const baseURL = 'https://orionbackend-1.onrender.com';
const baseURL = 'http://127.0.0.1:5000';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passcode, setPasscode] = useState('');
    const [unitDetails, setUnitDetails] = useState(null); // State to store unit details
    const [loggedIn, setLoggedIn] = useState(false)


    const handleLogin = () => {
        // Call the API to authenticate user
        fetch(`${baseURL}/tenantlogin?email=${email}&passcode=${passcode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUnitDetails(data);
                setLoggedIn(true);
                console.log(data)
            })
            
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
   

    useEffect(() => {
        if (loggedIn) {
            navigate('/resix/report-issue', { state: { unitDetails } });
            console.log(unitDetails)
        }
    }, [loggedIn, navigate, unitDetails]);
    





  return (
    <div className='auth-container'>
        <div className="logo">
            <img src={logo} alt="logo"/>
        </div>
        <div className="auth-welcome">
            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details.</p>
        </div>
        <form className="auth-form" 
        // onSubmit={(e) => {handlelogin(e)}}
        >
            <div className="form-group">
                <label htmlFor="email">Unit code</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="passcode">Unit Passcode</label>
                <input type="passcode" id="passcode" name="passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} required/>
            </div>
            <div className="flex-row-space">
                <div className="flex-row">
                    <input type="checkbox" id="remember-me" name="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <div className="form-group">
                    <a href="/forgot-password">Forgot password?</a>
                </div>
            </div>
            <div className="form-group">
                <button type="button" onClick={handleLogin}>Sign in</button>
            </div>
        </form>
    </div>
  )
}

export default Signin