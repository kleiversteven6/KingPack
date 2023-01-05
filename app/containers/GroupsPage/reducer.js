import {
  DB_ORGANISED,
  SET_LOADING,
  SET_FORMDATA,
  SET_MATCHDATA,
  SET_RESULTDATA,
  RESET_VIEW,
} from './constants';

const initialState = {
  matchsDB: {},
  groupsDB: [],
  teamsDB: [],
  formData: undefined,
  matchData: undefined,
  resultData: undefined,
  loading: true,
};

export default function GroupsReducer(state = initialState, action) {
  switch (action.type) {
    case DB_ORGANISED:
      return Object.assign({}, state, {
        matchsDB: action.payload.matchsDB,
        groupsDB: action.payload.groupsDB,
        teamsDB: action.payload.teamsDB,
        loading: false,
      });

    case SET_FORMDATA:
      return Object.assign({}, state, { formData: action.payload });

    case SET_MATCHDATA:
      return Object.assign({}, state, { matchData: action.payload });

    case SET_RESULTDATA:
      return Object.assign({}, state, { resultData: action.payload });

    case SET_LOADING:
      return Object.assign({}, state, { loading: true });

    case RESET_VIEW:
      return Object.assign({}, state, {
        formData: undefined,
        matchData: undefined,
        resultData: undefined,
      });

    default:
      break;
  }

  return state;
}
