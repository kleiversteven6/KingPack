import React, { useState, useEffect } from 'react';
import { Button, Grid, GridColumn, GridRow, Table } from 'semantic-ui-react';

import logo from '../../public/assets/logoking.png';
let bingo = [];
export default function Mesa() {
  const carton = [
    [
      { id: 'B', col: 1, min: 1, max: 15, value: 0 },
      { id: 'I', col: 1, min: 16, max: 30, value: 0 },
      { id: 'N', col: 1, min: 31, max: 45, value: 0 },
      { id: 'G', col: 1, min: 46, max: 60, value: 0 },
      { id: 'O', col: 1, min: 61, max: 75, value: 0 },
    ],
    [
      { id: 'B', col: 2, min: 1, max: 15, value: 0 },
      { id: 'I', col: 2, min: 16, max: 30, value: 0 },
      { id: 'N', col: 2, min: 31, max: 45, value: 0 },
      { id: 'G', col: 2, min: 46, max: 60, value: 0 },
      { id: 'O', col: 2, min: 61, max: 75, value: 0 },
    ],
    [
      { id: 'B', col: 3, min: 1, max: 15, value: 0 },
      { id: 'I', col: 3, min: 16, max: 30, value: 0 },
      {
        id: 'N',
        col: 3,
        min: 0,
        value: 'image',
        background: {
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
        },
      },
      { id: 'G', col: 3, min: 46, max: 60, value: 0 },
      { id: 'O', col: 3, min: 61, max: 75, value: 0 },
    ],
    [
      { id: 'B', col: 4, min: 1, max: 15, value: 0 },
      { id: 'I', col: 4, min: 16, max: 30, value: 0 },
      { id: 'N', col: 4, min: 31, max: 45, value: 0 },
      { id: 'G', col: 4, min: 46, max: 60, value: 0 },
      { id: 'O', col: 4, min: 61, max: 75, value: 0 },
    ],
    [
      { id: 'B', col: 5, min: 1, max: 15, value: 0 },
      { id: 'I', col: 5, min: 16, max: 30, value: 0 },
      { id: 'N', col: 5, min: 31, max: 45, value: 0 },
      { id: 'G', col: 5, min: 46, max: 60, value: 0 },
      { id: 'O', col: 5, min: 61, max: 75, value: 0 },
    ],
  ];
  const [cardboard, setCardboard] = useState(carton);
  const loadCardBoard = () => {
    bingo = [];
    const newCardboard = [];
    cardboard.forEach(element => {
      const board = element.map(val => {
        let value = 0;
        if (val.min > 0) {
          value = getRandomInt(val.min, val.max);
        } else value = 'image';
        return { ...val, value };
      });
      newCardboard.push(board);
    });

    setCardboard(newCardboard);
  };

  const getRandomInt = (a, b) => {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    const value = Math.floor(Math.random() * (max - min) + min);
    const found = bingo.find(e => e === value);
    let number = 0;
    if (found) {
      number = getRandomInt(a, b);
    } else {
      number = value;
    }
    bingo.push(number);
    return number;
  };
  useEffect(() => {}, []);
  return (
    <>
      <Grid>
        <GridRow>
          <GridColumn width={2}>
            <Button color="green" basic onClick={() => loadCardBoard()}>
              Jugar
            </Button>
          </GridColumn>
          <GridColumn width={10}>
            <Table
              columns={5}
              celled
              attached="top"
              basic
              compact="very"
              collapsing
              className="cardboard"
              textAlign="center"
              verticalAlign="middle"
            >
              <Table.Header color="teal">
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
          </GridColumn>
          <GridColumn width={4} />
        </GridRow>
      </Grid>
    </>
  );
}
