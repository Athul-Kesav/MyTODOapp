import React from 'react'
import sgPic1 from '../assets/SignupPic1.svg'
import sgPic2 from '../assets/SignupPic2.svg'
import sgPic3 from '../assets/SignupPic3.svg'
import SignupForm from '../components/SignupForm'
import './Signup.css'

const Signup = () => {
  return (
    <>
      <div className='container'>
        <div className='subCont1'>
          <img src={sgPic1} alt='form-filling' />
        </div>
        <div className='subCont2'>
          <SignupForm />
        </div>
        <div className='subCont3'>
          <img src={sgPic2} alt='painting' />
        </div>
      </div>
    </>
  )
}

export default Signup