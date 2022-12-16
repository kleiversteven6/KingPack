/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

export default function GroupMatch() {
  return (
    <Grid>
      <Grid.Column width={8}>
        <Grid.Column width={1}>
          <Header as="h1" attached="top">
            sadsadsad
          </Header>

          <Segment secondary attached>
            eeeeeeeeeeeeee
          </Segment>
        </Grid.Column>

        <Grid.Column width={1}>
          <Header as="h1" attached="top">
            sadsadsad
          </Header>

          <Segment secondary attached>
            eeeeeeeeeeeeee
          </Segment>
        </Grid.Column>
      </Grid.Column>
    </Grid>
  );
}
