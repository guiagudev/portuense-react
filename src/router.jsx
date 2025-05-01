import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './pages/Welcome';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}