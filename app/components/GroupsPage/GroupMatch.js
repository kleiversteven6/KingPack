/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Image, Segment, Table } from 'semantic-ui-react';
import { DB_TEAMS, DB_MATCHS } from '../../containers/GroupsPage/constants';
import selector from '../../containers/GroupsPage/selector';

const GroupMatch = connect(selector([DB_TEAMS, DB_MATCHS]))(Main);

function Main({ data, teamsDB, matchsDB }) {
  const [matchData, setMatchData] = useState(null);
  const [done, setDone] = useState(false);
  let cont = 0;

  function getPoints(e, opc) {
    let result = 0;

    if (opc === 0) {
      if (typeof e.golesCasa === 'undefined') return '-';
      if (e.golesCasa === '') return '-';

      result += Number(e.golesCasa) + Number(e.golesPrroCasa);
    } else {
      if (typeof e.golesVisi === 'undefined') return '-';
      if (e.golesVisi === '') return '-';

      result += Number(e.golesVisi) + Number(e.golesPrroVisit);
    }

    return result;
  }

  function getWinner(e, opc) {
    const casa = getPoints(e, 0);
    const visita = getPoints(e, 1);

    if (casa === visita || casa === '-' || visita === '-') return 'grey';
    if (casa > visita && opc === 0) return 'green';
    if (casa < visita && opc === 0) return 'red';
    if (casa < visita && opc === 1) return 'green';
    return 'red';
  }

  function getIcon(e) {
    const foundIcon = teamsDB.find(value => value.key === e);
    return foundIcon.icon;
  }

  function runCont() {
    cont += 1;
    return cont;
  }

  useEffect(() => {
    const tempMatch = [];

    // Asignar valores de firebase a <matchData>
    matchsDB.forEach(raw => {
      const value = raw.data();

      if (value.idGrupo === data.key) {
        tempMatch.push({
          date: value.fecha,
          idCasa: value.idCasa,
          idVisita: value.idVisita,
          golesCasa: value.golesCasa,
          golesVisi: value.golesVisi,
          golesPrroCasa: value.golesPrroCasa,
          golesPrroVisit: value.golesPrroVisit,
        });
      }
    });

    // De existir elementos, organizar. De lo contrario, generar los valores
    if (tempMatch.length !== 0) {
      tempMatch.sort((a, b) => {
        if (a.date > b.date) return 1;
        return -1;
      });
    } else {
      // Generar enfrentamientos no repetidos entre todos los equipos
      data.teams.forEach(a => {
        data.teams.forEach(b => {
          let oc = true;

          tempMatch.forEach(value => {
            if (value.idCasa === a && value.idVisita === b) oc = false;
            if (value.idCasa === b && value.idVisita === a) oc = false;
            if (a === b) oc = false;
          });

          if (oc)
            tempMatch.push({
              idCasa: a,
              idVisita: b,
            });
        });
      });

      tempMatch.shift();
    }

    setMatchData(tempMatch);
    setDone(true);
  }, [matchsDB]);

  return (
    done && (
      <Segment secondary attached>
        <Grid>
          <Grid.Column>
            <Table compact basic="very" textAlign="center">
              <Table.Body>
                {matchData.map(value => (
                  <Table.Row key={runCont()}>
                    <Table.Cell>
                      <Image
                        size="mini"
                        floated="right"
                        src={getIcon(value.idCasa)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        basic
                        compact
                        floated="left"
                        color={getWinner(value, 0)}
                        content={getPoints(value, 0)}
                      />
                      {/* <=> */}
                      <Button
                        basic
                        compact
                        floated="right"
                        color={getWinner(value, 1)}
                        content={getPoints(value, 1)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Image
                        size="mini"
                        floated="left"
                        src={getIcon(value.idVisita)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  );
}

export default GroupMatch;
