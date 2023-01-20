/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Grid, Header, Label } from 'semantic-ui-react';

export default function CalendarComponent() {
  const pointCss = {
    backgroundColor: '#E0E1E2',
    border: '#E0E1E2',
  };

  const octavos = [
    {
      key: 1,
      data: 1,
      css: 0,
    },
    {
      key: 2,
      data: 2,
      css: 2,
    },
    {
      key: 3,
      data: 3,
      css: 4,
    },
    {
      key: 4,
      data: 4,
      css: 2,
    },
    {
      key: 5,
      data: 5,
      css: 4,
    },
    {
      key: 6,
      data: 6,
      css: 2,
    },
    {
      key: 7,
      data: 7,
      css: 4,
    },
    {
      key: 8,
      data: 8,
      css: 2,
    },
  ];

  const cuartos = [
    {
      key: 1,
      data: 1,
      css: 0,
    },
    {
      key: 2,
      data: 2,
      css: 9,
    },
    {
      key: 3,
      data: 3,
      css: 9,
    },
    {
      key: 4,
      data: 4,
      css: 9,
    },
  ];

  const cuartos2 = [
    {
      key: 1,
      data: 1,
      css: 0,
    },
    {
      key: 2,
      data: 2,
      css: 10,
    },
    {
      key: 3,
      data: 3,
      css: 10,
    },
    {
      key: 4,
      data: 4,
      css: 10,
    },
  ];

  const semi = [
    {
      key: 1,
      data: 1,
      css: 13,
    },
    {
      key: 2,
      data: 2,
      css: 23,
    },
  ];

  const third = [
    {
      key: 1,
      data: 1,
    },
    {
      key: 2,
      data: 2,
    },
  ];

  const final = [
    {
      key: 1,
      data: 1,
    },
    {
      key: 2,
      data: 2,
    },
  ];

  function setCss(e) {
    return { marginTop: `${9 * e}px` };
  }

  return (
    <Container>
      <Grid>
        {/* <= OCTAVOS */}
        <Grid.Column width={2}>
          <Grid.Row>
            <Header inverted content="Octavos" />
          </Grid.Row>

          {octavos.map(({ key, data, css }) => (
            <Grid.Row key={key}>
              <Button
                fluid
                attached="right"
                content={data}
                style={setCss(css)}
              />
            </Grid.Row>
          ))}
        </Grid.Column>

        {/* <= CUARTOS */}
        <Grid.Column width={2}>
          <Grid.Row>
            <Header inverted content="Cuartos" style={{ marginTop: '24px' }} />
          </Grid.Row>

          {cuartos.map(({ key, data, css }) => (
            <Grid.Row key={key}>
              <Button.Group fluid>
                <Button
                  labelPosition="left"
                  content={data}
                  label={<Label circular pointing="left" style={pointCss} />}
                  style={setCss(css)}
                />
              </Button.Group>
            </Grid.Row>
          ))}
        </Grid.Column>

        {/* <= SEMI */}
        <Grid.Column width={2}>
          {semi.map(({ key, data, css }) => (
            <Grid.Row key={key}>
              <Button.Group fluid>
                <Button
                  labelPosition="left"
                  content={data}
                  label={<Label circular pointing="left" style={pointCss} />}
                  style={setCss(css)}
                />
              </Button.Group>
            </Grid.Row>
          ))}
        </Grid.Column>

        {/* FINAL/TERCERO */}
        <Grid.Column width={4}>
          <Grid.Row>
            <Header
              inverted
              size="huge"
              content="Semi - Finales"
              style={{ marginTop: '58px' }}
            />
          </Grid.Row>

          <Grid.Row>
            <Button.Group fluid>
              <Button
                labelPosition="left"
                content={final[0].data}
                label={<Label circular pointing="left" style={pointCss} />}
                style={setCss(10)}
              />
            </Button.Group>
          </Grid.Row>

          <Grid.Row>
            <Header inverted size="large" content="Final" style={setCss(0)} />
          </Grid.Row>

          <Grid.Row>
            <Button.Group fluid>
              <Button
                labelPosition="right"
                content={final[1].data}
                label={<Label circular pointing="right" style={pointCss} />}
                style={setCss(1)}
              />
            </Button.Group>
          </Grid.Row>

          <Grid.Row>
            <Header inverted content="3er Puesto" style={setCss(12)} />
          </Grid.Row>

          <Grid.Row>
            <Button.Group fluid>
              <Button content={third[0].data} />
              <Button.Or text="vs" />
              <Button content={third[1].data} />
            </Button.Group>
          </Grid.Row>
        </Grid.Column>

        {/* => SEMI */}
        <Grid.Column width={2}>
          {semi.map(({ key, data, css }) => (
            <Grid.Row key={key}>
              <Button.Group fluid>
                <Button
                  labelPosition="right"
                  content={data}
                  label={<Label circular pointing="right" style={pointCss} />}
                  style={setCss(css)}
                />
              </Button.Group>
            </Grid.Row>
          ))}
        </Grid.Column>

        {/* => CUARTOS */}
        <Grid.Column width={2}>
          <Grid.Row>
            <Header inverted content="Cuartos" style={{ marginTop: '24px' }} />
          </Grid.Row>

          {cuartos2.map(({ key, data, css }) => (
            <Grid.Row key={key}>
              <Button.Group fluid>
                <Button
                  labelPosition="right"
                  content={data}
                  label={<Label circular pointing="right" style={pointCss} />}
                  style={setCss(css)}
                />
              </Button.Group>
            </Grid.Row>
          ))}
        </Grid.Column>

        {/* => OCTAVOS */}
        <Grid.Column width={2}>
          <Grid.Row>
            <Header inverted content="Octavos" />
          </Grid.Row>

          {octavos.map(({ key, data, css }) => (
            <Grid.Row key={key}>
              <Button
                fluid
                attached="left"
                content={data}
                style={setCss(css)}
              />
            </Grid.Row>
          ))}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
