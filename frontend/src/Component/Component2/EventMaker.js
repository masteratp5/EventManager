import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useParams} from "react-router-dom";

function EventMaker(props){
  let navigate = useNavigate();
  let {clubID} = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [capacity, setCapacity] = useState("");
  const [plannedDate, setPlannedDate] = useState("");
  // used to help formate plannedDate
  const [dateYear, setDateYear] = useState("");
  const [dateMonth, setDateMonth] = useState("");
  const [dateDay, setDateDay] = useState("");
  const [dateHour, setDateHour] = useState("");
  const [dateMinute, setDateMinute] = useState("");
  const [dateSecond, setDateSecond] = useState("");

  const handleSubmit = async e =>{
    e.preventDefault();
    setPlannedDate(dateYear+"-"+dateMonth+"-"+dateDay+"T"+dateHour+":"+dateMinute+":"+dateSecond);
    axios.post("http://localhost:3001/clubs", {
      user_id: JSON.parse(localStorage.getItem("user")),
      club_id: clubID,
      title: title,
      description: desc,
      event_capacity: capacity,
      planned_date: plannedDate,
    }).then ((response) => {
      if (response.data.error == "") {
        alert("Event " + title + " was successful!");
        navigate("/clubs/" + clubID + "/events");
      }
      else (alert("Error: " + response.data.error));
    }).catch (error => {
      alert(error);
      navigate("/clubs/" + clubID + "/events");
    });
  };


  return (
    <div className='modal'>
      <div>
        <p>Create Event for {clubID}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Title: </label>
          <input
            type="text"
            value={title}
            placeholder="enter the event title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
        <label htmlFor="eventDesc">Event Description: </label>
        <input
          type="text"
          value={desc}
          placeholder="enter your event description"
          onChange={({ target }) => setDesc(target.value)}
          />
        </div>
        <div>
          <label htmlFor="capacity">Capacity: </label>
          <input
            type="text"
            value={capacity}
            placeholder="enter the max capacity"
            onChange={({ target }) => setCapacity(target.value)}
            />
        </div>
        <div>
          <label htmlFor="dateCalendar">Planned Calendar Date</label>
        </div>
        <div>
          <label htmlFor="dateYear">Year: </label>
          <input
            type="text"
            value={dateYear}
            placeholder="enter the year: (YYYY)"
            onChange={({ target }) => setDateYear(target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateMonth">Month: </label>
          <input
            type="text"
            value={dateMonth}
            placeholder="enter the month: (MM)"
            onChange={({ target }) => setDateMonth(target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateDay">Day: </label>
          <input
            type="text"
            value={dateDay}
            placeholder="enter the day: (DD)"
            onChange={({ target }) => setDateDay(target.value)}
          />
        </div>

        <div>
          <label htmlFor="dateCalendar">Planned Time Date</label>
        </div>
        <div>
          <label htmlFor="dateHour">Hour: </label>
          <input
            type="text"
            value={dateHour}
            placeholder="enter the hour (use 24-hour system): (HH)"
            onChange={({ target }) => setDateHour(target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateMinute">Minute: </label>
          <input
            type="text"
            value={dateMinute}
            placeholder="enter the minute: (MM)"
            onChange={({ target }) => setDateMinute(target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateSecond">Second: </label>
          <input
            type="text"
            value={dateSecond}
            placeholder="enter the second: (SS)"
            onChange={({ target }) => setDateSecond(target.value)}
          />
        </div>
        <button className='btn btn--alt' type ="submit">Enter</button>
      </form>
      <button className='btn btn--alt' onClick={props.onCancel}>Go Back</button>
    </div>
  );
}

export default EventMaker;
