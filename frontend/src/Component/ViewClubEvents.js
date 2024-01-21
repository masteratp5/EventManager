import {useParams, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventMaker from './Component2/EventMaker';
import Backdrop from './Component2/Backdrop';


export const ViewClubEvents = () => {
  let navigate = useNavigate();
  let {clubID} = useParams();
  //club's event parameters
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState("");


  useEffect(() => {
    async function getEvents(){
      axios.get("/event", {
        params:{
          user_id: JSON.parse(localStorage.getItem("user")),
          club_id: clubID,
          filter: filter,
          limit: limit
        }
      }).then((response) => {
        if (response.data.error == "") setEvents(response.data.event_list);
        else alert("Error: " + response.data.error);
      }).catch (error => {
        alert(error);
        navigate(-1);
      });
    };
    getEvents();
  }, [])

  function handleJoinStatus(event){
    async function handleHelper(callEvent){
      axios.put("/event", {
        params:{
          user_id: JSON.parse(localStorage.getItem("user")),
          club_id: clubID,
          event_id: callEvent.data.event_id
        }
      }).then ((response) => {
        if(response.data.error == ""){
          if(response.data.added == true) {
            alert("Event: " + callEvent.data.event_id + " was successfully subscribed to!");
          }
          else if (response.data[0].removed == true){
            alert("Event: " + callEvent.data.event_id + " was successfully removed from subscription!");
          }
        }
        else alert("Error: " + response.data.error)
      }).catch (error => alert(error));
    }
    handleHelper(event);
  }

  // used to create an event
  const[eventMakerOpen, setEventMakerOpen] = useState(false);
  function openEventMaker(){
    setEventMakerOpen(true);
  }
  function closeEventMaker(){
    setEventMakerOpen(false);
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
        <div className = "card" >
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
          <p>{clubID}'s Events:</p>
          <div className='actions'>
            <button className='btn' onClick={openEventMaker}>Create an Event</button>
          </div>
        </div>
        {eventMakerOpen && <EventMaker onCancel={closeEventMaker}/>}
        {eventMakerOpen && <Backdrop onCancel={closeEventMaker}/>}
        <div>
          {events.map((event) => (
          <div className = "card">
            <p>{event.title} (@{event.event_id})</p>
            <p>Organized By {event.club_id}</p>
            <p>Planned Date: {event.planned_date}</p>
            <p>Event Created: {event.date_generated}</p>
            <p>Capacity: {event.num_attending}/{event.event_capacity}</p>
            <div>
              <div>
                Description
              </div>
              <div>
                {event.description}
              </div>
            </div>
            <div>
              <div>
                People Involved
              </div>
              <div>
                {event.people_involved.map((person) => (
                  <p>{person}</p>
                ))}
              </div>
            </div>
            <button className='btn' onClick={() => handleJoinStatus(event)}>Mark Event</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewClubEvents;
