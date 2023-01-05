import { DB_LOADED, DB_ORGANISED } from './constants';

export const GroupsPageMiddleware = ({ dispatch }) => next => action => {
  switch (action.type) {
    case DB_LOADED:
      return dispatch({
        type: DB_ORGANISED,
        payload: buildData(action.payload),
      });

    default:
      break;
  }

  return next(action);
};

function buildData(e) {
  const { groups, matchs, teams } = e;
  const tempData = [];
  const tempList = [];

  // Armar array de grupos & Inicializar datos de enfrentamientos
  groups.forEach(value => {
    let foundMatch = false;

    // Buscar algun registro del enfrentamiento del grupo. Si existe, cambiar color del boton.
    matchs.forEach(valua => {
      if (valua.data().idGrupo === value.id) foundMatch = true;
    });

    tempData.push({
      ...{
        key: value.id,
        text: value.data().name,
        teams: value.data().teams,
        matched: foundMatch,
      },
    });
  });

  // Ordenar lista por nombre
  tempData.sort((a, b) => {
    if (a.text > b.text) return 1;
    return -1;
  });

  // Armar lista de equipos
  teams.forEach(value => {
    tempList.push({
      ...{
        key: value.id,
        text: value.data().nombre,
        value: value.id,
        icon: value.data().escudo,
      },
    });
  });

  // Ordenar lista por nombre
  tempList.sort((a, b) => {
    if (a.text > b.text) return 1;
    return -1;
  });

  return { matchsDB: matchs, groupsDB: tempData, teamsDB: tempList };
}
