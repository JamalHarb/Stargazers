import React, {useEffect,useState} from 'react';
import axios from 'axios';

import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
import RecentEvent from '../components/RecentEvent';
import TopEvent from '../components/TopEvent.';


const Explore = () => {

    const [events, setEvents] = useState([]);
    const [topEvents, setTopEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);
    

    useEffect(()=>{
        axios.get('http://localhost:8000/api/events')
            .then(res=>{
                setEvents(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[]);


    // useEffect(()=>{
    //     axios.get('http://localhost:8000/api/events/top')
    //         .then(res=>{
    //             setTopEvents(res.data);
    //             setLoaded(true);
    //         })
    //         .catch(err => console.error(err));
    // },[]);


  return (
    <div>
            <button style={{marginLeft:"80%", marginTop:"3%", backgroundColor:"blue", color:"white"}}> <Link style={{  color:"white"}}to={"/events/create"} >Create your own event</Link></button>

    <div  style={{display:"flex", justifyContent: "space-around"}} >
<div style={{backgroundColor:"grey", width:"300px", height:"1000px", padding:"10px"}}>
       {loaded && <RecentEvent   events={events}/>}
       </div>
       {/* <div  style={{backgroundColor:"grey", width:"300px", height:"800px", padding:"10px"}}>
      {loaded && <TopEvent  topEvents={topEvents}/> }
      </div> */}
      
    </div>
    </div>
  )
}

export default Explore

