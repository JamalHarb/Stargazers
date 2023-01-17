import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import NasaApi from './NasaApi';
import Dashboard from './Dashboard';
import EventForm from './EventForm';
import Explore from '../Views/Explore';
import UserProfile from '../Views/UserProfile';
import ShowEvent from './ShowEvent';
import Update from './Update';
import NavBar from './NavBar';
import UserForm from './UserForm';
import Search from './Search';
import Chat from './Chat';
import axios from 'axios';

const MainComponent = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});
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

    return (loaded &&
        <div>
            <NavBar />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/explore' element={<Explore />} />
                <Route path={'/events/create'} element={<EventForm />} />
                <Route path={'/nasaapi'} element={<NasaApi />} />
                <Route path={'/events/:id'} element={<ShowEvent />} />
                <Route path={'/users/:id'} element={<UserProfile />} />
                <Route path={'events/edit/:id'} element={<Update />} />
                <Route path={'/userform'} element={<UserForm />} />
                <Route path={'/search'} element={<Search />} />
                <Route path={'/chat'} element={<Chat />} />
            </Routes>
        </div>
    )
}

export default MainComponent
