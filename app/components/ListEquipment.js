/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Button,
  Grid,
  GridColumn,
  Table,
  Transition,
} from 'semantic-ui-react';
import FormUrl from './FormUrl';
import ShareComponent from './Share';
import SocialComponent from './Social';

export default function ListEquipment({ websites, deletesite }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [LinkUrl, setLinkUrl] = useState({ short: '', url: '', id: '' });

  return (
    <>
      <Transition visible={visible} animation="drop" duration={500}>
        <Container>
          <Button
            basic
            color="grey"
            icon="remove"
            onClick={() => setVisible(false)}
            floated="right"
          />
          <Grid columns={2} celled>
            <Grid.Row>
              <GridColumn>
                <ShareComponent short={LinkUrl.short} url={LinkUrl.url} />
              </GridColumn>
              <GridColumn>
                <SocialComponent short={LinkUrl.short} url={LinkUrl.url} />
              </GridColumn>
            </Grid.Row>
          </Grid>
        </Container>
      </Transition>
      <Table striped inverted>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.Cell active width={2} content=" " />
            <Table.Cell active width={5} content="Nombre" />
            <Table.Cell active width={5} content="Descripcion" />
            <Table.Cell active width={3} content="Liga" />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {websites.map(row => (
            <Table.Row key={row.id} textAlign="center">
              <Table.Cell>
                <a href={`./url/${row.descripcion}`} target="_blank">
                  {row.short}
                </a>
              </Table.Cell>
              <Table.Cell> {row.escudo} </Table.Cell>
              <Table.Cell> {row.liga} </Table.Cell>

              <Table.Cell>{row.nombre} </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <FormUrl
        LinkUrl={LinkUrl}
        open={open}
        setOpen={setOpen}
        title="Actualizar Url"
      />
    </>
  );
}
