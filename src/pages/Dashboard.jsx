import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
    const navigate = useNavigate();
  
    const panels = [
      { title: 'Equipo Masculino', text: 'Jugadores del equipo masculino.', query: { equipo: 'M' } },
      { title: 'Equipo Femenino', text: 'Jugadoras del equipo femenino.', query: { equipo: 'F' } },
      { title: 'Categoría Alevín', text: 'Jugadores categoría Alevín.', query: { categoria: 'ALE' } },
      { title: 'Categoría Infantil', text: 'Jugadores categoría Infantil.', query: { categoria: 'INF' } },
    ];
  
    const buildUrl = (queryObj) => {
      const params = new URLSearchParams(queryObj).toString();
      return `/jugadores?${params}`;
    };
  
    return (
      <Container className="mt-4">
        <h2 className="mb-4">Panel de Control</h2>
        <Row>
          {panels.map((panel, index) => (
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