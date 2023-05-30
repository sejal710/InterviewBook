import React, { useState } from 'react';
import '../Sass/Login.scss';
import Logo from '../Components/Logo';
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    let data = {email:email,password:password}
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Handle successful response
        const responseData = await response.json();
        console.log(responseData);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      // Handle any network or general error
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Logo />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p className="create-account">Don't have an account? <a href="/signup">Create Account</a></p>
      </form>
    </div>
  );
};

export default Login;

