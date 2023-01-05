/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Header,
  Input,
  Message,
  Segment,
} from 'semantic-ui-react';
import selector from '../../containers/GroupsPage/selector';
import {
  DB_MATCHS,
  DB_TEAMS,
  MATCHDATA,
  LOADING,
} from '../../containers/GroupsPage/constants';
import {
  saveGroupMatch,
  updateGroupMatch,
  setResultData,
} from '../../containers/GroupsPage/actions';

const GroupMatch = connect(
  selector([DB_MATCHS, DB_TEAMS, MATCHDATA, LOADING]),
  {
    saveGroupMatch,
    updateGroupMatch,
    setResultData,
  },
)(Main);

function Main(props) {
  const { matchsDB, teamsDB, matchData, loading } = props;

  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState('');

  const [update, setUpdate] = useState(false);
  const [dummy, setDummy] = useState(false);
  const errStyle = {
    backgroundColor: 'rgb(255,240,250)',
    border: '1px solid red',
    borderRadius: '5px',
  };
  let cont = 0;

  function handleSelect(obj, e) {
    const m = e === 0 ? 1 : 0;
    const temp = obj;

    temp.home = obj.match[e];
    temp.visit = obj.match[m];
    temp.error = false;

    setDummy(!dummy);
  }

  function handleDate(obj, e) {
    const temp = obj;
    temp.date = e.target.value;
    temp.error = false;

    setDummy(!dummy);
  }

  function handleVS(e) {
    matchsDB.forEach(raw => {
      const value = raw.data();

      if (raw.id === e.idUpdate) {
        props.setResultData({
          id: raw.id,
          fecha: value.fecha,
          idCasa: value.idCasa,
          idVisita: value.idVisita,
          golesCasa: value.golesCasa,
          golesVisi: value.golesVisi,
          golesPrroCasa: value.golesPrroCasa,
          golesPrroVisit: value.golesPrroVisit,
        });
      }
    });
  }

  function handleSubmit() {
    if (validate()) {
      if (!update) props.saveGroupMatch(data);
      else props.updateGroupMatch(data);
    }
  }

  function validate() {
    let errNoSelect = false;
    let errDate = false;

    data.forEach(value => {
      const gulty = value;

      if (value.home === '') {
        errNoSelect = true;
        gulty.error = true;
      }
      if (value.date === '') {
        errDate = true;
        gulty.error = true;
      }
    });

    if (errNoSelect || errDate) {
      const errMsg = [];

      if (errNoSelect)
        errMsg.push(
          <Message.Item
            key={0}
            content="Debe seleccionar los equipos que jugaran en casa."
          />,
        );

      if (errDate)
        errMsg.push(
          <Message.Item key={1} content="Las fechas deben ser asignadas" />,
        );

      setMsg(<Message color="red" content={errMsg} />);
      return false;
    }

    setMsg('');
    return true;
  }

  function getColor(obj, e) {
    if (obj.home === '') return 'grey';
    if (obj.home === obj.match[e]) return 'blue';

    return 'red';
  }

  function getName(e) {
    const foundName = teamsDB.find(value => value.key === e);
    return foundName.text;
  }

  function runCont() {
    cont += 1;
    return cont;
  }

  useEffect(() => {
    const tempMatch = [];

    // Asignar valores de firebase a <data>
    matchsDB.forEach(raw => {
      const value = raw.data();

      if (value.idGrupo === matchData.key) {
        tempMatch.push({
          idUpdate: raw.id,
          id: matchData.key,
          home: value.idCasa,
          visit: value.idVisita,
          date: value.fecha,
          match: [value.idCasa, value.idVisita],
          error: false,
        });
      }
    });

    // De existir elementos, organizar. De lo contrario, generar los valores
    if (tempMatch.length !== 0) {
      tempMatch.sort((a, b) => {
        if (a.date > b.date) return 1;
        return -1;
      });

      setUpdate(true);
    } else {
      // Generar enfrentamientos no repetidos entre todos los equipos
      matchData.teams.forEach(a => {
        matchData.teams.forEach(b => {
          let oc = true;

          tempMatch.forEach(value => {
            if (value.match[0] === a && value.match[1] === b) oc = false;
            if (value.match[0] === b && value.match[1] === a) oc = false;
            if (a === b) oc = false;
          });

          if (oc)
            tempMatch.push({
              id: matchData.key,
              home: '',
              visit: '',
              date: '',
              match: [a, b],
              error: false,
            });
        });
      });

      tempMatch.shift();
    }

    setData(tempMatch);
    setDone(true);
  }, []);

  return (
    done && (
      <>
        <Header as="h1" attached="top" textAlign="center">
          Enfrentamientos de {matchData.text}
        </Header>

        <Container>
          <Segment secondary>
            <Grid centered padded>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Button
                    fluid
                    color="vk"
                    icon="calendar"
                    content="Fecha del Enfrentamiento"
                  />
                </Grid.Column>

                <Grid.Column width={11}>
                  <Button.Group fluid inverted>
                    <Button primary content="Casa" />
                    <Button negative content="Visita" />
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>

              {data.map(value => (
                <Grid.Row key={runCont()} style={value.error ? errStyle : {}}>
                  <Grid.Column width={5}>
                    <Input
                      fluid
                      type="date"
                      value={value.date}
                      onChange={e => handleDate(value, e)}
                    />
                  </Grid.Column>

                  <Grid.Column textAlign="center" width={5}>
                    <Button
                      basic
                      fluid
                      floated="left"
                      color={getColor(value, 0)}
                      content={getName(value.match[0])}
                      onClick={() => handleSelect(value, 0)}
                    />
                  </Grid.Column>

                  <Grid.Column
                    verticalAlign="middle"
                    textAlign="center"
                    width={1}
                  >
                    {update ? (
                      <Button
                        basic
                        compact
                        secondary
                        size="mini"
                        loading={loading}
                        disabled={loading}
                        onClick={() => handleVS(value)}
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
                    ) : (
                      <b>
                        <i>vs</i>
                      </b>
                    )}
                  </Grid.Column>

                  <Grid.Column textAlign="center" width={5}>
                    <Button
                      basic
                      fluid
                      floated="right"
                      color={getColor(value, 1)}
                      content={getName(value.match[1])}
                      onClick={() => handleSelect(value, 1)}
                    />
                  </Grid.Column>
                </Grid.Row>
              ))}
              <Grid.Row>
                <Button
                  color="green"
                  icon="save"
                  content="Guardar cambios"
                  loading={loading}
                  disabled={loading}
                  onClick={handleSubmit}
                />
              </Grid.Row>

              <Grid.Row>{msg}</Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </>
    )
  );
}

export default GroupMatch;
