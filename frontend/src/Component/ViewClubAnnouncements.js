import {useParams, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AnnouncementMaker from './Component2/AnnouncementMaker';
import Backdrop from './Component2/Backdrop';


export const ViewClubAnnouncements = () => {
  let navigate = useNavigate();
  let {clubID} = useParams();
  //club's event parameters
  const [annos, setAnnos] = useState([]);
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState("");


  useEffect(() => {
    async function getEvents(){
      axios.get("/announcement", {
        params:{
          user_id: JSON.parse(localStorage.getItem("user")),
          club_id: clubID,
          filter: filter,
          limit: limit
        }
      }).then((response) => {
        if (response.data.error == "") setAnnos(response.data.announcements_list);
        else alert("Error: " + response.data.error);
      }).catch (error => {
        alert(error);
        navigate(-1);
      });
    };
    getEvents();
  }, [])

  // used to create an event
  const[annoMakerOpen, setAnnoMakerOpen] = useState(false);
  function openAnnoMaker(){
    setAnnoMakerOpen(true);
  }
  function closeAnnoMaker(){
    setAnnoMakerOpen(false);
  }

  return (
    <div>
        <div className = "card">
          <button className='btn btn--alt'onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <div className = "card">
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
        <div className = "card">
          <form>
            <label htmlFor="limit">Change viewing limit: </label>
            <input
              type="text"
              value={limit}
              placeholder="change the viewing limit"
              onChange={({ target }) => setLimit(target.value)}
              />
            <button type ="submit">Enter</button>
          </form>
        </div>
        <div className = "card">
          <p>{clubID}'s Announcements:</p>
          <div className='actions'>
            <button className='btn' onClick={openAnnoMaker}>Create an Announcement</button>
          </div>
        </div>
        {annoMakerOpen && <AnnouncementMaker onCancel={closeAnnoMaker}/>}
        {annoMakerOpen && <Backdrop onCancel={closeAnnoMaker}/>}
        <div>
          {annos.map((anno) => (
            <div className = "card">
              <p>Title: "{anno.title}" ID:{anno.announcement_id}</p>
              <p>(From {anno.club_id} @ {anno.date_generated})</p>
              <p> {anno.description} </p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ViewClubAnnouncements;
