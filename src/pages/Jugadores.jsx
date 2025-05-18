import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';
import JugadorForm from './jugadores/JugadorForm';
import JugadorRow from './jugadores/JugadorRow';
import { eliminarJugador } from './jugadores/EliminarJugadorBtn';
import { getToken } from '../utils/auth';

export default function Jugadores() {
  const [searchParams] = useSearchParams();
  const [jugadores, setJugadores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJugador, setEditingJugador] = useState(null);
  const navigate = useNavigate();

  const fetchJugadores = useCallback(async () => {
    try {
      const queryString = searchParams.toString();
      const response = await fetch(`http://localhost:8000/api/jugadores/?${queryString}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      setJugadores(data);
    } catch (error) {
      console.error('Error fetching jugadores:', error);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchJugadores();
  }, [searchParams]);

  const handleCreate = () => {
    setEditingJugador(null);
    setShowForm(true);
  };

  const handleEdit = (jugador) => {
    setEditingJugador(jugador);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await eliminarJugador(id, fetchJugadores);
  };

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate('/dashboard')} className="mb-3">
        ← Volver al Dashboard
      </Button>

      <h2>Listado de Jugadores</h2>

      <Button variant="success" className="mb-3" onClick={handleCreate}>
        Añadir Jugador
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            
            <th>Nombre</th>
            <th>Posición</th>
            <th>Edad</th>
            <th>Equipo</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            <JugadorRow
              key={jugador.id}
              jugador={jugador}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>

      <JugadorForm
        show={showForm}
        onHide={() => setShowForm(false)}
        mode={editingJugador ? 'editar' : 'crear'}
        initialData={editingJugador || {}}
        onSuccess={fetchJugadores}
      />
    </Container>
  );
}
