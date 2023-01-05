import {
  DB_REQUEST,
  SET_FORMDATA,
  SET_MATCHDATA,
  SET_RESULTDATA,
  SAVE_GROUP,
  SAVE_GROUP_MATCH,
  UPDATE_GROUP,
  UPDATE_GROUP_MATCH,
  UPDATE_MATCH,
  DELETE_GROUP,
} from './constants';

export function getDB() {
  return { type: DB_REQUEST };
}

export function setFormData(payload) {
  return { type: SET_FORMDATA, payload };
}

export function setMatchData(payload) {
  return { type: SET_MATCHDATA, payload };
}

export function setResultData(payload) {
  return { type: SET_RESULTDATA, payload };
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
