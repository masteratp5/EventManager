import React, { useEffect,useState } from "react";
import axios from "axios";
import {SidebarData} from './Component2/SidebarData';
import {Outlet} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import {getUser, getToken, setUserSession, resetUserSession } from './Service/AuthService';

const verifyTokenAPIURL = "https://xhetcinp85.execute-api.us-west-1.amazonaws.com/prod/verify";

function Sidebar(){
  const [isAuthenticating, setAuthenticating] = useState(true);
  const token = getToken();
  const user = getUser();
  const navigate = useNavigate();

  //check if session exists
  useEffect(() => {
    if (!token) {
      setAuthenticating(false);
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'n4mlBUgJbT3YSFHliX5tTeakXeB760x9GrdrVJIi',
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
      })
      .catch((error) => {
        resetUserSession();
        alert("Session has expired. Please login again.");
        alert(error.message);
        navigate("/login");
      })
      .finally(() => {
        setAuthenticating(false);
      });
  }, []);

  if (isAuthenticating) {
    return <div className="content">Authenticating...</div>;
  }

  return (
    <div>
      <div className="sidebar">
        <ul >
          <p>Hello,</p>
          <p>{user.name}(@{user.userId})</p>
        </ul>
        <ul className="sidebarList">
          {SidebarData.map((val, key) => {
            return(
              <li
                key={key}
                className= "row"
                id={window.location.pathname === val.path ? "active" : ""}
                onClick={()=>{
                  navigate(val.path);
                }}
              >
                <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
