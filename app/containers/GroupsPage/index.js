import React, { useState, useEffect } from 'react';
import { Button, Container, Divider, Grid, Modal } from 'semantic-ui-react';
import GroupList from '../../components/GroupsPage/GroupList';
import GroupForm from '../../components/GroupsPage/GroupForm';
import GroupMatch from '../../components/GroupsPage/GroupMatch';

export default function GroupsPage() {
  const [update, setUpdate] = useState(null);
  const [mod, setMod] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [data, setData] = useState([
    { id: 0, name: 'aaaaaaaaaa', teams: [2, 5, 6, 9, 8] },
    { id: 1, name: 'asdsadsad', teams: [0, 1, 3, 4, 7] },
  ]);

  const teamList = [
    { key: 0, text: 'Alemania', value: 0 },
    { key: 1, text: 'Arabia Saudita', value: 1 },
    { key: 2, text: 'Argentina', value: 2 },
    { key: 3, text: 'Australia', value: 3 },
    { key: 4, text: 'Belgica', value: 4 },
    { key: 5, text: 'Brasil', value: 5 },
    { key: 6, text: 'Camerun', value: 6 },
    { key: 7, text: 'Canada', value: 7 },
    { key: 8, text: 'Costa Rica', value: 8 },
    { key: 9, text: 'Croacia Saudita', value: 9 },
    { key: 10, text: 'Dinamarca', value: 10 },
    { key: 11, text: 'Ecuador', value: 11 },
    { key: 12, text: 'España', value: 12 },
    { key: 13, text: 'Francia', value: 13 },
    { key: 14, text: 'Gales', value: 14 },
    { key: 15, text: 'Ghana', value: 15 },
    { key: 16, text: 'Inglaterra', value: 16 },
    { key: 17, text: 'Iran Rica', value: 17 },
    { key: 18, text: 'Japon', value: 18 },
    { key: 19, text: 'Korea', value: 19 },
    { key: 20, text: 'Mexico', value: 20 },
    { key: 21, text: 'Morocco', value: 21 },
    { key: 22, text: 'Paises Bajos', value: 22 },
    { key: 23, text: 'Polonia', value: 23 },
    { key: 24, text: 'Portugal', value: 24 },
    { key: 25, text: 'Qatar', value: 25 },
    { key: 26, text: 'Senegal', value: 26 },
    { key: 27, text: 'Serbia', value: 27 },
    { key: 28, text: 'Suiza', value: 28 },
    { key: 29, text: 'Tunez', value: 29 },
    { key: 30, text: 'USA', value: 30 },
    { key: 31, text: 'Uruguay', value: 31 },
  ];

  function handleCreate() {
    setUpdate(null);
    setMod(true);
  }

  function handleShowMatch(e) {
    const foundData = data.find(value => value.id === e);
    foundData.showMatch = !foundData.showMatch;

    setDummy(!dummy);
  }

  function handleUpdate(e) {
    setUpdate(data.find(value => value.id === e));
    setMod(true);
  }

  function handleRemove(e) {
    setData(data.filter(value => value.id !== e));
  }

  // Agregar el atributo <setMatch>
  useEffect(() => {
    data.forEach(value => {
      const temp = value;
      temp.showMatch = false;
    });
  }, []);

  return (
    <Container>
      <Button
        primary
        icon="plus"
        content="Agregar un Grupo"
        onClick={handleCreate}
      />
      <Divider />

      <Grid columns={4}>
        {data.map(value => (
          <Grid.Column key={value.id} width={4}>
            <Button.Group
              size="mini"
              style={{ zIndex: 1, position: 'inherit' }}
            >
              <Button
                compact
                primary
                icon="share alternate"
                onClick={() => handleShowMatch(value.id)}
              />
              <Button
                compact
                primary
                icon="pencil"
                onClick={() => handleUpdate(value.id)}
              />
              <Button
                compact
                negative
                icon="minus"
                onClick={() => handleRemove(value.id)}
              />
            </Button.Group>

            {value.showMatch ? (
              <GroupList data={value} teamList={teamList} />
            ) : (
              <GroupMatch />
            )}
          </Grid.Column>
        ))}
      </Grid>

      <Modal
        size="mini"
        dimmer="blurring"
        open={mod}
        centered={false}
        onClose={() => setMod(false)}
      >
        <GroupForm
          data={data}
          teamList={teamList}
          setMod={setMod}
          update={update}
        />
      </Modal>
    </Container>
  );
}
