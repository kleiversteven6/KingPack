/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Header, Modal, Button, Icon, Image } from 'semantic-ui-react';
import { saveEquiment, updateEquiment } from '../firebase/api';

export default function FormEquipo({
  equipo = {
    id: '',
    descripcion: '',
    liga: '',
    nombre: '',
    escudo: '',
  },
  setOpen,
  open,
  title,
  setEquipo,
  getEquipment,
}) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [liga, setLiga] = useState('');
  const [escudo, setEscudo] = useState('');

  const addOrEditEquipo = async () => {
    if (equipo.id === '') {
      const newEquipo = {
        descripcion,
        liga,
        nombre,
        escudo,
      };
      await saveEquiment(newEquipo);
    } else {
      const newEquipo = {
        descripcion,
        liga,
        nombre,
        escudo,
      };
      await updateEquiment(equipo.id, newEquipo);
    }
    getEquipment();
  };
  useEffect(() => {
    setNombre(equipo.nombre);
    setDescripcion(equipo.descripcion);
    setLiga(equipo.liga);
    setEscudo(equipo.escudo);
  }, [equipo]);

  const fileChange = async event => {
    const f = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      setEscudo(e.target.result);
    };
    fileReader.readAsDataURL(f);
  };

  return (
    <Modal closeIcon open={open} onClose={() => setOpen(false)}>
      <Header icon="unlink" content={title} />

      <Modal.Content>
        <Form unstackable onSubmit={addOrEditEquipo}>
          <Form.Group>
            <Form.Input
              label="Nombre "
              placeholder=""
              name="url"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
            <Form.Input
              label="Descripcion"
              placeholder=""
              name="short"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
            <Form.Input
              label="Liga"
              placeholder=""
              name="short"
              value={liga}
              onChange={e => setLiga(e.target.value)}
            />
            <Form.Group>
              <Image floated="right" size="mini" src={escudo} />
              <Form.Field>
                <Button color="green" as="label" htmlFor="file" basic>
                  <Icon name="image" />
                  Agregar
                </Button>
                <input
                  type="file"
                  id="file"
                  hidden
                  onChange={e => fileChange(e)}
                />
              </Form.Field>
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            addOrEditEquipo();
            setOpen(false);
          }}
        >
          <Icon name="save" /> Guardar
        </Button>
        <Button
          color="red"
          onClick={() => {
            setEquipo({
              id: '',
              descripcion: '',
              liga: '',
              nombre: '',
              escudo: '',
            });
            setOpen(false);
          }}
        >
          <Icon name="remove" /> Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
