import React, { useState, useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';

import FormUrl from '../../components/FormUrl';

import LinkUrls from '../../components/linkurls';
import { getWebsites, deleteWebsite } from '../../firebase/api';

export default function ShortUrls() {
  const [websites, setWebsites] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getWebsites();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    let element = {};
    querySnapshot.forEach(doc => {
      element = doc.data();
      docs.push({
        ...{
          DateTime: element.DateTime,
          url: element.url,
          short: element.short,
          cliks: element.cliks,
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
        Crear
      </Button>
      <FormUrl setOpen={setOpen} open={open} title="Acortar url" />
      <Container style={{ margin: '10px' }}>
        <LinkUrls websites={websites} deletesite={deletesite} />
      </Container>
    </>
  );
}
