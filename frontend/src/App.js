import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import CardAC from './Component/CardAC';
import Deleter from './Component/Deleter';
import Login from './Component/Login';
import Profile from './Component/Profile';
import ProfileEdit from './Component/ProfileEdit';
import Register from './Component/Register';
import Settings from './Component/Settings';
import Signout from './Component/Signout';
import Sidebar from './Component/Sidebar';
import ViewClubs from './Component/ViewClubs';
import ViewClubEvents from './Component/ViewClubEvents';
import ViewClubAnnouncements from './Component/ViewClubAnnouncements';

/*
npm start
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
  
        <Route path="/home" element={<Sidebar />} >
          <Route path="ac" element={<CardAC />} />
          <Route path="clubs" element={<ViewClubs />} >
            <Route path=":clubID/events" element={<ViewClubEvents />} />
            <Route path=":clubID/announcements" element={<ViewClubAnnouncements />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile_edit" element={<ProfileEdit />} />
          <Route path="deleter" element={<Deleter />} />
          <Route path="signout" element={<Signout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;