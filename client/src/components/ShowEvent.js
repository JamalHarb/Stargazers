import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import NavBar from './NavBar';

const ShowEvent = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [isEventLoaded, setIsEventLoaded] = useState(false);
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/events/' + id)
      .then(res => {
        console.log("event data ", res.data)
        console.log("Number of attendees is ", res.data.attendees.length)
        console.log("attendees", res.data.attendees)
        setEvent(res.data);
        setIsEventLoaded(true);
      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/logged', { withCredentials: true })
      .then(res => {
        console.log(res);
        setLoggedUser(res.data.user);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      });
  }, [navigate]);

  const joinEvent = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/events/join/' + event._id, {
      userId: loggedUser._id
    })
      .then((res) => {
        console.log("Joined an existing event", res.data);
        navigate("/explore");
      })
      .catch((err) => {
        console.log("Error in joining", err);
      });
  }

  const leaveEvent = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/events/leave/' + event._id, {
      userId: loggedUser._id
    })
      .then(res => {
        console.log("Left an existing event", res.data);
        navigate('/explore');
      })
      .catch(err => console.log(err));
  }

  return (isEventLoaded &&
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

        <Card
          sx={{
            maxWidth: 600,
            marginTop: "2%",
            backgroundColor: "hsl(0 0% 100% / 0.5)",
            color: "gold",
            marginBottom: "20%",
            textShadow: "1px 1px 2px black",
            boxShadow: "5px 5px 8px gold",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              <h1 style={{ color: "gold" }}>{event.name}</h1>

            </Typography>
            <Typography variant="body3" sx={{ color: "black" }}>

              <p style={{ fontSize: "100%" }}>Astronomy phenomenon: {event.space}</p>
              <p style={{ fontSize: "100%" }}>Event location: {event.location}</p>
              <p style={{ fontSize: "100%" }}>Available Spots: {event.capacity - event.attendees.length}</p>
              {event.creator_id !== loggedUser._id ?
                !event.attendees.includes(loggedUser._id) ?
                  <Grid>
                    <Button fullWidth style={{
                      background: "white",
                      color: "black",
                      border: "black", marginTop: "5%"
                    }} onClick={joinEvent}>Join</Button>
                  </Grid>
                  :
                  <Grid>
                    <Button fullWidth style={{
                      background: "white",
                      color: "black",
                      border: "black", marginTop: "5%"
                    }} onClick={leaveEvent}>Leave</Button>
                  </Grid>
                :
                <div>
                  <Button
                    onClick={() => navigate("/events/edit/" + event._id)}
                    style={{
                      background: "white",
                      color: "black",
                      border: "black",
                      marginTop: '30px',
                    }}
                  >
                    Edit
                  </Button>
                  {/* <Link to={"/edit/" + event._id} >Edit event</Link> */}
                  <DeleteButton eventId={event._id} successCallback={() => navigate('/userform')} />
                </div>
              }
            </Typography>
          </CardContent>
        </Card>

      </div>
    </>






    // <div>
    //     <h1>Welcome {loggedUser.firstName}</h1>
    //     <button onClick={() => navigate('/explore')}>Go Back</button>
    //     <p>{event.name}</p>
    //     <p>{event.space}</p>
    //     <p>{event.location}</p>
    //     {event.creator_id === loggedUser._id ? <p>Capacity: {event.capacity}</p> : ""}
    //     {event.capacity - event.attendees.length > 0 ? <p>Available Spots: {event.capacity - event.attendees.length}</p> : <p>This event is full</p>}

    //     {
    //         event.creator_id !== loggedUser._id ?
    //             !event.attendees.includes(loggedUser._id) ?
    //                 event.capacity - event.attendees.length > 0 ?
    //                     <button onClick={joinEvent}>Join</button>
    //                     :
    //                     ""
    //                 :
    //                 <button onClick={leaveEvent}>Leave</button>
    //             :
    //             <div>
    //                 <DeleteButton eventId={event._id} successCallback={() => navigate('/explore')} />
    //                 <button onClick={() => navigate('/events/edit/' + event._id)}>Edit Event</button>
    //             </div>
    //     }
    // </div>
  )
}

export default ShowEvent
