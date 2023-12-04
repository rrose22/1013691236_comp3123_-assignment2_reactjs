import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/user/login', {
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
        console.error('Signup login:', errorData.message);
        // Add error handling logic
      }
    } catch (error) {
      console.error('Error during login:', error.message);
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
    navigate('/')
    
  };
return (
  <div style={loginContainerStyle}>
  <h2>Login</h2>
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
)};

// Inline styles
const loginContainerStyle = {
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
export default Login;
