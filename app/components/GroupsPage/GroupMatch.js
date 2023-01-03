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
  DATA,
  MATCHS,
  TEAMS,
  LOADING,
} from '../../containers/GroupsPage/constants';
import {
  saveGroupMatch,
  updateGroupMatch,
} from '../../containers/GroupsPage/actions';

const GroupMatch = connect(
  selector([DATA, TEAMS, MATCHS, LOADING]),
  {
    saveGroupMatch,
    updateGroupMatch,
  },
)(Main);

function Main(props) {
  const { data, teamList, loading } = props;

  const [matchData, setMatchData] = useState([]);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState('');

  const [dummy, setDummy] = useState(false);
  const [update, setUpdate] = useState(false);
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

  function handleSubmit() {
    if (validate()) {
      if (!update) props.saveGroupMatch(matchData);
      else props.updateGroupMatch(matchData);
    }
  }

  function validate() {
    let errNoSelect = false;
    let errDate = false;

    matchData.forEach(value => {
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
    const foundName = teamList.find(value => value.key === e);
    return foundName.text;
  }

  function runCont() {
    cont += 1;
    return cont;
  }

  useEffect(() => {
    const resp = props.matchData;
    const tempMatch = [];

    // Asignar valores de firebase a <matchData>
    resp.forEach(raw => {
      const value = raw.data();

      if (value.idGrupo === data.key) {
        tempMatch.push({
          idUpdate: raw.id,
          id: data.key,
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
      data.teams.forEach(a => {
        data.teams.forEach(b => {
          let oc = true;

          tempMatch.forEach(value => {
            if (value.match[0] === a && value.match[1] === b) oc = false;
            if (value.match[0] === b && value.match[1] === a) oc = false;
            if (a === b) oc = false;
          });

          if (oc)
            tempMatch.push({
              id: data.key,
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

    setMatchData(tempMatch);
    setDone(true);
  }, []);

  return (
    done && (
      <>
        <Header as="h1" attached="top" textAlign="center">
          Enfrentamientos de {data.text}
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

              {matchData.map(value => (
                <Grid.Row key={runCont()} style={value.error ? errStyle : {}}>
                  <Grid.Column key={runCont()} width={5}>
                    <Input
                      key={runCont()}
                      fluid
                      type="date"
                      value={value.date}
                      onChange={e => handleDate(value, e)}
                    />
                  </Grid.Column>

                  <Grid.Column key={runCont()} textAlign="center" width={5}>
                    <Button
                      key={runCont()}
                      basic
                      fluid
                      floated="left"
                      color={getColor(value, 0)}
                      content={getName(value.match[0])}
                      onClick={() => handleSelect(value, 0)}
                    />
                  </Grid.Column>

                  <Grid.Column
                    key={runCont()}
                    verticalAlign="middle"
                    textAlign="center"
                    width={1}
                  >
                    <b>
                      <i>vs</i>
                    </b>
                  </Grid.Column>

                  <Grid.Column key={runCont()} textAlign="center" width={5}>
                    <Button
                      key={runCont()}
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
