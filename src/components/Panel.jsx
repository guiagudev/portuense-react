// src/components/Panel.jsx
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Panel({ title, text, query, children }) {
  const navigate = useNavigate();

  const buildUrl = (queryObj) => {
    const params = new URLSearchParams(queryObj).toString();
    return `/jugadores?${params}`;
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary" onClick={() => navigate(buildUrl(query))}>
          Ver Jugadores
        </Button>
        {children && <div className="mt-3">{children}</div>}
      </Card.Body>
    </Card>
  );
}
