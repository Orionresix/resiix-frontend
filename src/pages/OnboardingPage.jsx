import React from 'react'
import { Outlet } from 'react-router-dom'
import './OnboardingPage.css'
const OnboardingPage = () => {
  return (
    <div className='Center'>
      <Outlet />
     
    </div>
  )
}

export default OnboardingPage
