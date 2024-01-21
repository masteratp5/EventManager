import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const registerURL = "https://xhetcinp85.execute-api.us-west-1.amazonaws.com/prod/register"

function Register(){
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // send form to server to create account
  const handleSubmit = async e =>{
    e.preventDefault();
    if (name.trim() === '' || username.trim() === '' || password.trim() === '' || email.trim() === '' || userId.trim() === ''){
      alert('All fields are required');
      return;
    }
    const requestConfig = {
      headers: {
        'x-api-key': 'n4mlBUgJbT3YSFHliX5tTeakXeB760x9GrdrVJIi'
      }
    }
    const requestBody = {
      name: name,
      username: username,
      password: password,
      email: email,
      userId: userId
    }
    axios.post(registerURL, requestBody, requestConfig).then(response => {
      alert("Regsitration successful! Please log into your new account.")
        navigate("/");
    }).catch(error => {
      alert(error);
    });
  };

  return (
    <div className='modal'>
      <div>
        <p>Create Account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            value={name}
            placeholder="enter your name"
            onChange={({ target }) => setName(target.value)}
            />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            placeholder="enter your username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            value={password}
            placeholder="enter your password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            value={email}
            placeholder="enter your email"
            onChange={({ target }) => setEmail(target.value)}
            />
        </div>
        <div>
          <label htmlFor="userId">ID: </label>
          <input
            type="text"
            value={userId}
            placeholder="enter your ID"
            onChange={({ target }) => setUserId(target.value)}
            />
        </div>
        <button className='btn btn--alt' type ="submit">Enter</button>
      </form>
      <button className='btn btn--alt' onClick = {() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Register;
