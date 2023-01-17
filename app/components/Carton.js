/* eslint-disable react/prop-types */
import React from 'react';
import { Table } from 'semantic-ui-react';

function Carton({ cardboard }) {
  return (
    <>
      <Table
        unstackable
        columns={5}
        celled
        attached="top"
        basic
        compact
        className="cardboard"
        textAlign="center"
        verticalAlign="middle"
        collapsing
        style={{ margin: 'auto' }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>B</Table.HeaderCell>
            <Table.HeaderCell>I</Table.HeaderCell>
            <Table.HeaderCell>N</Table.HeaderCell>
            <Table.HeaderCell>G</Table.HeaderCell>
            <Table.HeaderCell>O</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cardboard.map(row => (
            <Table.Row key={row[0].col}>
              <Table.Cell key={row[0].id + row[0].col}>
                {row[0].value}
              </Table.Cell>
              <Table.Cell key={row[1].id + row[1].col}>
                {row[1].value}
              </Table.Cell>
              <Table.Cell
                key={row[2].id + row[2].col}
                style={row[2].background}
              >
                {row[2].value !== 'image' && row[2].value}
              </Table.Cell>
              <Table.Cell key={row[3].id + row[3].col}>
                {row[3].value}
              </Table.Cell>
              <Table.Cell key={row[4].id + row[4].col}>
                {row[4].value}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default Carton;
