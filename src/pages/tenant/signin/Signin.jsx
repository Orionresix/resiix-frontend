import { React, useState, useEffect } from 'react'
import './Signin.css';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
// import TenantContext from '../tenantContext';

const Signin = () => {
    const baseURL = process.env.REACT_APP_BASE_URLs

    // const { loginUser } = useContext(TenantContext);
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passcode, setPasscode] = useState('');
    const [unitDetails, setUnitDetails] = useState(null); // State to store unit details
    const [loggedIn, setLoggedIn] = useState(false)


    const handleLogin = () => {
        const url = `${baseURL}/tenantlogin?email=${email}&passcode=${passcode}`
        // Call the API to authenticate user
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUnitDetails(data);
                setLoggedIn(true);
            })
            
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    console.log(unitDetails)
   

    useEffect(() => {
        if (loggedIn) {
            navigate('/resiix/reported', { state: { unitDetails } });
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
                <button type="button" onClick={handleLogin}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Signin