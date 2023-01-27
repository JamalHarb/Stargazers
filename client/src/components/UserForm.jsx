import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../Styles/main.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar';

export default function UserForm() {
  const [loaded, setLoaded] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [myEvents, setMyEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/logged', { withCredentials: true })
      .then(res => {
        console.log(res);
        setLoggedUser(res.data.user);
        setLoaded(true);
        axios.get('http://localhost:8000/api/events/user/' + res.data.user._id)
          .then(res => {
            console.log("event data", res.data)
            // console.log("event 1 name is ", res.data[0].name)
            setMyEvents(res.data);
            setLoaded(true);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      });
  }, [navigate]);


  return (loaded &&
    <>
{<NavBar />}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "3%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: " hsl(0 0% 100% / 0.5)",
            width: "25%",
            marginLeft: "3%",
            borderRadius: "8px",
            textShadow: "1px 1px 2px black",
            boxShadow: "5px 5px 8px gold",
            padding: "2%",
            maxHeight: "300px",
          }}
        >
          <h2 style={{ color: "gold" }}>{loggedUser.firstName} {loggedUser.lastName}</h2>
          <Link style={{ textDecoration: "none", color: "white" }} to="/#">
            <h4>My Event</h4>
          </Link>

          <Button
            onClick={() => navigate('/events/create')}
            style={{
              background: "white",
              color: "black",
              border: "black",
              marginTop: '30px',
            }}
          >
            Creat Event
          </Button>
        </div>
        <div style={{width: "65%"}}>
          <h1 style={{ borderRadius: "8px", textShadow: "1px 1px 2px black", boxShadow: "5px 5px 8px gold", maxWidth:"90%", textAlign: "center", color: "gold", backgroundColor: "hsl(0 0% 100% / 0.5)" }}>My Events</h1>

          <div
            style={{
              display: "flex",
              padding: "2%",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              width: "95%",
              marginLeft: "10%",
            }}
          >

            {myEvents.map((event, idx) =>
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



                    <Typography variant="body3" sx={{ color: "black" }}>
                      Capacity: {event.capacity}
                    </Typography>

                    {event.capacity - event.attendees.length > 0 ?
                      <Typography variant="body3" sx={{ color: "black" }}>
                        Available Spots: {event.capacity - event.attendees.length}
                      </Typography>
                      :
                      <Typography variant="body3" sx={{ color: "black" }}>
                        This event is full
                      </Typography>
                    }

                  </Grid>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
