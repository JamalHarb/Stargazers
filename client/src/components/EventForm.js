import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            purpose,
            date,
            creator_id: loggedUser._id
        })
            .then(res => {
                console.log(res);
                navigate("/dashboard")
            })
            .catch(err => {
                console.log("errrrrrrrrrrr");
                console.log(err);
                setErrors(err.response.data.Error.errors);
            });
    }

    return (loaded &&
        <div>
            <h1>Welcome, {loggedUser.firstName}</h1>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>Event Name</label><br />
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    {errors.name? <p style={{color: "red"}}>{errors.name.message}</p>: ""}
                </p>

                <p>
                    <label>Location</label><br />
                    <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
                    {errors.location? <p style={{color: "red"}}>{errors.location.message}</p>: ""}
                </p>

                <p>
                    <label>Capacity</label><br />
                    <input type="number" onChange={(e) => setCapacity(e.target.value)} value={capacity} />
                    {errors.capacity? <p style={{color: "red"}}>{errors.capacity.message}</p>: ""}
                </p>

                <p>
                    <label>Astronomy phenomenon</label><br />
                    <input type="text" onChange={(e) => setSpace(e.target.value)} value={space} />
                    {errors.space? <p style={{color: "red"}}>{errors.space.message}</p>: ""}
                </p>

                <p>
                    <label htmlFor="purpose">Event purpose:</label>
                    <select name="purpose" id="purpose" onChange={(e) => setPurpose(e.target.value)} value={purpose}>
                        <option value="">select purpose</option>
                        <option value="research">Research</option>
                        <option value="education">Education</option>
                        <option value="fun">Fun</option>
                    </select>
                    {errors.purpose? <p style={{color: "red"}}>{errors.purpose.message}</p>: ""}
                </p>
                <p>
                    <label>Date</label>
                    <input type={"date"} onChange={e => setDate(e.target.value)} value={date} />
                    {errors.date? <p style={{color: "red"}}>{errors.date.message}</p>: ""}
                </p>
                <input type="submit" value={"Create Event"} />
            </form>
        </div>
    )
}

export default EventForm
