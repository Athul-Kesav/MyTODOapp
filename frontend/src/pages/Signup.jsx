import React from 'react'
import sgPic1 from '../assets/SignupPic1.svg'
import sgPic2 from '../assets/SignupPic2.svg'
import SignupForm from '../components/SignupForm'
import './Signup.css'

const Signup = ({ onLogin }) => {
  return (
    <>
      <div className='signupContainer'>
        <div className='signSubCont1'>
          <img src={sgPic1} alt='form-filling' />
        </div>
        <div className='signSubCont2'>
          <SignupForm onLogin = {onLogin}/>
        </div>
        <div className='signSubCont3'>
          <img src={sgPic2} alt='painting' />
        </div>
      </div>
    </>
  )
}

export default Signup