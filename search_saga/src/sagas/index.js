import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
  clearState,
} from '../actions/actionCreators';
import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
} from '../actions/actionTypes';
import { searchSkills } from '../api/index';

function filterChangeSearchAction({ type, payload }) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== '';
}

function filterClearSearchActoon({ type, payload }) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() === '';
}

// worker
function* handleClearSearchSaga(action) {
  yield put(clearState(action.payload.search));
}

//watcher
function* watchClearSearchSaga() {
  yield debounce(100, filterClearSearchActoon, handleClearSearchSaga);
}

// worker
function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search));
}

// watcher
function* watchChangeSearchSaga() {
  yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}

// worker
function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000; // ms
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload.search
    );
    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

// watcher
function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
  yield spawn(watchClearSearchSaga);
}
