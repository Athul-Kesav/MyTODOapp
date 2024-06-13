import React from 'react'
import lgPic1 from '../assets/LoginPic1.svg'
import lgPic2 from '../assets/LoginPic2.svg'
import LoginForm from '../components/LoginForm'
import './Login.css'

const Login = () => {
  return (
    <>
      <div className='container'>
        <div className='subCont1'>
          <img src={lgPic1} alt='form-filling' />
        </div>
        <div className='subCont2'>
          <LoginForm />
        </div>
        <div className='subCont3'>
          <img src={lgPic2} alt='painting' />
        </div>
      </div>
    </>
  )
}

export default Login