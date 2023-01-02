import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';
import Explore from './Views/Explore';
import LogReg from './components/LogReg';
import NasaApi from './components/NasaApi';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path={'/'} element={<LogReg />} />
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/explore' element={<Explore/>} />
        <Route path={'/events/create'} element={<EventForm />} />
        <Route path={'/nasaapi'} element={<NasaApi />} />
      </Routes>
    </div>
  );
}

export default App;
