import { getToken } from '../../utils/auth';


export const eliminarJugador = async (id, onDeleted) => {
    const confirmed = window.confirm("¿Seguro que quieres eliminar este jugador?");
    if(!confirmed) return;

    const response = await fetch(`http://localhost:8000/api/jugadores/${id}/`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (response.ok) {
        onDeleted(id);
    } else {
        alert("Error al eliminar jugador");
    }
;
}