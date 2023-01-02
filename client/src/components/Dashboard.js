import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const[loggedUser, setLoggedUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const logout = e => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/users/logout', {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/logged', {withCredentials: true})
            .then(res => {
                console.log(res);
                setLoggedUser(res.data.user);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            });
    });

    return ( loaded &&
        <div>
            <h1>Welcome {loggedUser.firstName}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard
