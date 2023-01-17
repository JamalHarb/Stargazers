import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Option from "@mui/joy/Option";
import Select, { selectClasses } from "@mui/joy/Select";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Form from "react-bootstrap/Form";
import NavBar from './NavBar';

const EventForm = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [space, setSpace] = useState("");
    const [purpose, setPurpose] = useState("");
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const [loaded, setLoaded] = useState(false);
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
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            });
    }, [navigate]);

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/events', {
            name,
            location,
            capacity,
            space,
            date,
            creator_id: loggedUser._id
        })
            .then(res => {
                console.log(res);
                navigate("/userform")
            })
            .catch(err => {
                console.log("errrrrrrrrrrr");
                console.log(err);
                setErrors(err.response.data.Error.errors);
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
<form  onSubmit={onSubmitHandler}> 
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
            Creat Your Event
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              
              <TextField
                required
                id="name"
                name="name"
                label="Event name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              
              {errors.name? <p style={{color: "red"}}>{errors.name.message}</p>: ""}
            </Grid>

            <Grid item xs={12} sm={6}>
                
              <TextField
                required
                id="space"
                name="space"
                label="Astronomy Phenomenon"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={(e) => setSpace(e.target.value)}
                value={space}
              />
            
             {errors.space? <p style={{color: "red"}}>{errors.space.message}</p>: ""}
            </Grid>

            <Grid item xs={12} sm={6}>
               
              <TextField
                required
                id="location"
                name="location"
                label="Location"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
           
               {errors.location? <p style={{color: "red"}}>{errors.location.message}</p>: ""}
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
             
               {errors.date? <p style={{color: "red"}}>{errors.date.message}</p>: ""}
            </Grid>
            <Grid item xs={12} sm={6}>
             
              <TextField
                required
                id="Capacity"
                name="Capacity"
                type="number"
                label="Capacity"
                fullWidth
                variant="standard"
                onChange={(e) => setCapacity(e.target.value)}
                value={capacity}
              />
             
               {errors.capacity? <p style={{color: "red"}}>{errors.capacity.message}</p>: ""}
              
            
            </Grid>
            </Grid>
         
        </React.Fragment>

        <Button
        
          type='submit'
            style={{
              background: "white",
              color: "black",
              border: "black",
              marginTop: '30px',
            }}
          >
            Create
          </Button>

        {/* <input type="submit"
        value='create'
          style={{
            marginLeft: "40%",
            marginTop: "4%",
            background: "white",
            color: "black",
            border: "black",
          }}
        /> */}
          
    
        
      </ThemeProvider>
      </form>
    </div>
    </>





        // <div>
        //     <h1>Welcome, {loggedUser.firstName}</h1>
        //     <form onSubmit={onSubmitHandler}>
        //         <p>
        //             <label>Event Name</label><br />
        //             <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        //             {errors.name? <p style={{color: "red"}}>{errors.name.message}</p>: ""}
        //         </p>

        //         <p>
        //             <label>Location</label><br />
        //             <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
        //             {errors.location? <p style={{color: "red"}}>{errors.location.message}</p>: ""}
        //         </p>

        //         <p>
        //             <label>Capacity</label><br />
        //             <input type="number" onChange={(e) => setCapacity(e.target.value)} value={capacity} />
        //             {errors.capacity? <p style={{color: "red"}}>{errors.capacity.message}</p>: ""}
        //         </p>

        //         <p>
        //             <label>Astronomy phenomenon</label><br />
        //             <input type="text" onChange={(e) => setSpace(e.target.value)} value={space} />
        //             {errors.space? <p style={{color: "red"}}>{errors.space.message}</p>: ""}
        //         </p>
        //         <p>
        //             <label htmlFor="purpose">Event purpose:</label>
        //             <select name="purpose" id="purpose" onChange={(e) => setPurpose(e.target.value)} value={purpose}>
        //                 <option value="">select purpose</option>
        //                 <option value="research">Research</option>
        //                 <option value="education">Education</option>
        //                 <option value="fun">Fun</option>
        //             </select>
        //             {errors.purpose? <p style={{color: "red"}}>{errors.purpose.message}</p>: ""}
        //         </p>
        //         <p>
        //             <label>Date</label>
        //             <input type={"date"} onChange={e => setDate(e.target.value)} value={date} />
        //             {errors.date? <p style={{color: "red"}}>{errors.date.message}</p>: ""}
        //         </p>
        //         <input type="submit" value={"Create Event"} />
        //     </form>
        // </div>
    )
}

export default EventForm
