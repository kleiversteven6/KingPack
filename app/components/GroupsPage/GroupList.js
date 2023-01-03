/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { TEAMS } from '../../containers/GroupsPage/constants';
import selector from '../../containers/GroupsPage/selector';

const GroupList = connect(selector([TEAMS]))(Main);

function Main({ data, teamList }) {
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
        {data.text}
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

export default GroupList;
