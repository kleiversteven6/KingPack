/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Modal } from 'semantic-ui-react';
import { setGenModal } from './actions';
import { GENMODAL } from './constants';
import selector from './selector';

import CalendarComponent from '../../components/CalendarPage/CalendarComponent';
import CalendarGenerator from '../../components/CalendarPage/CalendarGenerator';

const CalendarPage = connect(
  selector([GENMODAL]),
  { setGenModal },
)(Main);

function Main(props) {
  const { genModal } = props;

  return (
    <>
      <Container>
        <Button
          icon="cog"
          color="orange"
          labelPosition="right"
          content="Generar Resultados"
          onClick={() => props.setGenModal(1)}
        />
        <Button
          primary
          icon="arrow right"
          labelPosition="right"
          content="Avanzar a la siguiente fase"
        />
        <Divider />
        <CalendarComponent />
      </Container>

      <Modal
        size="small"
        dimmer="blurring"
        open={genModal >= 1}
        onClose={() => props.setGenModal(0)}
      >
        <CalendarGenerator />
      </Modal>
    </>
  );
}

export default CalendarPage;
