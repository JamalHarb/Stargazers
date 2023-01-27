import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from './NavBar';

const NasaApi = () => {

  const color = grey[50];

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[50],
      },
    },
  });
  const [date, setDate] = useState("");
  const [astronomy, setAstronomy] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  }

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=vOJRqbkzbGi8k7hbCtEWsm159bRsjzjXAyUnDnaM&date=' + date)
      .then(response => { setAstronomy(response.data); setLoaded(true); console.log(response.data) })
  }, [clicked, date]);

  return (loaded &&
    <div>
      {<NavBar />}
      <ThemeProvider theme={theme}>
        <Form
          style={{
            width: "60%",
            height: "120px",
            borderRadius: "8px",
            marginLeft: "20%",
            backgroundColor: "hsl(0 0% 100% / 0.5)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2%"
          }}
        >
          <Grid item xs={12} sm={6}>
            <h4>Astronomy picture of the day</h4>
            <TextField
              id="date"
              label="Enter Date"
              name="Astronomy"
              type="date"
              fullWidth
              variant="standard"
              defaultValue="2023-01-01"
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClick}
            style={{
              background: "white",
              color: "black",
              border: "black",
            }}
          >
            Search
          </Button>
        </Form>
        {clicked &&
          <div style={{ backgroundColor: "hsl(0 0% 100% / 0.5)",
          maxWidth: "60%",
          marginLeft: "20%",
          borderRadius: "8px",
          marginTop: "2%" }}>
            <h3>{astronomy.title}</h3>
            {/* <p >{astronomy.explanation}</p> */}
            <img src={astronomy.url} alt='' style={{maxWidth: "100%", maxHeight: "500px"}} />
          </div>
        }
      </ThemeProvider>
    </div>
  )
}

export default NasaApi
