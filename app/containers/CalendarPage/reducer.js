import { SET_GENMODAL } from './constants';

const initialState = {
  genModal: 0,
};

export default function CalendarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GENMODAL:
      return Object.assign({}, state, { genModal: action.payload });

    default:
      break;
  }

  return state;
}
