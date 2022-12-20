/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Input,
  Message,
  Segment,
} from 'semantic-ui-react';
import { updateMatchs } from '../../firebase/api';

export default function GroupResults({ rawData, teamList, setShowResults }) {
  const [prevData, setPrevData] = useState([]);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState('');

  const [dummy, setDummy] = useState(false);
  let cont = 0;

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

      setShowResults(false);
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

  function runCont() {
    cont += 1;
    return cont;
  }

  useEffect(() => {
    const temp = [];
    const temp2 = [];

    rawData.forEach(raw => {
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
  }, []);

  return (
    <>
      <Header as="h1" attached="top" textAlign="center">
        Resultados de Enfrentamientos
      </Header>
      <Container>
        <Segment secondary>
          <Grid centered padded>
            {msg !== '' && <Grid.Row>{msg}</Grid.Row>}
            <Grid.Row>
              <Grid.Column width={3}>
                <Button fluid color="vk" icon="calendar" content="Fecha" />
              </Grid.Column>

              <Grid.Column width={13}>
                <Button.Group fluid inverted>
                  <Button primary content="Casa" />
                  <Button negative content="Visita" />
                </Button.Group>
              </Grid.Column>
            </Grid.Row>

            {data.map(value => (
              <Grid.Row key={runCont()}>
                <Grid.Column textAlign="center" width={3}>
                  <Button basic fluid content={value.fecha} />
                </Grid.Column>

                <Grid.Column width={6}>
                  <Grid>
                    <Grid.Column width={12}>
                      <Button
                        basic
                        fluid
                        primary
                        floated="left"
                        content={getName(value.idCasa)}
                      />
                    </Grid.Column>

                    <Grid.Column width={4}>
                      <Input
                        fluid
                        error={value.errCasa}
                        value={value.golesCasa}
                        onChange={e => handleInput(e, value, 0)}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>

                <Grid.Column
                  verticalAlign="middle"
                  textAlign="center"
                  width={1}
                >
                  <b>
                    <i>vs</i>
                  </b>
                </Grid.Column>

                <Grid.Column textAlign="center" width={6}>
                  <Grid>
                    <Grid.Column width={4}>
                      <Input
                        fluid
                        error={value.errVisi}
                        value={value.golesVisi}
                        onChange={e => handleInput(e, value, 1)}
                      />
                    </Grid.Column>

                    <Grid.Column width={12}>
                      <Button
                        basic
                        fluid
                        negative
                        floated="right"
                        content={getName(value.idVisita)}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            ))}

            <Grid.Row>
              <Button
                color="green"
                icon="save"
                content="Guardar cambios"
                onClick={handleSubmit}
              />
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </>
  );
}
