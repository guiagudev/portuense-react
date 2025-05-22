import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      saveToken(data.access, false); // Siempre guarda en sessionStorage

      const meRes = await fetch('http://localhost:8000/api/me/', {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      if (!meRes.ok) throw new Error('Error al obtener datos del usuario');

      const userData = await meRes.json();
      sessionStorage.setItem('user', JSON.stringify(userData));

      console.log("Datos del usuario obtenidos del backend:", userData);
      sessionStorage.setItem('userGroups', JSON.stringify(userData.groups || []));

      navigate('/dashboard');
    } catch (err) {
      console.log('Error:', err);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card p-4 shadow" style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  </div>
);

}
