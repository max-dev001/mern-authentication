import { useState, useEffect } from 'react';
import axios from 'axios';
import './ForgotPasswordScreen.css';

const ForgotPasswordScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/');
    }
  }, [history]);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/forgotpassword',
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail('');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email.
          </p>
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
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
