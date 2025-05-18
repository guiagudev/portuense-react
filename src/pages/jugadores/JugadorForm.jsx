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
  const [p_apellido, setP_apellido] = useState(initialData.p_apellido || "");
  const [s_apellido, setS_apellido] = useState(initialData.s_apellido || "");
  const [equipo, setEquipo] = useState(initialData.equipo || "M");
  const [categoria, setCategoria] = useState(initialData.categoria || "PREBEN");
  const [subcategoria, setSubcategoria] = useState(initialData.subcategoria || "A");
  const [posicion, setPosicion] = useState(initialData.posicion || "");
  const [edad, setEdad] = useState(initialData.edad || "");

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
        p_apellido,
        s_apellido,
        equipo,
        categoria,
        subcategoria,
        posicion,
        edad: parseInt(edad, 10),
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
        <Modal.Title>{mode === "crear" ? "Nuevo Jugador" : "Editar Jugador"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control value={p_apellido} onChange={(e) => setP_apellido(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control value={s_apellido} onChange={(e) => setS_apellido(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Posición</Form.Label>
            <Form.Control value={posicion} onChange={(e) => setPosicion(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Equipo</Form.Label>
            <Form.Select value={equipo} onChange={(e) => setEquipo(e.target.value)} required>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
              <option value="PREBEN">Prebenjamín</option>
              <option value="BEN">Benjamín</option>
              <option value="ALE">Alevín</option>
              <option value="INF">Infantil</option>
              <option value="CAD">Cadete</option>
              <option value="JUV">Juvenil</option>
              <option value="SEN">Sénior</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subcategoría</Form.Label>
            <Form.Select value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} required>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            {mode === "crear" ? "Agregar Jugador" : "Guardar Cambios"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
