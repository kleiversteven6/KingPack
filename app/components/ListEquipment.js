/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Table, Image } from 'semantic-ui-react';

export default function ListEquipment({ equipos, setOpen, setEquipo }) {
  return (
    <>
      <Table striped inverted>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.Cell active width={1} content="" />
            <Table.Cell active width={5} content="Nombre" />
            <Table.Cell active width={5} content="Descripcion" />
            <Table.Cell active width={3} content="Liga" />
            <Table.Cell active width={1} content="" />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {equipos.map(row => (
            <Table.Row key={row.id} textAlign="center">
              <Table.Cell>
                <Image floated="right" size="mini" src={row.escudo} />
              </Table.Cell>
              <Table.Cell>{row.nombre}</Table.Cell>
              <Table.Cell> {row.descripcion} </Table.Cell>
              <Table.Cell> {row.liga} </Table.Cell>

              <Table.Cell>
                <Button.Group>
                  <Button
                    icon="pencil"
                    color="teal"
                    basic
                    onClick={() => {
                      setEquipo(row);
                      setOpen(true);
                    }}
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
