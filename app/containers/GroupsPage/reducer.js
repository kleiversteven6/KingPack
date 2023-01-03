import {
  DB_ORGANISED,
  SET_TO_DATA,
  SET_LOADING,
  RESET_VIEW,
  CLOSE_FORM,
  CLOSE_GROUP_MATCH,
  CLOSE_ALL_MATCHS,
  CREATE_GROUP_FORM,
  OPEN_GROUP_MATCH,
  OPEN_ALL_MATCHS,
  UPDATE_GROUP_FORM,
} from './constants';

const initialState = {
  matchs: {},
  groups: [],
  teams: [],
  showForm: false,
  showMatch: false,
  showAllMatchs: false,
  data: undefined,
  loading: true,
};

export default function GroupsReducer(state = initialState, action) {
  switch (action.type) {
    case DB_ORGANISED:
      return Object.assign({}, state, {
        matchs: action.payload.matchs,
        groups: action.payload.groups,
        teams: action.payload.teams,
        loading: false,
      });

    case SET_TO_DATA:
      return Object.assign({}, state, { data: action.payload });

    case SET_LOADING:
      return Object.assign({}, state, { loading: true });

    case RESET_VIEW:
      return Object.assign({}, state, {
        showForm: false,
        showMatch: false,
        showAllMatchs: false,
        data: undefined,
      });

    case CREATE_GROUP_FORM:
      return Object.assign({}, state, { showForm: true });

    case UPDATE_GROUP_FORM:
      return Object.assign({}, state, {
        showForm: true,
        data: action.payload,
      });

    case OPEN_GROUP_MATCH:
      return Object.assign({}, state, {
        showMatch: true,
        data: action.payload,
      });

    case OPEN_ALL_MATCHS:
      return Object.assign({}, state, {
        showAllMatchs: true,
      });

    case CLOSE_FORM:
      return Object.assign({}, state, { showForm: false, data: undefined });

    case CLOSE_GROUP_MATCH:
      return Object.assign({}, state, { showMatch: false, data: undefined });

    case CLOSE_ALL_MATCHS:
      return Object.assign({}, state, {
        showAllMatchs: false,
        data: undefined,
      });

    default:
      break;
  }

  return state;
}
