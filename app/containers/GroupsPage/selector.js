import {
  GROUPS,
  MATCHS,
  SHOWFORM,
  SHOWMATCH,
  SHOWALLMATCHS,
  TEAMS,
  DATA,
  LOADING,
} from './constants';

export default function selector(e) {
  function temp(state) {
    const select = {};

    e.forEach(value => {
      if (value === GROUPS) select.groupsData = state.GroupsReducer.groups;
      if (value === TEAMS) select.teamList = state.GroupsReducer.teams;
      if (value === MATCHS) select.matchData = state.GroupsReducer.matchs;
      if (value === SHOWFORM) select.showForm = state.GroupsReducer.showForm;
      if (value === SHOWMATCH) select.showMatch = state.GroupsReducer.showMatch;
      if (value === SHOWALLMATCHS)
        select.showAllMatchs = state.GroupsReducer.showAllMatchs;
      if (value === DATA) select.data = state.GroupsReducer.data;
      if (value === LOADING) select.loading = state.GroupsReducer.loading;
    });

    return select;
  }

  return temp;
}
