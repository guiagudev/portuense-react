import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getToken } from "../../utils/auth";

export default function JugadorForm({
  show,
  onHide,
  mode = "crear",
  initialData = {},
  onSuccess,
}) {
  const [nombre, setNombre] = useState(initialData.nombre || "");
  const [equipo, setEquipo] = useState(initialData.equipo || "");
  const [categoria, setCategoria] = useState(initialData.categoria || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    const method = mode === "editar" ? "PUT" : "POST";
    const endpoint =
      mode === "editar"
        ? `http://localhost:8000/api/jugadores/${initialData.id}/`
        : "http://localhost:8000/api/jugadores/";

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        equipo,
        categoria, //quedan más cosas que añadir
      }),
    });
    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
      onHide();
    } else {
      alert("Error al guardar el jugador.");
    }
  };
  return (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{mode === 'crear' ? 'Nuevo Jugador' : 'Editar Jugador' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Equipo</Form.Label>
                    <Form.Control value={equipo} onChange={(e) => setEquipo(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control value={categoria} onChange={(e) => setCategoria(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
                </Form>

        </Modal.Body>
        </Modal>
  );
}
