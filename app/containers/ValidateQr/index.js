import {
  Button,
  Container,
  Form,
  Grid,
  Image,
  Message,
} from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import image from 'images/ciberseguridad.png';

export default function ValidateQr() {
  const [Secret, setSecret] = useState('');
  const [Code, setCode] = useState('');
  const [content, setContent] = useState('');
  const validate = () => {
    fetch(
      `https://dev-gecko.ganaloterias.com/authenticator/validar?secret=${Secret}&code=${Code}`,
    )
      .then(result => result.json())
      .then(data => {
        if (data.response === 'false') {
          setContent(<Message color="red">Autenticación Errónea</Message>);
        } else {
          setContent(<Message color="green">Autenticación Exitosa</Message>);
        }
      });
  };
  useEffect(() => {}, []);
  return (
    <Container>
      <h1>Validar codigo Qr</h1>
      <Grid>
        <Grid.Column width={4}>
          <Image src={image} size="big" />
        </Grid.Column>
        <Grid.Column width={12} verticalAlign="middle">
          <Form onSubmit={validate}>
            <Form.Input
              value={Secret}
              onChange={e => setSecret(e.target.value)}
              label="Secret"
            />
            <Form.Input
              value={Code}
              onChange={e => setCode(e.target.value)}
              label="Code"
            />
            <Button color="blue">Validar</Button>
          </Form>
        </Grid.Column>
      </Grid>
      {content}
    </Container>
  );
}
