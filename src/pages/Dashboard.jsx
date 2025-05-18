// src/pages/Dashboard.jsx
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { hasAnyGroup } from '../utils/roles';

export default function Dashboard() {
  const navigate = useNavigate();
  
 

  const panels = [
    {
      title: 'Equipo Masculino',
      text: 'Jugadores del equipo masculino.',
      query: { equipo: 'M' },
      visibleTo: ['admin', 'coordinador'],
    },
    {
      title: 'Equipo Femenino',
      text: 'Jugadoras del equipo femenino.',
      query: { equipo: 'F' },
      visibleTo: ['admin', 'coordinador'],
    },
    {
      title: 'Categoría Alevín',
      text: 'Jugadores categoría Alevín.',
      query: { categoria: 'ALE' },
      visibleTo: ['admin', 'entrenador'],
    },
    {
      title: 'Categoría Infantil',
      text: 'Jugadores categoría Infantil.',
      query: { categoria: 'INF' },
      visibleTo: ['admin', 'entrenador'],
    },
    {
      title: 'Panel solo admins',
      text: 'Solo visible por administradores.',
      query: { categoria: 'SEC' },
      visibleTo: ['admin'],
    },
  ];

  const buildUrl = (queryObj) => {
    const params = new URLSearchParams(queryObj).toString();
    return `/jugadores?${params}`;
  };

  const isVisible= hasAnyGroup;
  console.log("Paneles visibles:",
    panels.filter((panel) => isVisible(panel.visibleTo))
  );
  

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Panel de Control</h2>
      <Row>
        {panels
          .filter((panel) => isVisible(panel.visibleTo))
          .map((panel, index) => (
            <Col md={6} lg={3} className="mb-4" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{panel.title}</Card.Title>
                  <Card.Text>{panel.text}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(buildUrl(panel.query))}>
                    Ver Jugadores
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
