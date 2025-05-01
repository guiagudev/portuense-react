import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Jugadores from './pages/Jugadores';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/jugadores" element={<Jugadores />} />     
      </Routes>
    </BrowserRouter>
  );
}