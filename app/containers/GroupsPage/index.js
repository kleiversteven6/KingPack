/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Modal,
} from 'semantic-ui-react';
import {
  getDB,
  setFormData,
  setMatchData,
  setResultData,
  deleteGroup,
} from './actions';
import {
  DB_GROUPS,
  FORMDATA,
  MATCHDATA,
  RESULTDATA,
  LOADING,
} from './constants';
import selector from './selector';

import GroupList from '../../components/GroupsPage/GroupList';
import GroupMatch from '../../components/GroupsPage/GroupMatch';
import GroupForm from '../../components/GroupsPage/GroupForm';
import GroupMatchList from '../../components/GroupsPage/GroupMatchList';
import GroupMatchResults from '../../components/GroupsPage/GroupMatchResults';

// USO DE CONNECT DE REDUX:
const GroupsPage = connect(
  selector([DB_GROUPS, FORMDATA, MATCHDATA, RESULTDATA, LOADING]), // Primero selectores
  {
    getDB,
    setFormData,
    setMatchData,
    setResultData,
    deleteGroup,
  }, // Despues Acciones
)(Main); // Al final la funcion del componente.

function Main(props) {
  const { groupsDB, formData, matchData, resultData, loading } = props;
  const [showMatch, setShowMatch] = useState(false);

  // Inicializar Redux DB.
  useEffect(() => {
    props.getDB();
  }, []);

  return (
    <Container>
      <Button
        primary
        icon="plus"
        content="Agregar un Grupo"
        disabled={loading}
        onClick={() => props.setFormData(null)}
      />
      <Button
        icon="columns"
        disabled={loading}
        color={!showMatch ? 'orange' : 'green'}
        content={!showMatch ? 'Enfrentamientos' : 'Grupos'}
        onClick={() => setShowMatch(!showMatch)}
      />
      <Divider />

      <Grid columns={4}>
        {groupsDB.map(value => (
          <Grid.Column key={value.key} width={4}>
            <Button.Group
              size="mini"
              style={{ zIndex: 1, position: 'inherit' }}
            >
              <Button
                compact
                icon="share alternate"
                color={value.matched ? 'blue' : 'orange'}
                onClick={() => props.setMatchData(value)}
              />
              <Button
                compact
                primary
                icon="pencil"
                onClick={() => props.setFormData(value)}
              />
              <Button
                compact
                negative
                icon="minus"
                onClick={() => props.deleteGroup(value.key)}
              />
            </Button.Group>

            <div>
              <Header as="h1" attached="top">
                {value.text}
              </Header>

              {!showMatch ? (
                <GroupList data={value} />
              ) : (
                <GroupMatch data={value} />
              )}
            </div>
          </Grid.Column>
        ))}
      </Grid>

      <Modal
        size="mini"
        dimmer="blurring"
        centered={false}
        open={typeof formData !== 'undefined'}
        onClose={() => props.setFormData(undefined)}
      >
        <GroupForm />
      </Modal>

      <Modal
        dimmer="blurring"
        centered={false}
        open={typeof matchData !== 'undefined'}
        onClose={() => props.setMatchData(undefined)}
      >
        <GroupMatchList />

        <Modal
          size="small"
          dimmer="blurring"
          open={typeof resultData !== 'undefined'}
          onClose={() => props.setResultData(undefined)}
        >
          <GroupMatchResults />
        </Modal>
      </Modal>
    </Container>
  );
}

export default GroupsPage;
