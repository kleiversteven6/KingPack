/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Modal, Segment } from 'semantic-ui-react';

import { setGenModal } from '../../containers/CalendarPage/actions';
import {
  GENMODAL,
  DBGROUPS_LOADING,
} from '../../containers/CalendarPage/constants';
import selector from '../../containers/CalendarPage/selector';

import { getDB } from '../../containers/GroupsPage/actions';

import CGGrupos from './Generator/CGGrupos';

const CalendarGenerator = connect(
  selector([GENMODAL, DBGROUPS_LOADING]),
  { getDB, setGenModal },
)(Main);

/*
  GENMODAL Numeros:
  0) Cerrado
  1)  Lista de Opciones
  2)    Grupos
  3)    Octavos
*/

function Main(props) {
  const { genModal, groupsDBLoading } = props;

  useEffect(() => {
    props.getDB();
  }, []);

  return (
    <>
      <Segment padded loading={groupsDBLoading}>
        <Grid textAlign="center" padded>
          <Grid.Row>
            <Grid.Column width={8}>
              <Button
                fluid
                primary
                size="large"
                content="Grupos"
                onClick={() => props.setGenModal(2)}
              />
            </Grid.Column>

            <Grid.Column width={8}>
              <Button
                fluid
                size="large"
                content="Octavos"
                onClick={() => props.setGenModal(3)}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Button fluid size="large" content="Cuartos" />
            </Grid.Column>

            <Grid.Column width={8}>
              <Button fluid size="large" content="Semi-Finales" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Button fluid size="large" content="3er Lugar" />
            </Grid.Column>

            <Grid.Column width={8}>
              <Button fluid size="large" content="Final" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Modal
        size="small"
        dimmer="blurring"
        centered={false}
        open={genModal === 2}
        onClose={() => props.setGenModal(1)}
      >
        <CGGrupos />
      </Modal>
    </>
  );
}

export default CalendarGenerator;
