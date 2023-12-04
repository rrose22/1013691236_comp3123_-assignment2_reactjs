import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const signup = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     
      if (response.ok) {
        const dataRes = await response.json();
        console.log('User signed up successfully:', dataRes);
        
        // Add any additional logic you need after successful signup
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.message);
        // Add error handling logic
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Add general error handling logic
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login')
    
  };

  return (
    <div style={signupContainerStyle}>
      <h2>Signup</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <br />
        <label style={labelStyle}>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <br />
        <label style={labelStyle}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <br />
        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};
const signupContainerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '20px',
  width: '300px',
  margin: 'auto',
  marginTop: '50px',
  borderRadius: '8px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '10px',
};

const inputStyle = {
  padding: '8px',
  marginBottom: '15px',
};

const submitButtonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
export default Signup;
