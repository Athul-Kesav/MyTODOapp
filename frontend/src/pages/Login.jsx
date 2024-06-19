import React from 'react'
import lgPic1 from '../assets/LoginPic1.svg'
import lgPic2 from '../assets/LoginPic2.svg'
import LoginForm from '../components/LoginForm'
import './Login.css'

const Login = ({onLogin}) => {
  return (
    <>
      <div className='loginContainer'>
        <div className='lsubCont1'>
          <img src={lgPic1} alt='form-filling' />
        </div>
        <div className='lsubCont2'>
          <LoginForm onLogin={onLogin}/>
        </div>
        <div className='lsubCont3'>
          <img src={lgPic2} alt='painting' />
        </div>
      </div>
    </>
  )
}

export default Login