import { DBGROUPS_LOADING, GENMODAL } from './constants';

export default function selector(e) {
  function temp(state) {
    const select = {};

    e.forEach(value => {
      if (value === GENMODAL) select.genModal = state.CalendarReducer.genModal;

      if (value === DBGROUPS_LOADING)
        select.groupsDBLoading = state.GroupsReducer.loading;
    });

    return select;
  }

  return temp;
}
