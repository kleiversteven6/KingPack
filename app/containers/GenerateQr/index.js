import React, { useState } from 'react';
import { Button, Card, Container, Image } from 'semantic-ui-react';

export default function GenerateQr() {
  const [Response, setResponse] = useState({
    secret: '',
    url: '',
    response: '',
  });
  const generate = () => {
    fetch('https://dev-gecko.ganaloterias.com/authenticator/generarqr')
      .then(result => result.json())
      .then(data => setResponse(data));
  };
  return (
    <Container>
      <h1>Generar codigo Qr</h1>
      <Card color="blue" centered>
        <Image src={Response.url} wrapped ui={false} />
        <Card.Content>
          <Card.Header>King-auth</Card.Header>
          <Card.Description>{Response.secret}</Card.Description>
        </Card.Content>
        <Card.Content textAlign="center">
          <Button color="blue" onClick={generate}>
            Generar QR
          </Button>
        </Card.Content>
      </Card>
    </Container>
  );
}
