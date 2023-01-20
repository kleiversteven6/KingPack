import {
  DB,
  DB_MATCHS,
  DB_GROUPS,
  DB_TEAMS,
  FORMDATA,
  MATCHDATA,
  RESULTDATA,
  LOADING,
} from './constants';

export default function selector(e) {
  function temp(state) {
    const select = {};

    e.forEach(value => {
      if (value === DB) select.DB = state.GroupsReducer;
      if (value === DB_MATCHS) select.matchsDB = state.GroupsReducer.matchsDB;
      if (value === DB_GROUPS) select.groupsDB = state.GroupsReducer.groupsDB;
      if (value === DB_TEAMS) select.teamsDB = state.GroupsReducer.teamsDB;

      if (value === FORMDATA) select.formData = state.GroupsReducer.formData;
      if (value === MATCHDATA) select.matchData = state.GroupsReducer.matchData;
      if (value === RESULTDATA)
        select.resultData = state.GroupsReducer.resultData;

      if (value === LOADING) select.loading = state.GroupsReducer.loading;
    });

    return select;
  }

  return temp;
}
