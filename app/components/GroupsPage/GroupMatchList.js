import React from 'react';
import {
  Button,
  Container,
  Header,
  Menu,
  Segment,
  Table,
} from 'semantic-ui-react';

export default function GroupMatchList() {
  return (
    <>
      <Header as="h1" attached="top" textAlign="center">
        Resultados de Enfrentamientos
      </Header>
      <Container fluid>
        <Segment secondary>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>
                  <Button fluid color="vk" icon="calendar" content="Fecha" />
                </Table.HeaderCell>

                <Table.HeaderCell width={13}>
                  <Button.Group fluid>
                    <Button primary content="Casa" />
                    <Button negative content="Visita" />
                  </Button.Group>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(
                value =>
                  loadPage() && (
                    <Table.Row key={runCont()} textAlign="center">
                      <Table.Cell width={3}>
                        <Button basic fluid content={value.fecha} />
                      </Table.Cell>

                      <Table.Cell width={13}>
                        <Grid>
                          <Grid.Column width={7}>
                            <Button
                              basic
                              fluid
                              primary
                              floated="left"
                              content={getName(value.idCasa)}
                            />
                          </Grid.Column>

                          <Grid.Column
                            verticalAlign="middle"
                            textAlign="center"
                            width={2}
                          >
                            <Button
                              basic
                              compact
                              secondary
                              size="mini"
                              color="orange"
                              onClick={() => setVs(value.id)}
                              style={{
                                padding: '12px',
                                margin: '-50px',
                                borderRadius: '30px',
                                fontSize: '16px',
                              }}
                            >
                              <b>
                                <i>vs</i>
                              </b>
                            </Button>
                          </Grid.Column>

                          <Grid.Column width={7}>
                            <Button
                              basic
                              fluid
                              negative
                              floated="right"
                              content={getName(value.idVisita)}
                            />
                          </Grid.Column>
                        </Grid>
                      </Table.Cell>
                    </Table.Row>
                  ),
              )}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Menu.Item
                      as="a"
                      icon="chevron left"
                      disabled={!page.left}
                      onClick={() => handlePage('prev')}
                    />
                    <Menu.Item content={page.now} />
                    <Menu.Item
                      as="a"
                      icon="chevron right"
                      disabled={!page.right}
                      onClick={() => handlePage('next')}
                    />
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </Container>
    </>
  );
}
