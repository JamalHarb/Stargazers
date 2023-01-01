import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import LogReg from './components/LogReg';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<LogReg />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
