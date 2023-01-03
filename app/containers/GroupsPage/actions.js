import {
  DB_REQUEST,
  SET_TO_DATA,
  CREATE_GROUP_FORM,
  UPDATE_GROUP_FORM,
  SAVE_GROUP,
  SAVE_GROUP_MATCH,
  UPDATE_GROUP,
  UPDATE_GROUP_MATCH,
  UPDATE_MATCH,
  DELETE_GROUP,
  OPEN_GROUP_MATCH,
  OPEN_ALL_MATCHS,
  CLOSE_FORM,
  CLOSE_GROUP_MATCH,
  CLOSE_ALL_MATCHS,
} from './constants';

export function getDB() {
  return { type: DB_REQUEST };
}

export function setToData(payload) {
  return { type: SET_TO_DATA, payload };
}

export function createGroupForm() {
  return { type: CREATE_GROUP_FORM };
}

export function updateGroupForm(payload) {
  return { type: UPDATE_GROUP_FORM, payload };
}

export function updateGroup(payload) {
  return { type: UPDATE_GROUP, payload };
}

export function updateGroupMatch(payload) {
  return { type: UPDATE_GROUP_MATCH, payload };
}

export function updateMatch(payload) {
  return { type: UPDATE_MATCH, payload };
}

export function saveGroup(payload) {
  return { type: SAVE_GROUP, payload };
}

export function saveGroupMatch(payload) {
  return { type: SAVE_GROUP_MATCH, payload };
}

export function deleteGroup(payload) {
  return { type: DELETE_GROUP, payload };
}

export function openGroupMatch(payload) {
  return { type: OPEN_GROUP_MATCH, payload };
}

export function openAllMatchs() {
  return { type: OPEN_ALL_MATCHS };
}

export function closeForm() {
  return { type: CLOSE_FORM };
}

export function closeGroupMatch() {
  return { type: CLOSE_GROUP_MATCH };
}

export function closeAllMatchs() {
  return { type: CLOSE_ALL_MATCHS };
}
