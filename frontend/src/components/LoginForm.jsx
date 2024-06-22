import { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { LoginContext } from '../contexts/loginContext.jsx';
import './LoginForm.css'

const HOST = import.meta.env.VITE_HOST
const LOGIN_ROUTE = import.meta.env.VITE_LOGIN_ROUTE


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const headers = {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      };

      const response = await axios.post(`${HOST}${LOGIN_ROUTE}`, {
        email: email,
        password: password,
      }, { headers });

      if(response.status === 200) {
        alert("Logged in Successfully")
        login();
      } else if (response.status === 401){
        alert("Incorrect Password")
      } else {
        alert("User Not Found")
      }


      Cookies.set('token', response.data.token);
      Cookies.set('username', response.data.username.split(' ')[0]);
      navigate('/user')
    } catch (error) {
      console.error('Axios Error submitting form:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>
        LET'S <br />
        GET YOU<br />
        BACK ON
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <input type="password" placeholder="PASS" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="member-link">
          New Here?
            <Link to='/Signup' className='signup-btn'>
              SIGNUP
            </Link>
        </div>
        <button type="submit" className="submit-btn">LOGIN</button>
      </form>
    </div>
  )
}

export default LoginForm
