import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useParams} from "react-router-dom";

function PromoteGenMember(props){
  let {clubID} = useParams();
  const [userID, setUserID] = useState("");
  const [boardCode, setBoardCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e =>{
    e.preventDefault();
    axios.put("/clubmembers", {
      params:{
        user_id: userID,
        club_id: clubID,
        board_code: boardCode
      }
    }).then((response) => {
      if (response.data.error == "") {
        alert(userID + " was successfully promoted to a board member!");
        navigate("/home/clubs/:clubID")
      }
      else alert("Error: " + response.data.error);
    }).catch(error => {
      alert(error);
      navigate(-1);
    });
  };

  return (
    <div className='modal'>
      <div>
        <p>Promote a General Member to Board Member</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userID">Enter the person's ID to promote: </label>
        <input
          type="text"
          value={clubID}
          placeholder="enter the person's ID"
          onChange={({ target }) => setUserID(target.value)}
        />
        <label htmlFor="userID">Enter the board code of {clubID} for authroization: </label>
        <input
          type="text"
          value={boardCode}
          placeholder="enter the board code"
          onChange={({ target }) => setBoardCode(target.value)}
        />
        <button type ="submit">Promote Member</button>
      </form>
      <button className='btn btn--alt' onClick={props.onCancel}>Go Back</button>
    </div>
  );
}

export default PromoteGenMember;
