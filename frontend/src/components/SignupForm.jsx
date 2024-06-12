import React from 'react'
import {Link} from "react-router-dom";
import './SignupForm.css'

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        email,
        password,
        fullName,
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>
        LET'S <br />
        GET YOU<br />
        STARTED
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="email" placeholder="EMAIL" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <input type="password" placeholder="PASS" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="input-group">
          <input type="text" placeholder="FULL NAME" onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="member-link">
          Already a Member?
          <button type="button">
            <Link to='/Login' className='login-btn'>
              LOGIN
            </Link>
          </button>
        </div>
        <button type="submit" className="submit-btn">LET'S GO</button>
      </form>
    </div>
  )
}

export default SignupForm