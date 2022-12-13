import React, { useState, useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';

import FormUrl from '../../components/FormUrl';
import ListEquipment from '../../components/ListEquipment';
import { getEquipments, deleteWebsite } from '../../firebase/api';

export default function EquipmentPage() {
  const [websites, setWebsites] = useState([]);

  const getLinks = async () => {
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
    setWebsites(docs);
  };
  const deletesite = id => {
    deleteWebsite(id);
    getLinks();
  };
  useEffect(() => {
    getLinks();
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button color="blue" basic floated="right" onClick={() => setOpen(true)}>
        Agregar
      </Button>
      <FormUrl setOpen={setOpen} open={open} title="Acortar url" />
      <Container style={{ margin: '10px' }}>
        <ListEquipment websites={websites} deletesite={deletesite} />
      </Container>
    </>
  );
}
