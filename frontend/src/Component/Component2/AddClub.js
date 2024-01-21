import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function AddClub(props){
  const [clubID, setClubID] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async e =>{
    e.preventDefault();
    axios.post("/clubmembers", {
      params:{
        user_id: JSON.parse(localStorage.getItem("user")),
        club_id: clubID
      }
    }).then((response) => {
      if (response.data.error == "") {
        alert("Club was successfully joined!");
        navigate("/home/ac")
      }
      else alert("Error: " + response.data.error);
    }).catch(error => {
      alert(error);
    });
  };

  return (
    <div className='modal'>
      <div>
        <p>Add Club</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="clubID">Enter the club ID: </label>
        <input
          type="text"
          value={clubID}
          placeholder="enter your club ID"
          onChange={({ target }) => setClubID(target.value)}
        />
        <button className='btn btn--alt' type ="submit">Enter</button>
      </form>
      <button className='btn btn--alt' onClick={props.onCancel}>Go Back</button>
    </div>
  );
}

export default AddClub;
