import React, { useState } from 'react';
import '../Sass/Login.scss';
import Logo from '../Components/Logo';
import { useNavigate} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const { addToast } = useToasts();
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
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
        setLoading(false)
        if(responseData.Message === "Wrong Credential"){
          addToast( responseData.Message, { appearance: 'error' });
        }
        else{ 
          addToast( responseData.Message, { appearance: 'success' });
          localStorage.setItem('Interview', JSON.stringify(responseData.ID));
          setLoading(false)
          navigate("/home")
        }
        
      } else {
        // Handle error responsee
        const errorData = await response.json();
        console.error(errorData);
        setLoading(false)
        addToast( "Eroor", { appearance: 'error' });
      }
    } catch (error) {
      // Handle any network or general error
      console.error(error);
      addToast( "Eroor", { appearance: 'error' });
    }
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
        <button type="submit" disabled={loading}>{loading === false ? "Login" : "Loading...."}</button>
        <p className="create-account">Don't have an account? <a href="/register">Create Account</a></p>
      </form>
    </div>
  );
};

export default Login;

