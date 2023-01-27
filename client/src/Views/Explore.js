import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import RecentEvent from '../components/RecentEvent';
import TopEvent from '../components/TopEvent';


const Explore = () => {

  const [events, setEvents] = useState([]);
  const [topEvents, setTopEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then(res => {
        console.log("events", res.data);
        setEvents(res.data);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/logged', { withCredentials: true })
      .then(res => {
        console.log(res);
        setLoggedUser(res.data.user);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      });
  }, [navigate]);

  const logout = e => {
    e.preventDefault();
    axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  }


  return (loaded &&
    <div>
      <div>
        <div >
          {loaded && <RecentEvent events={events} loggedUser={loggedUser} />}
        </div>
        {/* <div style={{ width: "300px", height: "800px", padding: "10px" }}>
          {loaded && <TopEvent loggedUser={loggedUser} />}
        </div> */}

      </div>
    </div>
  )
}

export default Explore

