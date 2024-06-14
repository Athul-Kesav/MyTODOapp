import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './SignupForm.css'

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Full Name:', fullname);

    try {

      const headers = {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      };


      const response = await axios.post('http://localhost:3001/signup', {
        email: email,
        password: password,
        fullname: fullname,
      }, { headers });

      Cookies.set('token', response.data.token);
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