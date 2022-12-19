import React, { useState, useEffect } from 'react';
import { Button, Container, Divider, Grid, Modal } from 'semantic-ui-react';
import {
  getEquipments,
  getGrupos,
  getMatchs,
  deleteGrupos,
  deleteMatchs,
} from '../../firebase/api';

import GroupList from '../../components/GroupsPage/GroupList';
import GroupForm from '../../components/GroupsPage/GroupForm';
import GroupMatch from '../../components/GroupsPage/GroupMatch';

export default function GroupsPage() {
  const [teamList, setTeamList] = useState([]);
  const [rawMatchData, setRawMatchData] = useState([]);
  const [data, setData] = useState([]);

  const [showMatch, setShowMatch] = useState({ open: false, data: '' });
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(null);

  function handleCreate() {
    setUpdate(null);
    setShowForm(true);
  }

  function handleShowMatch(e) {
    setShowMatch({ open: true, data: data.find(value => value.key === e) });
  }

  function handleUpdate(e) {
    setUpdate(data.find(value => value.key === e));
    setShowForm(true);
  }

  async function handleRemove(e) {
    const resp = await getMatchs();

    resp.forEach(raw => {
      const value = raw.data();

      if (value.idGrupo === e) deleteMatchs(raw.id);
    });

    await deleteGrupos(e).then(() => getData());
  }

  // Armar lista de equipos
  async function getTeams() {
    const resp = await getEquipments();
    const tempList = [];

    resp.forEach(value => {
      tempList.push({
        ...{
          key: value.id,
          text: value.data().nombre,
          value: value.id,
        },
      });
    });

    // Ordenar lista por nombre
    tempList.sort((a, b) => {
      if (a.text > b.text) return 1;
      return -1;
    });

    setTeamList(tempList);
  }

  // Armar array de grupos & Inicializar datos de enfrentamientos
  async function getData() {
    const resp = await getGrupos();
    const respMatch = await getMatchs();
    const tempData = [];

    resp.forEach(value => {
      let foundMatch = false;

      // Buscar algun registro del enfrentamiento del grupo. Si existe, cambiar color del boton.
      respMatch.forEach(valua => {
        if (valua.data().idGrupo === value.id) foundMatch = true;
      });

      tempData.push({
        ...{
          key: value.id,
          text: value.data().name,
          teams: value.data().teams,
          matched: foundMatch,
        },
      });
    });

    // Ordenar lista por nombre
    tempData.sort((a, b) => {
      if (a.text > b.text) return 1;
      return -1;
    });

    setData(tempData);
    setRawMatchData(respMatch);
  }

  // Inicializar y recargar Arrays <teamList>/<data>
  useEffect(() => {
    getTeams();
    getData();
  }, [showForm, showMatch]);

  return (
    <Container>
      <Button
        primary
        icon="plus"
        content="Agregar un Grupo"
        onClick={handleCreate}
      />
      <Divider />

      <Grid columns={4}>
        {data.map(value => (
          <Grid.Column key={value.key} width={4}>
            <Button.Group
              size="mini"
              style={{ zIndex: 1, position: 'inherit' }}
            >
              <Button
                compact
                color={value.matched ? 'blue' : 'orange'}
                icon="share alternate"
                onClick={() => handleShowMatch(value.key)}
              />
              <Button
                compact
                primary
                icon="pencil"
                onClick={() => handleUpdate(value.key)}
              />
              <Button
                compact
                negative
                icon="minus"
                onClick={() => handleRemove(value.key)}
              />
            </Button.Group>

            <GroupList data={value} teamList={teamList} />
          </Grid.Column>
        ))}
      </Grid>

      <Modal
        size="mini"
        dimmer="blurring"
        open={showForm}
        centered={false}
        onClose={() => setShowForm(false)}
      >
        <GroupForm
          data={data}
          teamList={teamList}
          setShowForm={setShowForm}
          update={update}
        />
      </Modal>

      <Modal
        dimmer="blurring"
        open={showMatch.open}
        centered={false}
        onClose={() => setShowMatch({ open: false, data: '' })}
      >
        <GroupMatch
          data={showMatch.data}
          teamList={teamList}
          setShowMatch={setShowMatch}
          rawMatch={rawMatchData}
        />
      </Modal>
    </Container>
  );
}
