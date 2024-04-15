import React from 'react'
import './Landing.css'
import logo from '../../../assets/logo.svg'
import landing from '../../../assets/landing.png'

const Landing = () => {
  return (
    <div className='landing'>
        <div className="first-cont">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="landing-image">
                <img src={landing} alt="landing"/>
            </div>
        </div>
        <div className="second-cont">
            <div className="welcome">
                <h1>Welcome to Resiix</h1>
                <p>You can easily work on your assigned maintenaince repairs by clicking the button below. To track the progress of your assigned tasks, sign in using the details.</p>
            </div>
            <div className="landing-cta">
                <a href="/resiix/startwork" className="btn-link1">Assigned Maintenance Requests</a>
            </div>
        </div>
    </div>
  )
}

export default Landing