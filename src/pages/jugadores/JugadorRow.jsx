import { Button } from 'react-bootstrap';
export default function JugadorRow({ jugador, onEdit, onDelete }) {
    return (
        <tr>
            <td>{jugador.nombre}</td>
            <td>{jugador.equipo}</td>
            <td>{jugador.categoria}</td>
            <td>
                <Button variant="warning" onClick={() => onEdit(jugador)}>Editar</Button>
                <Button variant="danger" onClick={() => onDelete(jugador.id)}>Eliminar</Button>
            </td>
        </tr>
    );
}