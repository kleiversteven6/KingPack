/* eslint-disable react/prop-types */
import React from 'react';
import { Image } from 'semantic-ui-react';
const files = require.context('../../public/assets/numbers/', true);
export default function NumberBall({ a, b }) {
  return (
    <>
      <Image.Group>
        <Image
          size="mini"
          src={files(`./${a}.png`)}
          style={{ position: 'relative', height: '88px' }}
        />
        <Image
          size="mini"
          style={{
            position: 'relative',
            left: '-10px',
            height: '85px',
            top: '-1px',
          }}
          src={files(`./${b}.png`)}
        />
      </Image.Group>
    </>
  );
}
