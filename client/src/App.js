import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';
import Explore from './Views/Explore';
// import LogReg from './components/LogReg';
import Login from './components/Login';
import Registration from './components/Registration';
import NasaApi from './components/NasaApi';
import UserProfile from './Views/UserProfile';
import ShowEvent from './components/ShowEvent';
import Update from './components/Update';
import PageImage from './components/PageImage';
import NavBar from './components/NavBar';
import Home from './components/Home';
import UserForm from './components/UserForm';
import Search from './components/Search';
import Chat from './components/Chat';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <PageImage />
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/register'} element={<Registration />} />
        {/* <Route path='/userform' element={<MainComponent />} /> */}
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/explore' element={<Explore/>} />
        <Route path={'/events/create'} element={<EventForm />} />
        <Route path={'/nasaapi'} element={<NasaApi />} />
        <Route path={'/events/:id'} element={<ShowEvent />} />
        <Route path={'/users/:id'} element={<UserProfile/>} />
        <Route path={'events/edit/:id'} element={<Update/>} />
        <Route path={'/userform'} element={<UserForm />} />
        <Route path={'/search'} element={<Search />} />
        <Route path={'/chat'} element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
