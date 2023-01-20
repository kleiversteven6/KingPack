/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';
import { DB_GROUPS } from '../../../containers/GroupsPage/constants';
import selector from '../../../containers/GroupsPage/selector';

const CGGrupos = connect(selector([DB_GROUPS]))(Main);

function Main(props) {
  const { groupsDB } = props;

  console.log(groupsDB);

  return (
    <>
      <Header
        size="large"
        attached="bottom"
        content="Generar Resultados de Grupos"
      />

      <Container>
        <Segment>asdsad</Segment>
      </Container>
    </>
  );
}

export default CGGrupos;
