import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/main.css";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function NavBar() {
  const navRef = useRef();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  const logout = e => {
    e.preventDefault();
    axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

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

  return (loaded &&
    <header>
      <h1>
        <StarOutlineIcon />
        <span>Star</span>gazers
      </h1>

      <nav ref={navRef}>
        <Link to="/home">Home</Link>
        <Link to="/search">Search Events</Link>
        <Link to="/chat">Chat Page</Link>
        <Link to="/about">About Us</Link>
        <Link to="/userform">My Profile</Link>
        <Button style={{ color: "white" }} onClick={logout} onMouseOver={(e) => e.target.style.color = 'gold'} onMouseOut={(e) => e.target.style.color = 'white'}>Logout</Button>
        <Stack>
          <Avatar>{loggedUser.firstName[0]}{loggedUser.lastName[0]}</Avatar>
        </Stack>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default NavBar;
