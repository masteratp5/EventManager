import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CreateClub(props){
  const [clubName, setClubName] = useState("");
  const [boardCode, setBoardCode] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e =>{
    e.preventDefault();
    axios.post("/clubs", {
      params: {
        user_id: JSON.stringify(localStorage.getItem("user")),
        club_name: clubName,
        board_code: boardCode,
        description: clubDesc,
      }
    }).then((response) => {
      if(response.error == "") {
        alert("Club creation successful!");
        navigate("/home/vclubs/" + response.data.club_id);
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
        <p>Create Club</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clubName">Club Name: </label>
          <input
            type="text"
            value={clubName}
            placeholder="enter your club's name"
            onChange={({ target }) => setClubName(target.value)}
            />
        </div>
        <div>
        <label htmlFor="boardCode">Board Code: </label>
        <input
          type="text"
          value={boardCode}
          placeholder="enter your board's code"
          onChange={({ target }) => setBoardCode(target.value)}
          />
        </div>
        <div>
        <label htmlFor="clubDesc">Club Description: </label>
        <input
          type="text"
          value={clubDesc}
          placeholder="enter your club's description"
          onChange={({ target }) => setClubDesc(target.value)}
          />
        </div>
        <button className='btn btn--alt' type ="submit">Enter</button>
      </form>
      <button className='btn btn--alt' onClick={props.onCancel}>Go Back</button>
    </div>
  );
}

export default CreateClub;
