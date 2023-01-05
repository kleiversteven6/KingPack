/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { DB_TEAMS } from '../../containers/GroupsPage/constants';
import selector from '../../containers/GroupsPage/selector';

const GroupList = connect(selector([DB_TEAMS]))(Main);

function Main({ data, teamsDB }) {
  let cont = 0;

  function getName(e) {
    const nameFound = teamsDB.find(value => value.key === e);
    return nameFound.text;
  }

  function getIcon(e) {
    const foundIcon = teamsDB.find(value => value.key === e);
    return foundIcon.icon;
  }

  function runCont() {
    cont += 1;
    return cont;
  }

  return (
    <Segment secondary attached>
      <Grid>
        <Grid.Column stretched>
          {data.teams.map(value => (
            <Button
              key={runCont()}
              fluid
              size="large"
              labelPosition="left"
              content={getName(value)}
              label={{ image: getIcon(value), pointing: false }}
              style={{ margin: '5px 0 0 0' }}
            />
          ))}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default GroupList;
