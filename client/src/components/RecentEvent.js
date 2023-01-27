import React, { useState } from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from '@mui/material';
import NavBar from './NavBar';

const RecentEvent = (props) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");

  return (
    <>
    {<NavBar />}
    
    <div
      style={{
        display: "flex",
        // padding: "2%",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      
      {props.events.map((event, idx) =>
        <Card
          sx={{
            maxWidth: 345,
            marginTop: "5%",
            backgroundColor: "hsl(0 0% 100% / 0.5)",
            color: "gold",
            textShadow: "1px 1px 2px black",
            boxShadow: "5px 5px 8px gold",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              <h5><Link to={'/events/' + event._id} style={{ color: "gold", textDecoration: "none" }}>{event.name}</Link></h5>
            </Typography>
            <Grid style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body3" sx={{ color: "black" }}>
                Date: {format(new Date(event.date.toString()), "MMMM do, yyyy")}
              </Typography>
              <Typography variant="body3" sx={{ color: "black" }}>
                Location: {event.location}
              </Typography>


              {event.creator_id._id === props.loggedUser._id ?
                <Typography variant="body3" sx={{ color: "black" }}>
                  Capacity: {event.capacity}
                </Typography>
                : ""
              }
              {event.capacity - event.attendees.length > 0 ?
                <Typography variant="body3" sx={{ color: "black" }}>
                  Available Spots: {event.capacity - event.attendees.length}
                </Typography>
                :
                <Typography variant="body3" sx={{ color: "black" }}>
                  This event is full
                </Typography>
              }
              {event.creator_id._id === props.loggedUser._id ?
                <Typography variant="body3" sx={{ color: "gold" }}>
                  This is one of your events
                </Typography>
                :
                <Typography variant="body3" sx={{ color: "gold" }}>
                  Created By: {event.creator_id.firstName} {event.creator_id.lastName}
                </Typography>
              }
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
    </>



    // <div>
    //   <h3>All Stargazing events</h3>
    //   <div>
    //     <p>Search for events</p>
    //     <p><input type="text" placeholder='search location' onChange={e => setSearchLocation(e.target.value)} /></p>
    //     {/* <p>
    //       <label htmlFor="from-date">from date</label>
    //       <input name='from-date' type="date" onChange={e => { console.log(e.target.value); setSearchFromDate(e.target.value) }} />
    //     </p>
    //     <p>
    //       <label htmlFor="to-date">to date</label>
    //       <input name='to-date' type="date" onChange={e => setSearchToDate(e.target.value)} />
    //     </p> */}
    //   </div>
    //   {
    //     props.events
    //       .filter(event => event.location.toLowerCase().includes(searchLocation.toLowerCase()))
    //       // .filter(event => new Date(event.date) >= new Date(searchFromDate))
    //       // .filter(event => new Date(event.date) <= new Date(searchToDate))
    //       .map((event, idx) =>
    //         <div key={idx} style={{ border: "1px solid black", marginTop: "10px", padding: "10px" }}>
    //           <p>Name: <Link to={'/events/' + event._id}>{event.name}</Link></p>
    //           <p>Date: {format(new Date(event.date.toString()), "MMMM do, yyyy")}</p>
    //           <p>Location: {event.location} </p>
    //           <p>Purpose: {event.space} </p>
    //           {event.creator_id._id === props.loggedUser._id ? <p>Capacity: {event.capacity}</p> : ""}
    //           {event.capacity - event.attendees.length > 0 ? <p>Available Spots: {event.capacity - event.attendees.length}</p> : <p>This event is full</p>}
    //           {event.creator_id._id === props.loggedUser._id ? <p>This is one of your events</p> : <p>Created By: {event.creator_id.firstName} {event.creator_id.lastName}</p>}
    //         </div>
    //       )
    //   }
    // </div>
  )
}

export default RecentEvent