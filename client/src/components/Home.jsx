// import React from 'react'
import "../Styles/body.css";
import * as React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Tab from '@mui/material/Tab';
import NavBar from './NavBar';

const PageImage = () => {
  return (
    <>
    {<NavBar />}
      {/* <body></body> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          marginTop: "12%",
          marginLeft: '7%'
        }}
      >
        <button
          style={{
            marginRight: "10%",
            width: "700px",
            height: "250px",
            border: "none",
            borderRadius: "100px",
            outline: "none",
            background: "rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
          }}

        >
          <Link to="/explore" style={{textDecoration: "none"}}><h1>Explore</h1></Link>
        </button>

        <button
          style={{
            marginRight: "10%",
            width: "700px",
            height: "250px",
            border: "none",
            borderRadius: "100px",
            outline: "none",
            background: "rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Link to="/nasaapi"  style={{textDecoration: "none"}}><h1>NASA API</h1></Link>
        </button>
        <button class="button"
          style={{
            marginRight: "10%",
            width: "700px",
            height: "250px",
            border: "none",
            borderRadius: "100px",
            outline: "none",
            background: "rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Link to="/chat" style={{textDecoration: "none"}}><h1>Chat Page</h1></Link>
        </button>
      </div>
    </>
  );
}

export default PageImage