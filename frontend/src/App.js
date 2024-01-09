import './App.css';
import Login from './userAction/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './userAction/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
