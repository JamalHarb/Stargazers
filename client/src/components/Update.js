import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from './NavBar';

const Update = () => {
  const [event, setEvent] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [space, setSpace] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  const [loggedUser, setLoggedUser] = useState({});

  const navigate = useNavigate();

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
        console.log("user data", res);
        setLoggedUser(res.data.user);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      });
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/events/' + id)
      .then(res => {
        setEvent(res.data);
        setName(res.data.name);
        setLocation(res.data.location);
        setCapacity(res.data.capacity);
        setSpace(res.data.space);
        setPurpose(res.data.purpose);
        setDate(res.data.date);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/events/' + id, {
      name,
      location,
      capacity,
      space,
      date,
      creator_id: event.creator_id,
    })
      .then(res => {
        console.log(res);
        navigate("/userform")
      })
      .catch(err => {
        console.log("error updating an event");
        console.log(err.response);
        setErrors(err.response.data.errors);
      });
  }


  return (loaded &&
    <>
      {<NavBar />}
      <div
        style={{
          backgroundColor: "hsl(0 0% 100% / 0.5)",
          maxWidth: "50%",
          marginTop: "5%",
          marginLeft: "25%",
          borderRadius: "8px",
          padding: "50px",
        }}
      >

        <form onSubmit={submitHandler}>
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                Update Your Event
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>

                  <TextField
                    //   required
                    id="name"
                    name="name"
                    label="Event name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                    value={name}

                  />
                  {errors.name ? <p style={{ color: "red" }}>{errors.name.message}</p> : ""}


                </Grid>


                <Grid item xs={12} sm={6}>

                  <TextField
                    //   required
                    id="space"
                    name="space"
                    label="Astronomy Phenomenon"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(e) => setSpace(e.target.value)}
                    value={space}
                  />

                  {errors.space ? <p style={{ color: "red" }}>{errors.space.message}</p> : ""}
                </Grid>

                <Grid item xs={12} sm={6}>

                  <TextField
                    //   required
                    id="location"
                    name="location"
                    label="Location"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />

                  {errors.location ? <p style={{ color: "red" }}>{errors.location.message}</p> : ""}
                </Grid>
                <Grid item xs={12} sm={6}>

                  <TextField
                    id="date"
                    label="Event Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    valuedefault="2017-05-24"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    InputLabelProps={{
                      shrink: true,
                    }}

                  />

                  {errors.date ? <p style={{ color: "red" }}>{errors.date.message}</p> : ""}
                </Grid>
                <Grid item xs={12} sm={6}>

                  <TextField
                    //   required
                    id="Capacity"
                    name="Capacity"
                    type="number"
                    label="Capacity"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                  />

                  {errors.capacity ? <p style={{ color: "red" }}>{errors.capacity.message}</p> : ""}


                </Grid>
              </Grid>

            </React.Fragment>
            <Button type="submit"
              value='create'
              style={{
                marginLeft: "40%",
                marginTop: "4%",
                background: "white",
                color: "black",
                border: "black",
              }}
            >
              Update
            </Button>



          </ThemeProvider>
        </form>
      </div>
    </>



    // <div>
    //     <h1>Welcome, {loggedUser.firstName}</h1>
    //     <form onSubmit={submitHandler}>
    //         <p>
    //             <label>Event Name</label><br />
    //             <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
    //             {errors.name ? <p style={{ color: "red" }}>{errors.name.message}</p> : ""}
    //         </p>

    //         <p>
    //             <label>Location</label><br />
    //             <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
    //             {errors.location ? <p style={{ color: "red" }}>{errors.location.message}</p> : ""}
    //         </p>

    //         <p>
    //             <label>Capacity</label><br />
    //             <input type="number" onChange={(e) => setCapacity(e.target.value)} value={capacity} />
    //             {errors.capacity ? <p style={{ color: "red" }}>{errors.capacity.message}</p> : ""}
    //         </p>

    //         <p>
    //             <label>Astronomy phenomenon</label><br />
    //             <input type="text" onChange={(e) => setSpace(e.target.value)} value={space} />
    //             {errors.space ? <p style={{ color: "red" }}>{errors.space.message}</p> : ""}
    //         </p>


    //         <p>
    //             <label>Event Date</label><br />
    //             <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />
    //             {errors.date ? <p style={{ color: "red" }}>{errors.date.message}</p> : ""}
    //         </p>

    //         <p>
    //             <label htmlFor="purpose">Event purpose:</label>
    //             <select name="purpose" id="purpose" onChange={(e) => setPurpose(e.target.value)} value={purpose}>
    //                 <option value="">select purpose</option>
    //                 <option value="research">Research</option>
    //                 <option value="education">Education</option>
    //                 <option value="fun">Fun</option>
    //             </select>
    //             {errors.purpose ? <p style={{ color: "red" }}>{errors.purpose.message}</p> : ""}
    //         </p>
    //         <input type="submit" value={"update Event"} />
    //     </form>
    // </div>
  )
}

export default Update
