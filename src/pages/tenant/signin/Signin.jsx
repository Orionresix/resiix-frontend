import React, {useState} from 'react';
import './Signin.css';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        console.log(email, password);
        navigate('/resix/report-issue');
    }
  return (
    <div className='auth-container'>
        <div className="logo">
            <img src={logo} alt="logo"/>
        </div>
        <div className="auth-welcome">
            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details.</p>
        </div>
        <form className="auth-form" onSubmit={(e) => {login(e)}}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="flex-row-space">
                <div className="flex-row">
                    <input type="checkbox" id="remember-me" name="remember-me" required/>
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <div className="form-group">
                    <a href="/forgot-password">Forgot password?</a>
                </div>
            </div>
            <div className="form-group">
                <button type="submit">Sign in</button>
            </div>
        </form>
    </div>
  )
}

export default Signin