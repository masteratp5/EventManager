import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getUser, getToken, setUserSession, resetUserSession } from './Service/AuthService';

const loginURL = "https://xhetcinp85.execute-api.us-west-1.amazonaws.com/prod/login";
const verifyTokenAPIURL = "https://xhetcinp85.execute-api.us-west-1.amazonaws.com/prod/verify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticating, setAuthenticating] = useState(true);
  const token = getToken();

  //check for existing session
  useEffect(() => {
    if (!token) {
      setAuthenticating(false);
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'n4mlBUgJbT3YSFHliX5tTeakXeB760x9GrdrVJIi',
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        alert("Session still exists.");
        navigate("/home");
      })
      .catch((error) => {
        resetUserSession();
        alert(error.message);
      })
      .finally(() => {
        setAuthenticating(false);
      });
  }, []);

  if (isAuthenticating) {
    return <div className="content">Authenticating...</div>;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    const requestConfig = {
      headers: {
        'x-api-key': 'n4mlBUgJbT3YSFHliX5tTeakXeB760x9GrdrVJIi'
      }
    }

    const requestBody = {
      username: username,
      password: password
    }

    try {
      const response = await axios.post(loginURL, requestBody, requestConfig);
      setUserSession(response.data.user, response.data.token);
      navigate("/home/ac");
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const goRegister = () => {
    navigate("/register");
  };

  return (
    <div className='card'>
      <div>
        Welcome to Event Manager!
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          placeholder="Enter a username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            placeholder="Enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className='btn btn--alt' type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button className='btn btn--alt' onClick={goRegister}>Register Now</button>
      </form>
    </div>
  );
};

export default Login;