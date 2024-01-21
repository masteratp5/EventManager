import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useParams} from "react-router-dom";

function AnnouncementMaker(props){
  let navigate = useNavigate();
  let {clubID} = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async e =>{
    e.preventDefault();
    axios.post("http://localhost:3001/clubs", {
      user_id: JSON.parse(localStorage.getItem("user")),
      club_id: clubID,
      title: title,
      description: desc,
    }).then ((response) => {
      if (response.data.error == "") {
        alert("Announcement " + title + " was successful!");
        navigate("/clubs/" + clubID + "/announcements");
      }
      else (alert("Error: " + response.data.error));
    }).catch (error => {
      alert(error);
      navigate("/clubs/" + clubID + "/announcements");
    });
  };


  return (
    <div className='modal'>
      <div>
        <p>Create Announcement for {clubID}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            value={title}
            placeholder="enter the announcement title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
        <label htmlFor="announcementDescription">Description: </label>
        <input
          type="text"
          value={desc}
          placeholder="enter your announcement description"
          onChange={({ target }) => setDesc(target.value)}
          />
        </div>
        <button className='btn btn--alt' type ="submit">Enter</button>
      </form>
      <button className='btn btn--alt' onClick={props.onCancel}>Go Back</button>

    </div>
  );
}

export default AnnouncementMaker;
