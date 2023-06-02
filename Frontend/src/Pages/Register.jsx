import React, { useState } from 'react';
import '../Sass/Login.scss';
import Logo from '../Components/Logo';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[name,setName] = useState("");
  const [loading,setLoading] = useState(false)
  const { addToast } = useToasts();
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    let data = {email:email,password:password,name:name}
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        // Handle successful response
        setLoading(false)
        addToast( responseData.Message, { appearance: 'success' });
        navigate("/")
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error(errorData);
        setLoading(false)
        addToast( responseData.Message, { appearance: 'error' });
      }
    } catch (error) {
      // Handle any network or general error
      console.error(error);
      setLoading(false)
      addToast( "Eroor", { appearance: 'error' });
    }
    setName("");
    setEmail("");
    setPassword("")
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Logo />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type="submit" disabled = {loading}>{loading === true ? "Loading....":"Create Account"}</button>
      </form>
    </div>
  );
};

export default Register;
