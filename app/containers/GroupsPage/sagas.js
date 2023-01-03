import { takeEvery, takeLeading, call, put, select } from 'redux-saga/effects';
import selector from './selector';
import {
  getGrupos,
  getEquipments,
  getMatchs,
  saveGrupos,
  saveMatchs,
  updateGrupos,
  updateMatchs,
  deleteGrupos,
  deleteMatchs,
} from '../../firebase/api';
import {
  DB_LOADED,
  DB_REQUEST,
  DB_HARD_REQUEST,
  RESET_VIEW,
  SET_TO_DATA,
  SET_LOADING,
  DELETE_GROUP,
  SAVE_GROUP,
  SAVE_GROUP_MATCH,
  UPDATE_GROUP,
  UPDATE_GROUP_MATCH,
  UPDATE_MATCH,
  MATCHS,
} from './constants';

export default function* watcherSaga() {
  yield takeEvery(
    [
      DB_REQUEST,
      SAVE_GROUP,
      SAVE_GROUP_MATCH,
      UPDATE_GROUP,
      UPDATE_GROUP_MATCH,
      UPDATE_MATCH,
      DELETE_GROUP,
    ],
    setLoading,
  );

  yield takeLeading(DB_REQUEST, workerData);
  yield takeLeading(DB_HARD_REQUEST, workerHardData);
  yield takeEvery(SAVE_GROUP, workerSaveGroup);
  yield takeEvery(SAVE_GROUP_MATCH, workerSaveGroupMatch);
  yield takeEvery(UPDATE_GROUP, workerUpdateGroup);
  yield takeEvery(UPDATE_GROUP_MATCH, workerUpdateGroupMatch);
  yield takeEvery(UPDATE_MATCH, workerUpdateMatch);
  yield takeEvery(DELETE_GROUP, workerDeleteGroup);
}

function* setLoading() {
  yield put({ type: SET_LOADING });
}

function* workerData() {
  const payload = yield call(getData);
  yield put({ type: DB_LOADED, payload });
}

function* workerHardData() {
  const payload = yield call(getData);
  yield put({ type: DB_LOADED, payload });
  yield put({ type: RESET_VIEW });
}

function* workerSaveGroup(action) {
  yield call(saveGroup, action.payload);
  yield put({ type: DB_HARD_REQUEST });
}

function* workerSaveGroupMatch(action) {
  yield call(saveGroupMatch, action.payload);
  yield put({ type: DB_HARD_REQUEST });
}

function* workerUpdateGroup(action) {
  yield call(updateGroup, action.payload);
  yield put({ type: DB_HARD_REQUEST });
}

function* workerUpdateGroupMatch(action) {
  yield call(updateGroupMatch, action.payload);
  yield put({ type: DB_HARD_REQUEST });
}

function* workerUpdateMatch(action) {
  yield call(updateMatch, action.payload);
  yield put({ type: DB_REQUEST });
  yield put({ type: SET_TO_DATA, payload: undefined });
}

function* workerDeleteGroup(action) {
  const rawMatch = yield select(selector([MATCHS]));

  yield call(deleteGroup, {
    rawMatch: rawMatch.matchData,
    e: action.payload,
  });
  yield put({ type: DB_HARD_REQUEST });
}

async function getData() {
  const groups = await getGrupos();
  const teams = await getEquipments();
  const matchs = await getMatchs();

  return { groups, teams, matchs };
}

async function saveGroup(payload) {
  await saveGrupos({
    name: payload.name,
    teams: payload.teams,
  });
}

async function saveGroupMatch(payload) {
  payload.forEach(async value => {
    await saveMatchs({
      idGrupo: value.id,
      categoria: '',
      fecha: value.date,
      fecha2: '',
      golesCasa: '',
      golesPenalCasa: '',
      golesPenalVisit: '',
      golesPrroCasa: '',
      golesPrroVisit: '',
      golesVisi: '',
      idCasa: value.home,
      idVisita: value.visit,
      idGanador: '',
      penales: false,
      prorroga: false,
      reprogramado: false,
    });
  });
}

async function updateGroup(payload) {
  const id = payload[0];
  const { name, teams } = payload[1];

  await updateGrupos(id, {
    name,
    teams,
  });
}

async function updateGroupMatch(payload) {
  payload.forEach(async value => {
    await updateMatchs(value.idUpdate, {
      idCasa: value.home,
      idVisita: value.visit,
      fecha: value.date,
    });
  });
}

async function updateMatch(payload) {
  const temp = payload;
  const { id } = payload;
  delete temp.id;

  await updateMatchs(id, temp);
}

async function deleteGroup(payload) {
  const { rawMatch, e } = payload;

  rawMatch.forEach(raw => {
    const value = raw.data();

    if (value.idGrupo === e) deleteMatchs(raw.id);
  });

  await deleteGrupos(e);
}
