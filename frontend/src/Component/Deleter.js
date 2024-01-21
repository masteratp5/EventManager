import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "./Service/AuthService";

const deleteURL = "https://xhetcinp85.execute-api.us-west-1.amazonaws.com/prod/delete";

const Deleter = () => {
  const [password, setPassword] = useState("");
  const username = getUser().username;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === "") {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    const requestConfig = {
      headers: {
        "x-api-key": "n4mlBUgJbT3YSFHliX5tTeakXeB760x9GrdrVJIi",
      },
    };

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.delete(deleteURL, {
        data: requestBody,
        headers: requestConfig.headers,
      });

      alert("Account deletion successful!");
      resetUserSession();
      navigate("/");
    } catch (error) {
      alert(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div>
        <p>Delete Account Verification</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="btn btn--alt" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Delete Account"}
        </button>
      </form>
      <button className="btn btn--alt" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default Deleter;