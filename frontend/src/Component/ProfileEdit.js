import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "./Service/AuthService";

const updateUserURL = "https://xhetcinp85.execute-api.us-west-1.amazonaws.com/prod/updateUserT";

const ProfileEdit = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email || "",
    name: user.name || "",
    password: "", // You might want to handle password changes securely
    userDescription: user.userDescription || "",
    userId: user.userId || ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(updateUserURL, {
        currentUsername: user.username,
        ...formData
      });

      alert(response.data.message);
      navigate("/profile"); // Redirect to the profile page after successful update
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <div>
      <div classname = 'card'>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor="userDescription">Description:</label>
          <textarea
            id="userDescription"
            name="userDescription"
            value={formData.userDescription}
            onChange={handleChange}
          />

          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;