import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NasaApi = () => {
  const [date, setDate] = useState("");
  const [astronomy, setAstronomy] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  }

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + date)
      .then(response => { setAstronomy(response.data); setLoaded(true); console.log(response.data) })

  }, [clicked, date]);

  return ( loaded &&
    <div style={{ marginLeft: "30%", marginTop: "3%" }}>
      <h1>Astronomy picture of the day</h1>
      <input type="text" onChange={e => setDate(e.target.value)} placeholder="enter a date  YYYY-MM-dd" />

      <button onClick={handleClick} style={{ backgroundColor: "red", color: "white", width: "150px", height: "30px" }}>Explore!</button>

      {clicked &&
        <div style={{ marginLeft: "27%", marginTop: "3%" }}>

          <h3>{astronomy.title}</h3>
          <p >{astronomy.explanation}</p>
          <img src={astronomy.url} alt='' />
        </div>
      }
    </div>
  )
}

export default NasaApi
