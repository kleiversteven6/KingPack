/* eslint-disable react/prop-types */

import {
  Header,
  Icon,
  Input,
  Button,
  Grid,
  GridRow,
  GridColumn,
} from 'semantic-ui-react';
import React from 'react';

export default function ShareComponent({ short, url }) {
  const urlOrigin = `mi url ${url}`;
  const urlShort = `mi url ${short}`;

  return (
    <Grid celled="internally" relaxed="very">
      <GridRow>
        <GridColumn width={4}>
          <Header as="h2" icon>
            <Icon name="unlink" />
            Url Corta
          </Header>
        </GridColumn>
        <GridColumn width={12} textAlign="center">
          <GridRow>
            <Input
              action={{
                color: 'blue',
                icon: 'copy',
              }}
              defaultValue={urlShort}
            />
          </GridRow>
          <GridRow style={{}}>
            <Button
              color="blue"
              content="Url Original"
              label={{
                basic: true,
                color: 'grey',
                pointing: 'left',
                content: `${urlOrigin}`,
              }}
            />
          </GridRow>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
