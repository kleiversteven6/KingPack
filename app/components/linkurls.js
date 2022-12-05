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
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Shorth url</Table.HeaderCell>
            <Table.HeaderCell>Url original</Table.HeaderCell>
            <Table.HeaderCell>Creada</Table.HeaderCell>
            <Table.HeaderCell>Clicks</Table.HeaderCell>
            <Table.HeaderCell>Opciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {websites.map(row => (
            <Table.Row key={row.id}>
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
