// src/pages/Dashboard.jsx
import { Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import { hasAnyGroup, getUserGroups } from '../utils/roles';
import Panel from '../components/Panel';
import panelData from '../data/panels.json'; // <-- Asegúrate de tener esta ruta bien

export default function Dashboard() {
  // const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const userGroups = getUserGroups();
  const isVisible = hasAnyGroup;
  const panels = panelData; // <-- Ahora sí está definido

  console.log("Usuario logueado:", user);
  console.log("Grupos del usuario logueado:", userGroups);
  console.log("Paneles visibles:", panels.filter(panel => isVisible(panel.visibleTo)));

  return (
    <Container className="mt-4">
      <h2 className="mb-4">
        Panel de gestión del Portuense - Bienvenido, {user.username}
      </h2>

      <Row>
        {panels
          .filter(panel => isVisible(panel.visibleTo))
          .map((panel, index) => (
            <Col md={6} lg={3} className="mb-4" key={index}>
              <Panel
                title={panel.title}
                text={panel.text}
                query={panel.query}
              >
                {/* Subpaneles o contenido anidado aquí si lo deseas */}
              </Panel>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
