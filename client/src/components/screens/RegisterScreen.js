import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterScreen.css';

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/');
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        { username, email, password },
        config
      );
      localStorage.setItem('authToken', data.token);
      history.push('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Enter Password Again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <span className="register-screen__subtext">
          Already have an account?<Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
