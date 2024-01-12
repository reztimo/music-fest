import './App.css';
import Login from './userAction/Login';
import Register from './userAction/Register';
import Dashboard from './musicFestival/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './musicFestival/Layout';
import CreateEvent from './admin/CreateEvent';
import ShowEvent from './admin/ShowEvent';
import UpdateEvent from './admin/UpdateEvent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event" element={<ShowEvent />} />
        <Route path='/event/add' element={<CreateEvent />} />
        <Route path='/event/update' element={<UpdateEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
