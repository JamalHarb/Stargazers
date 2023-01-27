import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopEvent = (props) => {
    const [topEvents, setTopEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/top/three')
            .then(res => {
                console.log("getting top events", res);
                setTopEvents(res.data);
                setLoaded(true);
            })
            .catch(err => console.log("error getting top 3 from component", err));
    }, [])

    return ( loaded &&
        <div>
            <h3>Top 3 joined events</h3>
            {
                topEvents.map((event, idx) =>
                    <div key={idx} style={{ border: "1px solid black", marginTop: "10px", padding: "10px" }}>
                        <p>Name: <Link to={'/events/' + event._id}>{event.name}</Link></p>
                        <p>Date: {format(new Date(event.date.toString()), "MMMM do, yyyy")}</p>
                        <p>Location: {event.location} </p>
                        <p>Purpose: {event.space} </p>
                        {event.creator_id._id === props.loggedUser._id ? <p>Capacity: {event.capacity}</p> : ""}
                        {event.capacity - event.attendees.length > 0 ? <p>Available Spots: {event.capacity - event.attendees.length}</p> : <p>This event is full</p>}
                        {event.creator_id._id === props.loggedUser._id ? <p>This is one of your events</p> : <p>Created By: {event.creator_id.firstName} {event.creator_id.lastName}</p>}

                    </div>
                )
            }
        </div>
    )
}

export default TopEvent
