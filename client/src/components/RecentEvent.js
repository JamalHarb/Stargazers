import React from 'react';
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";


const RecentEvent = (props) => {
  return (
    <div>
        <h3>All Stargazing events</h3>
      {
        props.events.map((event,idx)=>
        <div key={idx} style={{border:"1px solid black", marginTop:"10px", padding:"10px"}}>
        
        
      <p> {event.createdAt}</p>
     
        <p>{event.name}</p>
        <p>{event.location} </p>
        <p>{event.space} </p>
        {/* <p>{event.user_id.name} </p> */}

       
        </div>
        )
      }

    </div>
  )
}

export default RecentEvent