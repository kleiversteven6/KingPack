/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Grid, Modal } from 'semantic-ui-react';
import {
  getDB,
  setToData,
  createGroupForm,
  updateGroupForm,
  deleteGroup,
  openGroupMatch,
  openAllMatchs,
  closeForm,
  closeGroupMatch,
  closeAllMatchs,
} from './actions';
import {
  GROUPS,
  SHOWALLMATCHS,
  SHOWFORM,
  SHOWMATCH,
  DATA,
  LOADING,
} from './constants';
import selector from './selector';

import GroupList from '../../components/GroupsPage/GroupList';
import GroupForm from '../../components/GroupsPage/GroupForm';
import GroupMatch from '../../components/GroupsPage/GroupMatch';
import GroupMatchResults from '../../components/GroupsPage/GroupMatchResults';
import GroupMatchList from '../../components/GroupsPage/GroupMatchList';

// USO DE CONNECT DE REDUX:
const GroupsPage = connect(
  selector([GROUPS, SHOWFORM, SHOWMATCH, SHOWALLMATCHS, DATA, LOADING]), // Primero selectores
  {
    getDB,
    setToData,
    createGroupForm,
    updateGroupForm,
    deleteGroup,
    openGroupMatch,
    openAllMatchs,
    closeForm,
    closeGroupMatch,
    closeAllMatchs,
  }, // Despues Acciones
)(Main); // Al final la funcion del componente.

function Main(props) {
  const {
    groupsData,
    showForm,
    showMatch,
    showAllMatchs,
    data,
    loading,
  } = props;

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
        onClick={props.createGroupForm}
      />
      <Button
        icon="tasks"
        color="orange"
        content="Lista de Enfretamientos"
        disabled={loading}
        onClick={props.openAllMatchs}
      />
      <Divider />

      <Grid columns={4}>
        {groupsData.map(value => (
          <Grid.Column key={value.key} width={4}>
            <Button.Group
              size="mini"
              style={{ zIndex: 1, position: 'inherit' }}
            >
              <Button
                compact
                color={value.matched ? 'blue' : 'orange'}
                icon="share alternate"
                onClick={() => props.openGroupMatch(value)}
              />
              <Button
                compact
                primary
                icon="pencil"
                onClick={() => props.updateGroupForm(value)}
              />
              <Button
                compact
                negative
                icon="minus"
                onClick={() => props.deleteGroup(value.key)}
              />
            </Button.Group>

            <GroupList data={value} />
          </Grid.Column>
        ))}
      </Grid>

      <Modal
        size="mini"
        dimmer="blurring"
        open={showForm}
        centered={false}
        onClose={props.closeForm}
      >
        <GroupForm />
      </Modal>

      <Modal
        dimmer="blurring"
        open={showMatch}
        centered={false}
        onClose={props.closeGroupMatch}
      >
        <GroupMatch />
      </Modal>

      <Modal
        dimmer="blurring"
        open={showAllMatchs}
        centered={false}
        onClose={props.closeAllMatchs}
      >
        <GroupMatchList />

        <Modal
          size="small"
          dimmer="blurring"
          open={typeof data === 'object'}
          onClose={() => props.setToData(undefined)}
        >
          <GroupMatchResults />
        </Modal>
      </Modal>
    </Container>
  );
}

export default GroupsPage;
