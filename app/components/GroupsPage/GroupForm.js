/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Label,
  Message,
  Segment,
  Select,
} from 'semantic-ui-react';
import {
  DB_GROUPS,
  DB_TEAMS,
  FORMDATA,
  LOADING,
} from '../../containers/GroupsPage/constants';
import selector from '../../containers/GroupsPage/selector';
import { saveGroup, updateGroup } from '../../containers/GroupsPage/actions';

const GroupForm = connect(
  selector([DB_GROUPS, DB_TEAMS, FORMDATA, LOADING]),
  { saveGroup, updateGroup },
)(Main);

function Main(props) {
  const { groupsDB, teamsDB, formData, loading } = props;

  const [name, setName] = useState({ txt: '', error: false });
  const [teams, setTeams] = useState([{ id: 0, parentId: '', error: false }]);
  const [selectList, setSelectList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [msg, setMsg] = useState('');

  const [dummy, setDummy] = useState(false);
  const [done, setDone] = useState(false);

  let cont = 0;

  function handleAdd() {
    setTeams([
      ...teams,
      { id: new Date().getTime(), parentId: '', error: false },
    ]);
  }

  function handleRemove(id) {
    const foundTeam = teams.find(value => value.id === id); // Buscar item del array actual a remover
    const foundSelect = selectList.find(
      value => value.key === foundTeam.parentId,
    ); // Buscar item seleccionado de la lista

    // Si existe, deseleccionar
    if (foundSelect) foundSelect.selected = false;

    setTeams(teams.filter(value => value.id !== id));
    setDummy(!dummy);
  }

  function handleSelect(e, id) {
    const foundTeam = teams.find(value => value.id === id); // Buscar item del array actual a seleccionar
    const foundSelect = selectList.find(value => value.key === e); // Buscar item a seleccionar de la lista

    // Deseleccionar anterior seleccion si existe
    if (foundTeam.parentId !== '') {
      const foundPrevious = selectList.find(
        value => value.key === foundTeam.parentId,
      );

      foundPrevious.selected = false;
    }

    foundTeam.parentId = e;
    foundTeam.error = false;
    foundSelect.selected = true;
    setDummy(!dummy);
  }

  async function handleSubmit() {
    if (validate()) {
      const teamsArray = [];
      teams.forEach(value => teamsArray.push(value.parentId));

      if (!formData) {
        props.saveGroup({
          name: name.txt,
          teams: teamsArray,
        });
      } else {
        props.updateGroup([
          formData.key,
          {
            name: name.txt,
            teams: teamsArray,
          },
        ]);
      }
    }
  }

  function validate() {
    let errNoSelect = false;
    let errNoTeam = false;
    let errNoName = false;
    let errImpar = false;

    // Validar equipos sin seleccionar
    teams.forEach(value => {
      if (value.parentId === '') {
        const gulty = value;
        gulty.error = true;

        errNoSelect = true;
      }
    });

    // Validar texto vacio
    if (name.txt === '') {
      name.error = true;
      errNoName = true;
    }
    // Validar cantidad de equipos impares
    if (teams.length % 2 !== 0) errImpar = true;

    // Validar 0 equipos
    if (teams.length === 0) errNoTeam = true;

    // Continuar o mostrar error
    if (errNoSelect || errNoTeam || errNoName || errImpar) {
      const errMsg = [];

      if (errNoSelect || errNoName)
        errMsg.push(
          <Message.Item
            key={0}
            content="Ningun campo puede estar en blanco."
          />,
        );

      if (errNoTeam)
        errMsg.push(
          <Message.Item
            key={1}
            content="Deben asignarse al menos 2 equipos."
          />,
        );

      if (errImpar)
        errMsg.push(
          <Message.Item
            key={2}
            content="La cantidad de equipos debe ser par."
          />,
        );

      setMsg(<Message color="red" content={errMsg} />);
      return false;
    }

    setMsg('');
    return true;
  }

  // Obtener nombre desde la lista Madre
  function getName(id) {
    const nameFound = teamsDB.find(value => value.key === id);

    if (nameFound) return nameFound.text;
    return '';
  }

  function runCont(e = true) {
    if (e) cont += 1;
    return cont;
  }

  // Remover o agregar equipos seleccionados actualmente
  useEffect(() => {
    // Evitar que react muera al primer renderizado
    if (selectList.length !== 0) {
      const tempList = [];

      // Filtrar todos los items con el atributo <selected> en true
      selectList.forEach(value => {
        if (!value.selected) tempList.push(value);
      });

      setShowList(tempList);
    }
  }, [dummy]);

  // Filtrar equipos seleccionados en otros grupos
  useEffect(() => {
    let filterList = teamsDB;
    const tempList = [];

    // Filtrar de <formData> los equipos ya seleccionados
    groupsDB.forEach(value => {
      value.teams.forEach(valua => {
        if (!formData)
          filterList = filterList.filter(valui => valui.key !== valua);
        else {
          const foundFilter = formData.teams.find(valui => valui === valua);

          if (typeof foundFilter === 'undefined')
            filterList = filterList.filter(valui => valui.key !== valua);
        }
      });
    });

    // Agregar al array final el atributo <selected>
    filterList.forEach(value => {
      let selected = false;

      if (formData) {
        const foundSelect = formData.teams.find(valua => valua === value.key);
        if (typeof foundSelect !== 'undefined') selected = true;
      }

      tempList.push({
        key: value.key,
        text: value.text,
        value: value.value,
        selected,
      });
    });

    setSelectList(tempList);
    setShowList(tempList);

    if (formData) {
      name.txt = formData.text;

      teams.pop();
      formData.teams.forEach(value => {
        teams.push({ id: teams.length, parentId: value, error: false });
      });

      setDummy(!dummy);
    }

    setDone(true);
  }, []);

  return (
    done && (
      <>
        <Header as="h3" attached="top" textAlign="center">
          {!formData ? 'Agregar un nuevo Grupo' : `Modificar ${formData.text}`}
        </Header>

        <Container>
          <Segment secondary>
            <Grid centered>
              <Grid.Row>
                <Form>
                  <Form.Input
                    label="Nombre del Grupo"
                    value={name.txt}
                    error={name.error}
                    onChange={(e, { value }) =>
                      setName({ txt: value, error: false })
                    }
                  />
                </Form>
              </Grid.Row>

              {teams.map(d => (
                <Grid.Row key={`r${d.id}`}>
                  <Grid.Column key={`c1${d.id}`} verticalAlign="middle">
                    <Label key={`l1${d.id}`} content={runCont(false) + 1} />
                    <Select
                      key={d.id}
                      error={d.error}
                      options={showList}
                      defaultValue={!formData ? '' : d.parentId}
                      text={getName(d.parentId)}
                      placeholder={`Equipo ${runCont()}`}
                      onChange={(e, { value }) => handleSelect(value, d.id)}
                    />

                    <Button
                      key={`b${d.id}`}
                      negative
                      icon="trash"
                      onClick={() => handleRemove(d.id)}
                    />
                  </Grid.Column>
                </Grid.Row>
              ))}

              <Grid.Row>
                <Button primary circular icon="plus" onClick={handleAdd} />
              </Grid.Row>

              <Grid.Row>
                <Button
                  color="green"
                  content={!formData ? 'Crear Grupo' : 'Guardar cambios'}
                  loading={loading}
                  disabled={loading}
                  onClick={handleSubmit}
                />
              </Grid.Row>
            </Grid>
            {msg}
          </Segment>
        </Container>
      </>
    )
  );
}

export default GroupForm;
