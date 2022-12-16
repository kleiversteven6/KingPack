/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';

export default function GroupList({ data, teamList }) {
  let cont = 0;

  function getName(e) {
    const nameFound = teamList.find(value => value.key === e);
    return nameFound.text;
  }

  function runCont() {
    cont += 1;
    return cont;
  }

  return (
    <div>
      <Header as="h1" attached="top">
        {data.name}
      </Header>

      <Segment secondary attached>
        <Grid>
          <Grid.Column stretched>
            {data.teams.map(value => (
              <Button
                key={runCont()}
                size="large"
                content={getName(value)}
                style={{ margin: '5px 0 0 0' }}
              />
            ))}
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}
