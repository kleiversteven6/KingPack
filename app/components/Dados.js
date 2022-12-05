import React from 'react';
import Dice from 'react-dice-roll';

export default function Dados() {
  return (
    <>
      <Dice onRoll={value => console.log(value)} />
    </>
  );
}
