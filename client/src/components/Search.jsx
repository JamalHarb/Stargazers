import React from 'react';
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Grid } from '@mui/material';
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Search = () => {
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");
  const navigate = useNavigate();

  const color = grey[50];

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[50],
      },
    },
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/logged', { withCredentials: true })
      .then(res => {
        console.log(res);
        setLoggedUser(res.data.user);
        setLoaded(true);
        axios.get('http://localhost:8000/api/events')
          .then(res => {
            console.log("events", res.data);
            setEvents(res.data);
            setLoaded(true);
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      });
  }, [navigate]);

  return (loaded &&
    <>
    {<NavBar />}
    
    <div style={{
      display: "flex",
      // flexDirection: "column",
      // padding: "2%",
      justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
    }}>
      
      <ThemeProvider theme={theme}>
          <Form
            style={{
              width: "70%",
              height: "90px",
              borderRadius: "8px",
              marginLeft: "15%",
              backgroundColor: "hsl(0 0% 100% / 0.5)",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => setSearchLocation(e.target.value)}
                required
                id="Location"
                name="Location"
                label="Location"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => { setSearchFromDate(e.target.value) }}
                id="date"
                label="From Date"
                type="date"
                fullWidth
                variant="standard"
                defaultValue="2023-01-2"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => setSearchToDate(e.target.value)}
                id="date"
                label="To Date"
                type="date"
                fullWidth
                variant="standard"
                defaultValue="2023-01-25"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Button
            style={{
              background: "white",
              color: "black",
              border: "black",
            }}
          >
            Search
          </Button> */}
          </Form>

        {events
          .filter(event => event.location.toLowerCase().includes(searchLocation.toLowerCase()))
          .filter(event => new Date(event.date) >= new Date(searchFromDate))
          .filter(event => new Date(event.date) <= new Date(searchToDate))
          .map((event, idx) =>
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
                  <Grid>
                    <Typography variant="body3" sx={{ color: "black" }}>
                      Date: {format(new Date(event.date.toString()), "MMMM do, yyyy")}
                    </Typography>
                    <Typography variant="body3" sx={{ color: "black" }}>
                      Location: {event.location}
                    </Typography>


                    {event.creator_id._id === loggedUser._id ?
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
                    {event.creator_id._id === loggedUser._id ?
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

      </ThemeProvider >
    </div >
    </>
  );
}

export default Search