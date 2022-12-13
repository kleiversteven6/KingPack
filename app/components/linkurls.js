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

export default function LinkUrls({ websites, deletesite }) {
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
            <Table.Cell active width={2} content="Shorth url" />
            <Table.Cell active width={5} content="Url original" />
            <Table.Cell active width={3} content="Creada" />
            <Table.Cell active width={1} content="Clicks" />
            <Table.Cell active width={4} content="Opciones" />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {websites.map(row => (
            <Table.Row key={row.id} textAlign="center">
              <Table.Cell>
                <a href={`./url/${row.short}`} target="_blank">
                  {row.short}
                </a>
              </Table.Cell>
              <Table.Cell> {row.url} </Table.Cell>
              <Table.Cell> {row.DateTime.toDate().toString()} </Table.Cell>

              <Table.Cell>{row.cliks} </Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <NavLink to={`./graficas/${row.id}`}>
                    <Button icon="chart bar outline" basic color="violet" />
                  </NavLink>

                  <Button
                    icon="share alternate"
                    color="green"
                    basic
                    onClick={() => {
                      setLinkUrl(row);
                      setVisible(true);
                    }}
                  />
                  <Button
                    icon="trash"
                    basic
                    onClick={() => deletesite(row.id)}
                    color="red"
                  />

                  <Button
                    icon="pencil"
                    color="teal"
                    basic
                    onClick={() => {
                      setLinkUrl(row);
                      setOpen(true);
                    }}
                  />
                </Button.Group>
              </Table.Cell>
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
