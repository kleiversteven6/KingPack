import React, { useState, useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import FormEquipo from '../../components/FormEquipo';
import ListEquipment from '../../components/ListEquipment';
import { getEquipments } from '../../firebase/api';

export default function EquipmentPage() {
  const [equipos, setEquipos] = useState([]);
  const [equipo, setEquipo] = useState({
    id: '',
    descripcion: '',
    liga: '',
    nombre: '',
    escudo: '',
  });

  const getEquipment = async () => {
    const querySnapshot = await getEquipments();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    let element = {};
    querySnapshot.forEach(doc => {
      element = doc.data();
      docs.push({
        ...{
          descripcion: element.descripcion,
          escudo: element.escudo,
          liga: element.liga,
          nombre: element.nombre,
          id: doc.id,
        },
      });
    });
    // });
    setEquipos(docs);
  };

  useEffect(() => {
    getEquipment();
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <FormEquipo
        setOpen={setOpen}
        open={open}
        setEquipo={setEquipo}
        title="Nuevo equipo"
        equipo={equipo}
        getEquipment={getEquipment}
      />
      <Container style={{ margin: '10px' }}>
        <Button
          color="blue"
          basic
          floated="right"
          onClick={() => {
            setEquipo({
              id: '',
              descripcion: '',
              liga: '',
              nombre: '',
              escudo: '',
            });
            setOpen(true);
          }}
        >
          Agregar
        </Button>
        <ListEquipment
          equipos={equipos}
          setOpen={setOpen}
          setEquipo={setEquipo}
        />
      </Container>
    </>
  );
}
