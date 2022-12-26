/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Input,
  Menu,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';
import { updateMatchs } from '../../firebase/api';

export default function GroupMatchComponent({ drill }) {
  const { rawMatchData, teamList, setShowMatchComponent } = drill;

  const [page, setPage] = useState({ now: 1, left: false, right: false });
  const [prevData, setPrevData] = useState([]);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState('');
  const [vs, setVs] = useState(null);

  const [dummy, setDummy] = useState(false);
  let cont = 0;

  function loadPage() {
    const min = (page.now - 1) * 10;
    const max = page.now * 10;

    runCont(true);

    if (cont > min && cont <= max) return true;
    return false;
  }

  function handlePage(e) {
    let { now, left, right } = page;
    let limit;

    if (typeof e === 'object') limit = Math.floor(e.length / 10) + 1;
    else limit = Math.floor(data.length / 10) + 1;

    if (e === 'prev') now -= 1;
    if (e === 'next') now += 1;

    if (now === 1) left = false;
    else left = true;

    if (now === limit) right = false;
    else right = true;

    setPage({ now, left, right });
  }

  function handleInput(e, obj, opc) {
    const { value } = e.target;
    const temp = obj;

    // Validar que solo sea numerico o vacio
    if (/^\d+$/.test(value) || value === '') {
      if (opc === 0) {
        temp.golesCasa = value;
        temp.errCasa = false;
      } else {
        temp.golesVisi = value;
        temp.errVisi = false;
      }

      setDummy(!dummy);
    }
  }

  function handleSubmit() {
    if (validate()) {
      for (let k = 0; k < data.length; k += 1) {
        let update = false;

        if (data[k].golesCasa !== prevData[k].golesCasa) update = true;
        if (data[k].golesVisi !== prevData[k].golesVisi) update = true;

        if (update) sendUpdate(data[k]);
      }

      setShowMatchComponent(false);
    } else setDummy(!dummy);
  }

  async function sendUpdate(obj) {
    await updateMatchs(obj.id, {
      golesCasa: obj.golesCasa,
      golesVisi: obj.golesVisi,
    });
  }

  function validate() {
    let oc = true;

    data.forEach(value => {
      const gulty = value;
      let check0 = true;
      let check1 = true;

      if (value.golesCasa !== '') check0 = false;
      if (value.golesVisi !== '') check1 = false;
      if ((!check0 && check1) || (check0 && !check1)) {
        if (check0) gulty.errCasa = true;
        if (check1) gulty.errVisi = true;
        oc = false;
      }
    });

    if (!oc) {
      setMsg(
        <Message error>
          <Message.Item content="Los goles deben ser asignados a ambos equipos." />
        </Message>,
      );

      return false;
    }

    return true;
  }

  function getName(e) {
    const foundName = teamList.find(value => value.key === e);
    return foundName.text;
  }

  function runCont(e = false) {
    if (e) cont += 1;
    return cont;
  }

  useEffect(() => {
    const temp = [];
    const temp2 = [];

    rawMatchData.forEach(raw => {
      const value = raw.data();

      temp.push({
        id: raw.id,
        fecha: value.fecha,
        idCasa: value.idCasa,
        idVisita: value.idVisita,
        golesCasa: value.golesCasa,
        golesVisi: value.golesVisi,
        errCasa: false,
        errVisi: false,
      });

      temp2.push({
        id: raw.id,
        fecha: value.fecha,
        idCasa: value.idCasa,
        idVisita: value.idVisita,
        golesCasa: value.golesCasa,
        golesVisi: value.golesVisi,
      });
    });

    temp.sort((a, b) => {
      if (a.fecha > b.fecha) return 1;
      return -1;
    });

    temp2.sort((a, b) => {
      if (a.fecha > b.fecha) return 1;
      return -1;
    });

    setData(temp);
    setPrevData(temp2);
    handlePage(temp);
  }, []);

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
              {data.map(value =>
                vs === null
                  ? loadPage() && (
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
                    )
                  : vs === value.id && (
                      <>
                        <Table.Row textAlign="center">
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
                                <b>
                                  <i>vs</i>
                                </b>
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

                        <Table.Row textAlign="center">
                          <Table.Cell width={3} />
                          <Table.Cell width={13}>
                            <Grid>
                              <Grid.Column width={5} />
                              <Grid.Column width={2}>
                                <Input fluid />
                              </Grid.Column>

                              <Grid.Column
                                verticalAlign="middle"
                                textAlign="center"
                                width={2}
                              >
                                <b>
                                  <i>Goles</i>
                                </b>
                              </Grid.Column>

                              <Grid.Column width={2}>
                                <Input fluid />
                              </Grid.Column>
                              <Grid.Column width={5} />
                            </Grid>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row textAlign="center">
                          <Table.Cell width={3} />
                          <Table.Cell width={13}>
                            <Grid>
                              <Grid.Column width={5} />
                              <Grid.Column width={2}>
                                <Input fluid />
                              </Grid.Column>

                              <Grid.Column
                                verticalAlign="middle"
                                textAlign="center"
                                width={2}
                              >
                                <b>
                                  <i>Prorroga</i>
                                </b>
                              </Grid.Column>

                              <Grid.Column width={2}>
                                <Input fluid />
                              </Grid.Column>
                              <Grid.Column width={5} />
                            </Grid>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row textAlign="center">
                          <Table.Cell width={3} />
                          <Table.Cell width={13}>
                            <Grid>
                              <Grid.Column width={5} />
                              <Grid.Column width={2}>
                                <Input fluid />
                              </Grid.Column>

                              <Grid.Column
                                verticalAlign="middle"
                                textAlign="center"
                                width={2}
                              >
                                <b>
                                  <i>Penales</i>
                                </b>
                              </Grid.Column>

                              <Grid.Column width={2}>
                                <Input fluid />
                              </Grid.Column>
                              <Grid.Column width={5} />
                            </Grid>
                          </Table.Cell>
                        </Table.Row>
                      </>
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
