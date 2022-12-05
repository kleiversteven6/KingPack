/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Header, Modal, Button, Icon } from 'semantic-ui-react';
import { saveWebsite, updateWebsite } from '../firebase/api';

export default function FormUrl({
  LinkUrl = { short: '', url: '', id: '' },
  setOpen,
  open,
  title,
}) {
  const [url, setUrl] = useState(LinkUrl.url);
  const [short, setShort] = useState(LinkUrl.short);

  const addOrEditLink = async () => {
    const DateTime = new Date();
    if (LinkUrl.id === '') {
      const newLink = { url, short, cliks: 0, DateTime };
      await saveWebsite(newLink);
    } else {
      const newLink = { url, short };
      await updateWebsite(LinkUrl.id, newLink);
    }
  };
  useEffect(() => {
    setUrl(LinkUrl.url);
    setShort(LinkUrl.short);
  }, [LinkUrl]);
  return (
    <Modal closeIcon open={open} onClose={() => setOpen(false)}>
      <Header icon="unlink" content={title} />

      <Modal.Content>
        <Form unstackable onSubmit={addOrEditLink}>
          <Form.Group widths={2}>
            <Form.Input
              label="Url "
              placeholder="https://"
              name="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <Form.Input
              label="Alias"
              placeholder=" "
              name="short"
              value={short}
              onChange={e => setShort(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            addOrEditLink();
            setOpen(false);
          }}
        >
          <Icon name="save" /> Guardar
        </Button>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
