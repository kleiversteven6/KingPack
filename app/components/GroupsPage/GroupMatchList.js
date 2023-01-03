/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Header,
  Menu,
  Segment,
  Table,
} from 'semantic-ui-react';
import { setToData } from '../../containers/GroupsPage/actions';
import { LOADING, MATCHS, TEAMS } from '../../containers/GroupsPage/constants';
import selector from '../../containers/GroupsPage/selector';

const GroupMatchList = connect(
  selector([MATCHS, TEAMS, LOADING]),
  { setToData },
)(Main);

function Main(props) {
  const { matchData, teamList, loading } = props;

  const [page, setPage] = useState({ now: 1, left: false, right: false });
  const [data, setData] = useState([]);
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

    matchData.forEach(raw => {
      const value = raw.data();

      temp.push({
        id: raw.id,
        fecha: value.fecha,
        idCasa: value.idCasa,
        idVisita: value.idVisita,
        golesCasa: value.golesCasa,
        golesVisi: value.golesVisi,
        golesPenalCasa: value.golesPenalCasa,
        golesPenalVisit: value.golesPenalVisit,
        golesPrroCasa: value.golesPrroCasa,
        golesPrroVisit: value.golesPrroVisit,
      });
    });

    temp.sort((a, b) => {
      if (a.fecha > b.fecha) return 1;
      return -1;
    });

    setData(temp);
    handlePage(temp);
  }, [matchData]);

  return (
    <>
      <Header as="h1" attached="top" textAlign="center">
        Resultados de Enfrentamientos
      </Header>
      <Container fluid>
        <Segment secondary loading={loading}>
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
                              onClick={() => props.setToData(value)}
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

export default GroupMatchList;
