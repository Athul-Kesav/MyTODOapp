import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './LoginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const headers = {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      };


      const response = await axios.post('https://https://done-it-six.vercel.app/login', {
        email: email,
        password: password,
        fullname: fullname,
      }, { headers });

      Cookies.set('token', response.data.token);
      //Cookies.set('username', response.data.fullname.split(' ')[0]);
      alert("Logged in Successfully")
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
        <div className="input-group">
          <input type="text" placeholder="FULL NAME" value={fullname} onChange={(e) => setFullName(e.target.value)} required />
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
