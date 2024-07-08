import { useState, useContext  } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/loginContext.jsx';
import Cookies from 'js-cookie';
import './SignupForm.css'

const HOST = import.meta.env.VITE_HOST
const SIGNUP_ROUTE = import.meta.env.VITE_SIGNUP_ROUTE

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(`${HOST}${SIGNUP_ROUTE}`, {
        email: email,
        password: password,
        fullname: fullname,
      }, { headers });

      if(response.status !== 201) {
        alert("Error signing up")
        navigate('/Signup')
      }

      login();

      Cookies.set('token', response.data.token);
      Cookies.set('username', fullname.split(' ')[0]);

      alert("Signed up successfully")
      navigate('/user')
    } catch (error) {
      console.error('Axios Error submitting form:', error);
    }
  };

  return (
    <div className="signup-form">
      <h2>
        LET'S <br />
        GET YOU<br />
        STARTED
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group-signup">
          <input type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group-signup">
          <input type="password" placeholder="PASS" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="input-group-signup">
          <input type="text" placeholder="FULL NAME" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        </div>
        <div className="member-link">
          Already a Member?
            <Link to='/Login' className='login-btn'>
              LOGIN
            </Link>
        </div>
        <button type="submit" className="submit-btn">LET'S GO</button>
      </form>
    </div>
  )
}

export default SignupForm
