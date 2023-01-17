import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';

const UserProfile = () => {
    const [loggedUser, setLoggedUser] = useState({});
    const [myEvents, setMyEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/logged', { withCredentials: true })
            .then(res => {
                console.log(res);
                setLoggedUser(res.data.user);
                console.log(res.data.user._id + " is my id");

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

    const logout = e => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const removeFromDom = id => {
        setMyEvents(myEvents.filter(event => event._id !== id));
    }

    return (
        <div>
            <h1>Welcome {loggedUser.firstName}</h1>
            <button onClick={() => navigate('/events/create')}>Create an Event</button>
            <button onClick={() => navigate('/dashboard')}>dashboard</button>
            <button onClick={() => navigate('/explore')}>explore</button>
            <button onClick={logout}>Logout</button>

            {
                myEvents.map((event, idx) =>
                    <div key={idx} style={{ border: "1px solid black", marginTop: "10px", padding: "10px" }}>
                        <p>{event.name}</p>
                        <p>{event.location} </p>
                        <p>{event.space} </p>
                        <p>Craetor: {event.user_id.name} </p>
                        <DeleteButton eventId={event._id} successCallback={() => removeFromDom(event._id)} />
                        <button onClick={() => navigate('events/edit/' + event._id)}>Edit Event</button>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfile
