import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import { getToken } from '../utils/auth';


export default function Jugadores() {
  const [searchParams] = useSearchParams();
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const queryString = searchParams.toString();
        const token = getToken();
        const response = await fetch(`http://localhost:8000/api/jugadores?${queryString}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const data = await response.json();
        setJugadores(data);
      } catch (error) {
        console.error("Error fetching jugadores:", error);
      }
    };
    fetchJugadores();
  }, [searchParams]);

  return (
    <Container className="mt-4">
      <h2>Listado de Jugadores</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Categoría</th>
          </tr>
        </thead>

        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id}>
              <td>{jugador.nombre}</td>
              <td>{jugador.equipo}</td>
              <td>{jugador.categoria}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
