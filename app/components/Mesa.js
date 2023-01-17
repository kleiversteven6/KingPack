import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import { Button, Grid, GridColumn, GridRow, Segment } from 'semantic-ui-react';
import logo from '../../public/assets/logoking.png';
import Ball from './Ball';
import Carton from './Carton';

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
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
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
        <GridRow textAlign="center">
          <GridColumn computer={2} mobile={16}>
            <Segment basic>
              <Button color="green" basic onClick={() => loadCardBoard()}>
                Jugar
              </Button>
            </Segment>
          </GridColumn>
          <GridColumn computer={10} mobile={16}>
            <Carton cardboard={cardboard} />
          </GridColumn>
          <GridColumn computer={1} mobile={16}>
            <Ball num="01" style={{ width: '80px' }} />
            <Ball num="02" />
            <Ball num="03" />
            <Ball num="04" />
            <Ball num="05" />
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
}
