/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  GridColumn,
  Image,
  Input,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';
import {
  RESULTDATA,
  DB_TEAMS,
  LOADING,
} from '../../containers/GroupsPage/constants';
import {
  updateMatch,
  setResultData,
} from '../../containers/GroupsPage/actions';
import selector from '../../containers/GroupsPage/selector';

const GroupMatchResults = connect(
  selector([RESULTDATA, DB_TEAMS, LOADING]),
  { updateMatch, setResultData },
)(Main);

function Main(props) {
  const { resultData, teamsDB, loading } = props;
  const [inputs, setInputs] = useState([]);

  const [msg, setMsg] = useState('');
  const [dummy, setDummy] = useState(false);

  function handleInput(e, obj, opc) {
    const { value } = e.target;
    const temp = obj;

    // Validar que solo sea numerico o vacio
    if (/^\d+$/.test(value) || value === '') {
      if (!opc) {
        temp.casa = value;
        temp.errCasa = false;
      } else {
        temp.visita = value;
        temp.errVisi = false;
      }

      setMsg('');
      setDummy(!dummy);
    }
  }

  function handleSubmit() {
    if (validate()) {
      let update = false;

      if (inputs[0].casa !== resultData.golesCasa) update = true;
      if (inputs[0].visita !== resultData.golesVisi) update = true;
      if (inputs[1].casa !== resultData.golesPrroCasa) update = true;
      if (inputs[1].visita !== resultData.golesPrroVisit) update = true;

      if (update)
        props.updateMatch({
          id: resultData.id,
          golesCasa: inputs[0].casa,
          golesVisi: inputs[0].visita,
          golesPrroCasa: inputs[1].casa,
          golesPrroVisit: inputs[1].visita,
        });
      else props.setResultData(undefined);
    }
  }

  function validate() {
    let oc = true;

    inputs.forEach(value => {
      const gulty = value;
      let check0 = true;
      let check1 = true;

      if (value.casa !== '') check0 = false;
      if (value.visita !== '') check1 = false;
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
    const foundName = teamsDB.find(value => value.key === e);
    return foundName.text;
  }

  function getIcon(e) {
    const foundIcon = teamsDB.find(value => value.key === e);
    return foundIcon.icon;
  }

  useEffect(() => {
    setInputs([
      {
        id: 'Goles',
        casa: resultData.golesCasa,
        visita: resultData.golesVisi,
        errCasa: false,
        errVisi: false,
      },
      {
        id: 'Prorroga',
        casa: resultData.golesPrroCasa,
        visita: resultData.golesPrroVisit,
        errCasa: false,
        errVisi: false,
      },
    ]);
  }, []);

  return (
    <Container fluid>
      <Segment secondary>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={16}>
                <Button.Group fluid>
                  <Button primary content="Casa" />
                  <Button negative content="Visita" />
                </Button.Group>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign="center">
              <Table.Cell>
                <Grid>
                  <GridColumn width={1}>
                    <Image
                      size="mini"
                      floated="left"
                      src={getIcon(resultData.idCasa)}
                    />
                  </GridColumn>

                  <Grid.Column width={6}>
                    <Button
                      basic
                      fluid
                      primary
                      floated="left"
                      content={getName(resultData.idCasa)}
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

                  <Grid.Column width={6}>
                    <Button
                      basic
                      fluid
                      negative
                      floated="right"
                      content={getName(resultData.idVisita)}
                    />
                  </Grid.Column>

                  <GridColumn width={1}>
                    <Image
                      size="mini"
                      floated="right"
                      src={getIcon(resultData.idVisita)}
                    />
                  </GridColumn>
                </Grid>
              </Table.Cell>
            </Table.Row>

            {inputs.map(value => (
              <Table.Row key={value.id} textAlign="center">
                <Table.Cell>
                  <Grid>
                    <Grid.Column width={5} />
                    <Grid.Column width={2}>
                      <Input
                        fluid
                        error={value.errCasa}
                        value={value.casa}
                        onChange={e => handleInput(e, value, 0)}
                      />
                    </Grid.Column>

                    <Grid.Column
                      verticalAlign="middle"
                      textAlign="center"
                      width={2}
                    >
                      <b>
                        <i>{value.id}</i>
                      </b>
                    </Grid.Column>

                    <Grid.Column width={2}>
                      <Input
                        fluid
                        error={value.errVisi}
                        value={value.visita}
                        onChange={e => handleInput(e, value, 1)}
                      />
                    </Grid.Column>
                    <Grid.Column width={5} />
                  </Grid>
                </Table.Cell>
              </Table.Row>
            ))}

            <Table.Row textAlign="center">
              <Table.Cell>
                <Grid>
                  <Grid.Column width={8}>
                    <Button.Group>
                      <Button color="vk" icon="calendar" content="Fecha" />
                      <Button basic color="grey" content={resultData.fecha} />
                    </Button.Group>
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <Button
                      icon="save"
                      color="green"
                      content="Aceptar"
                      loading={loading}
                      disabled={loading}
                      onClick={handleSubmit}
                    />
                  </Grid.Column>
                </Grid>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>{msg}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </Container>
  );
}

export default GroupMatchResults;
