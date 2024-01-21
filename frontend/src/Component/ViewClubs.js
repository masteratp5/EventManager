import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import PromoteGenMember from './Component2/PromoteGenMember';
import Backdrop from './Component2/Backdrop';

export const ViewClubs = () => {
  const [filter, setFilter] = useState("");
  const [clubArr, setClubArr] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getClubs(){
      axios.get("/club", {
        data:{
          user_id: JSON.parse(localStorage.getItem("user")),
          filter: filter
        }
      }).then((response) => {
        if (response.data.error == "") {
          setClubArr(response.data.club_list);
        }
        else {  // display error, then go to previous page
          alert("Error: " + response.data.error);
          navigate(-1);
        }
      }).catch(error => {
        alert(error);
      })
    }
    getClubs();
  })

  // navigate to view events of particular club
  function goClubEvents(club) {
    navigate(club.club_id + "/events");
  }

  // navigate to view events of particular club
  function goClubAnnouncements(club) {
    navigate(club.club_id + "/announcements");
  }

  const handleSelect = (e) => {
    setFilter(e.target.value);
  }

  // used for promoting a general member -> board member
  const [promoteMemOpen, setPromoteMemOpen] = useState(false);
  function openPromoteMem(){
    setPromoteMemOpen(true);
  }
  function closePromoteMem(){
    setPromoteMemOpen(false);
  }

  return (
    <div>
      <div className ="card">
        <form>
          <label htmlFor="filter">Search by name: </label>
          <input
            type="text"
            value={filter}
            placeholder="search club by name"
          onChange={({ target }) => setFilter(target.value)}
          />
          <button type ="submit">Enter</button>
        </form>
      </div>
      {clubArr.map((club) => (
        <div className = "card">
          {club.name} (@{club.club_id})
          <div>
            <button className='btn btn--alt' onClick={() => goClubEvents(club)}> View Events </button>
            <button className='btn btn--alt' onClick={() => goClubAnnouncements(club)}> View Announcements </button>
          </div>
          <div>
            <div>
              Description
            </div>
            <div>
              {club.description}
            </div>
          </div>
          <div>
            <div>
              Board Members
            </div>
            <div>
              {club.board_members.map(member => <p>{member}</p>)}
            </div>
          </div>
          <div>
            <div>
              General Members
            </div>
            <div>
              {club.general_members.map(member => <p>{member}</p>)}
            </div>
            <div className ='actions'>
              <button className='btn' onClick={openPromoteMem}>Promote Member</button>
            </div>
            {promoteMemOpen && <PromoteGenMember onCancel={closePromoteMem}/>}
            {promoteMemOpen && <Backdrop onCancel={closePromoteMem}/>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewClubs;
