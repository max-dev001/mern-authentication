import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginScreen.css';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/');
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
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
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            tabIndex={1}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{' '}
            <Link
              to="/forgotpassword"
              className="login-screen__forgotpassword"
              tabIndex={4}
            >
              Forgot Password?
            </Link>
          </label>
          <input
            tabIndex={2}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" tabIndex={3}>
          Login
        </button>
        <span className="login-screen__subtext">
          Don't have an account?
          <Link to="/register" tabIndex={5}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
